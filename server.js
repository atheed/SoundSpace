var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); //for JSON parsing for request body
var options = {
    root: __dirname
}

//Connect to MongoDB database
var DB_PORT = "27017";
mongoose.connect('mongodb://localhost:' + DB_PORT+"/301db");
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

app.get('/id3-minimized.js', function(req, res){
    res.sendfile('./static/JavaScript-ID3-Reader/dist/id3-minimized.js');
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
                response.status(201);
                return response.end();
            }
        });
})

//todo: implement placeholder functions once dynamic playlist works

//EXPECTS: roomName, and an array containing a list of song objects contain filename and file path
app.post('/addAvailableSong', function (request, response) {
    console.log('adding available song');
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
            } else {
                for (i = 0; i < songs.length; i++) {
                    room.availableSongs.append({
                        songName: request.body.songs[i].fileName,
                        songPath: request.body.songs[i].filePath
                    });
                }
                room.save(function (err) {
                    if (err) {
                        response.status(500);
                        response.send({
                            "ErrorCode": "INTERNAL_SERVER_ERROR"
                        });
                        return response.end();
                    }
                });
                response.status(200);
                return response.end();
            }
        });
});

//todo: implement placeholder functions once dynamic playlist works
app.post('/addSongToPlaylist', function (request, response) {
    console.log('adding song to playlist');
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
            } else {
                for (i = 0; i < songs.length; i++) {
                    room.upcomingSongs.append({
                        songName: request.body.songs[i].fileName,
                        songPath: request.body.songs[i].filePath
                    });
                }
                room.save(function (err) {
                    if (err) {
                        response.status(500);
                        response.send({
                            "ErrorCode": "INTERNAL_SERVER_ERROR"
                        });
                        return response.end();
                    }
                });
                response.status(200);
                return response.end();
            }
        });
});

//todo: implement placeholder functions once dynamic playlist works
app.post('/removeAvailableSong', function (request, response) {
    console.log('removing song from available songs');
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
            } else {
                for (i = 0; i < songs.length; i++) {
                    room.availableSongs = room.availableSongs.splice(getIndex({
                        songName: request.body.songs[i].fileName,
                        songPath: request.body.songs[i].filePath
                    }), 1);
                }
                room.save(function (err) {
                    if (err) {
                        response.status(500);
                        response.send({
                            "ErrorCode": "INTERNAL_SERVER_ERROR"
                        });
                        return response.end();
                    }
                });
                response.status(200);
                response.end();
            }
        });
});

//todo: implement placeholder functions once dynamic playlist works
app.post('/removeSongFromPlaylist', function (request, response) {
    console.log('removing song from playlist');
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
            } else {
                for (i = 0; i < songs.length; i++) {
                    room.upcomingSongs = room.upcomingSongs.splice(getIndex({
                        songName: request.body.songs[i].fileName,
                        songPath: request.body.songs[i].filePath
                    }), 1);
                }
                room.save(function (err) {
                    if (err) {
                        response.status(500);
                        response.send({
                            "ErrorCode": "INTERNAL_SERVER_ERROR"
                        });
                        return response.end();
                    }
                });
                response.status(200);
                response.end();
            }
        });
});

app.post('/currentSong', function (request, response) {
    console.log('retrieving current song information');
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
            response.status(200);
            response.send(room.currentSong);
            return response.end();
        });
});

app.get('/playNextSong', function (request, response) {
    console.log('retrieving next song on the play list');
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
            room.playedSongs.append(currentSong);
            if (room.upcomingSongs[0]) {
                room.currentSong = room.upcomingSongs[0];
                room.upcomingSongs = room.upcomingSongs.splice(0, 1);
            }
            room.save(function (err) {
                if (err) {
                    response.status(500);
                    response.send({
                        "ErrorCode": "INTERNAL_SERVER_ERROR"
                    });
                    return response.end();
                }
            });
            response.status(200);
            return response.end();
        });
});

app.post('/getAvailableSongs', function (request, response) {
    console.log('retrieving available songs');
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
            response.status(200);
            response.send(room.availableSongs);
            return response.end();
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