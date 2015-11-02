var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser'); //for JSON parsing for request body
var upcomingSongs = [];
var playedSongs = [];
var options = {
    root: __dirname
}
var currentSong;
var currentPlayListName;

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());

//todo: implement placeholder functions once dynamic playlist works
app.put('/createNewPlayList', function (request, response) {
    console.log('creating playlist');
    currentPlayListName = getPlayListName(response.body);
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
app.post('/removeSongFromPlaylist', function (request, response) {
    console.log('removing song from playlist');
    upcomingSongs.splice(getIndex(response.body), 1);
    response.end();
});

//todo: implement
app.post('/createRoom', function (request, response) {
    console.log('creating room');
});

//todo:implement
app.post('/joinRoom', function(request, response) {
    console.log('joining room');
});

app.get('/currentSong', function (request, response) {
    console.log('retrieving current song information');
    response.status(200);
    response.set({
        'Content-Type': 'text/json',
    });
    response.json(currentSong);
    response.end();
});

app.get('/nextSong', function (request, response) {
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
        console.log(data);
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