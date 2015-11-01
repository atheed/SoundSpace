var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser'); //for JSON parsing for request body
var upcomingSongs = [];
var playedSongs = [];
var options = {
    root: __dirname
}

app.use(express.static(__dirname + '/static'));

//todo: implement
app.post('/createNewPlayList', function (request, response) {
    console.log('creating playlist');
    response.end();
});

//todo: implement
app.post('/addSongToPlaylist', function (request, response) {
    console.log('adding son to playlist');
    response.end();
});

//todo: implement
app.post('/removeSongFromPlaylist', function (request, response) {
    console.log('removing song from playlist');
    response.end();
});

//todo: implement
app.get('/currentSong', function (request, response) {
    console.log('retrieving current song information');
    response.end();
});

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
        response.send(data);
        response.end();

    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
});