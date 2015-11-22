var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();
var server = app.listen(3000);
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); //for JSON parsing for request body
var io = require('socket.io').listen(server);
var ios = require('socket.io-express-session');
var session = require('express-session');
var options = {
    root: __dirname
}


//Connect to MongoDB database
var DB_PORT = "27017";
mongoose.connect('mongodb://localhost:' + DB_PORT + "/301db");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log.bind(console, 'connection success');
});

//Create db schema for users
var roomSchema = mongoose.Schema({
    roomName: String,
    password: String,
    hostUser: String,
    clientUsers: [String],
    upcomingSongs: [{
        songName: String,
        songPath: String
    }],
    playedSongs: [{
        songName: String,
        songPath: String
    }],
    currentSong: {
        songName: String,
        songPath: String
    },
    availableSongs: [{
        songName: String,
        songPath: String
    }]
});
var Room = mongoose.model('Room', roomSchema);

//serve static files
app.use(express.static(__dirname + '/static'));

//bind session middleware
var sess = session({
    secret: 'csc301group',
    cookie: {
        secure: true
    }
})
app.use(sess);
io.use(ios(sess));

//Bind middleware for parsing response
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

io.on('connection', function (socket) {
    console.log("a user connected");
    console.log(socket.handshake.session);
    socket.on('availableSongUpdate', function (json) {
        Room.findOne({
                roomId: json.room
            },
            function (err, room) {
                if (json.updateType === "add") {
                    for (i = 0; i < json.songs.length; i++) {
                        room.availableSongs.push(json.songs[i]);
                    }
                } else if (json.updateType === "remove") {
                    for (i = 0; i < json.songs.length; i++) {
                        room.availableSongs.splice(indexOf(json.songs[i]), 1);
                    }
                }
                room.save();
                io.emit('availableSongClientUpdate', room);
            });
    });

    socket.on('playlistUpdate', function (json) {
        Room.findOne({
                roomId: json.room
            },
            function (err, room) {
                if (json.updateType === "add") {
                    for (i = 0; i < json.songs.length; i++) {
                        room.upcomingSongs.push(json.songs[i]);
                        if (room.currentSong === {}) {
                            room.currentSong = room.upcomingSongs.pop();
                        }
                    }
                } else if (json.updateType === "remove") {
                    for (i = 0; i < json.songs.length; i++) {
                        room.upcomingSongs.splice(indexOf(json.songs[i]), 1);
                    }
                }
                room.save();
                socket.emit('playlistClientUpdate', room);
            });
    });

    socket.on('playNextSong', function (json) {
        Room.findOne({
                roomId: json.room
            },
            function (err, room) {
                if (room.upcomingSongs.length > 0) {
                    room.playedSongs.push(room.currentSong);
                    room.currentSong = room.upcomingSongs.pop();
                } else {
                    room.playedSongs.push(room.currentSong);
                    room.currentSong = {};
                }
                room.save();
                socket.emit('currentSongClientUpdate', room);
            });
    });
});

app.get('/id3-minimized.js', function (req, res) {
    res.sendfile('./static/id3-minimized.js');
});

app.post('/joinRoom', function (request, response) {
    console.log('joining room');
    Room.findOne({
            roomId: request.body["roomName"]
        },
        function (err, room) {
            if (err) {
                response.status(500);
                response.send({
                    "ErrorCode": "INTERNAL_SERVER_ERROR"
                });
                return response.end();
            }
            if (!room) { //if room not found, return 400
                response.status(400);
                response.send({
                    "ErrorCode": "ROOM_NOT_FOUND"
                });
                return response.end();
            }
            if (room.clientUsers.indexOf(request.body.username) === -1) {
                req.session.username = (request.body.username);
                req.session.room = (request.body.roomId);
                room.clientUsers.push(request.body.username)
                room.save(function (err) {
                    if (err) {
                        response.status(500);
                        response.send({
                            "ErrorCode": "INTERNAL_SERVER_ERROR"
                        });
                        return response.end();
                    }
                });
                response.status(200); //returns 200 on success
                io.emit('userJoin', room);
                response.send(room); //returns user as response
                return response.end();
            } else {
                response.status(400);
                response.send({
                    "ErrorCode": "BAD_USERNAME"
                });
                return response.end();
            }
        });
});

app.post('/createRoom', function (request, response) {
    console.log('creating room');
    Room.findOne({
            roomId: request.body["roomName"]
        },
        function (err, room) {
            if (err) {
                response.status(500);
                response.send({
                    "ErrorCode": "INTERNAL_SERVER_ERROR"
                });
                return response.end();
                return console.error(err);
            }
            if (room) { //if room not found, return 400
                response.status(400);
                response.send({
                    "ErrorCode": "ROOM_NAME_TAKEN"
                });
                return response.end();
            } else {
                var newRoom = new Room;
                newRoom.name = request.body.name;
                newRoom.hostUser = request.body.username;
                newRoom.password = request.body.password;
                newRoom.save(function (err) {
                    if (err) {
                        response.status(500);
                        response.send({
                            "ErrorCode": "INTERNAL_SERVER_ERROR"
                        });
                        return response.end();
                    }
                });
                req.session.username = (request.body.username);
                req.session.room = (request.body.roomId);
                io.emit('userJoin', room);
                response.status(201);
                response.send(room);
                return response.end();
            }
        });
});