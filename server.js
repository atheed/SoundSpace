var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser'); //for JSON parsing for request body
var options = {
    root: __dirname
}

//Connect to MongoDB database
mongoose.connect('mongodb://localhost:' + DB_PORT);
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

app.use(express.static(__dirname + '/static'));

//Bind middleware for parsing response
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/joinRoom', function (request, response) {
    console.log('joining room');
    Room.findOne({
            roomId: request.body["roomName"]
        },
        function (err, room) {
            if (err) {
                return console.error(err);
            }
            if (!room) { //if room not found, return 400
                response.status(400);
                response.send({
                    "ErrorCode": "BAD_USERNAME"
                });
                return response.end();
            }
            if (room.lientUsers.indexOf(request.body.username) === -1) {
                room.clientUsers.append(request.body.username)
                response.status(200); //returns 200 on success
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
                response.status(201);
                return response.end();
            }
        });
})

//todo: implement placeholder functions once dynamic playlist works
app.post('/addAvailableSong', function (request, response) {
    console.log('adding song to playlist');
    upcomingSongs.push(response.body);
    response.status(201);
    response.end();
});

//todo: implement placeholder functions once dynamic playlist works
app.post('/addSongToPlaylist', function (request, response) {
    console.log('adding song to playlist');
    upcomingSongs.push(response.body);
    response.status(201);
    response.end();
});

//todo: implement placeholder functions once dynamic playlist works
app.post('/removeAvailableSong', function (request, response) {
    console.log('removing song from playlist');
    upcomingSongs.splice(getIndex(response.body), 1);
    response.end();
});

//todo: implement placeholder functions once dynamic playlist works
app.post('/removeAvailableSongFromPlaylist', function (request, response) {
    console.log('removing song from playlist');
    upcomingSongs.splice(getIndex(response.body), 1);
    response.end();
});

app.post('/currentSong', function (request, response) {
    console.log('retrieving current song information');
    response.status(200);
    response.set({
        'Content-Type': 'text/json',
    });
    response.json(currentSong);
    response.end();
});

app.get('/playNextSong', function (request, response) {
    console.log('retrieving next song on the play list');
    playedSongs.push(currentSong);
    currentSong = upcomingSongs.pop();
    response.json(currentSong);
    response.end();
});

//todo: implement dynamic playlist
app.get('/currentPlaylist', function (request, response) {
    console.log('retrieving current playlist information');
    fs.readFile('playlist.json', "binary", function (err, data) {
        if (err) {
            response.status(500);
            response.set({
                'Content-Type': 'text/plain',
            });
            response.send(err + "\n");
            response.end();
            return;
        }
        response.status(200);
        response.set({
            'Content-Type': 'text/json',
        });
        response.json(data);
        response.end();
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
});

var getPlayListName = function (body) {
    return null;
}

var getIndex = function (body) {
    return null;
}