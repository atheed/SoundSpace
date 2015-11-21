$(window).ready(function() {
    getFileInput();
    //getPlaylist();
});

$(document).on('click', '#createRoomButton', function(){
    $("#landing").hide();
    $("#create").show();
    //TODO: Connect to backend with proper call
});

$(document).on('click', '#privRadio', function(){
    $("#create > .input-field > input").show();
});

$(document).on('click', '#pubRadio', function(){
    $("#create > .input-field > input").hide();
});

$(document).on('click', '#joinRoomButton', function(){
    $("#landing").hide();
    $("#join").show();
    //TODO: Connect to backend with proper call
    //TODO: Edit "existing room" inside password prompt to fetched room name
});

/* Function to change button text/classes/etc appropraitely upon clicking.
*  Later on, can also be the starting point to actually do the upvote (i.e. to 
*  propagate the vote onto the ordering of the queue)
*/
$(document).on('click', '.upvoteButton', function() {
    var $this = $(this);
    $this.text('Undo upvote');
    $this.removeClass("upvoteButton");
    $this.addClass("undoUpvoteButton");
    var del = this.id.slice(0, -1) + 'd';
    document.getElementById(del).style.display = "none";
});


/* Function to change button text/classes/etc appropraitely upon clicking.
*  Later on, can also be the starting point to actually do the undo upvote (i.e. to 
*  propagate the undo upvote onto the ordering of the queue)
*/
$(document).on('click', '.undoUpvoteButton', function() {
    var $this = $(this);
    $this.text('Upvote');
    $this.removeClass("undoUpvoteButton");
    $this.addClass("upvoteButton");
    var del = this.id.slice(0, -1) + 'd';
    document.getElementById(del).style.display = "inline";
});


/* Function to change button text/classes/etc appropraitely upon clicking.
*  Later on, can also be the starting point to actually do the downvote (i.e. to 
*  propagate the downvote onto the ordering of the queue)
*/
$(document).on('click', '.downvoteButton', function() {
    var $this = $(this);
    $this.text('Undo downvote');
    $this.removeClass("downvoteButton");
    $this.addClass("undoDownvoteButton");
    var del = this.id.slice(0, -1) + 'u';
    document.getElementById(del).style.display = "none";
});


/* Function to change button text/classes/etc appropraitely upon clicking.
*  Later on, can also be the starting point to actually do the undo downvote (i.e. to 
*  propagate the undo downvote onto the ordering of the queue)
*/
$(document).on('click', '.undoDownvoteButton', function() {
    var $this = $(this);
    $this.text('Downvote');
    $this.removeClass("undoDownvoteButton");
    $this.addClass("downvoteButton");
    var del = this.id.slice(0, -1) + 'u';
    document.getElementById(del).style.display = "inline";
});


/* Makes an AJAX call to get the playlist from the back-end
*  TODO: Design decision : one playlist per room?
*  Should client be able to get different playlists by playlist id?
*  Expand the function accordingly
*/
function getPlaylist(){
    $.ajax({
      type: "GET",
      url: "/currentPlaylist",
      dataType: "json"
    }).done(function(data) {
        var table = '<div class="datagrid showHideQueue">' + '<table id="queue">' + 
            '<thead><tr><th>Song</th><th>Artist</th><th>Duration</th><th>Genre</th><th>Year</th><th>Actions</th></tr></thead>' + 
            '<tbody></tbody></table></div>'
        //$("Songs on the Queue").appendTo('#queue_playlist');
        $(table).appendTo('#queue_playlist');
        if(data.songs.length == 0) {
            var tblRow = "<td>No songs on this playlist</td><td></td><td></td><td></td><td></td><td></td>";
            $(tblRow).appendTo("#queue tbody");
        } else {
            var count = 0;
            jQuery.each(data.songs, function() {
                var tblRow = "";
                if(count % 2 === 0) {
                    tblRow = '<tr class="playable" id="';
                } else {
                    tblRow = '<tr class="playable alt" id="';
                }
                var tblRow = tblRow + this.path +'">' + "<td>" + this.name + "</td>" + "<td>" + this.artist + "</td>" + 
                "<td>" + this.duration + "</td>" + "<td>" + this.genre + "</td>" + "<td>" + this.year + "</td>" + 
                '<td><button type="button" id="' + this.path + 'u" class="upvoteButton">Upvote</button> <button type="button" id="' + this.path + 'd" class="downvoteButton" style.display="block">Downvote</button></td></tr>';
                $(tblRow).appendTo("#queue tbody");
                count++;
            });
        }
    });
}

/*
* Makes and AJAX call to create a new playlist at the back-end
* TODO: Add any additional consequent action necessary to .done()
*   which may be none...
*/
function createRoom(roomNameIn, userNameIn, passwordIn){
    $.ajax({
      type: "POST",
      url: "/createRoom",
      dataType: "json",
      name: roomNameIn,
      username : userNameIn,
      password : passwordIn
    })
    .fail(function(){
        console.log("Create playlist failed");
    })
    .done(function(data){
        console.log("Playlist: " + roomNameIn + " was successfully created");
    });
};

/*
* Makes and AJAX call to log into a specified playlist at the back-end
* TODO: Add any additional consequent action necessary to .done()
*   which may be none...
*/
function getAllPlaylists(){
    $.ajax({
      type: "GET",
      url: "/getAllPlaylists",
      dataType: "json",
    })
    .fail(function(){
        console.log("Get all playlists failed");
    })
    .done(function(data){
        console.log("All open playlists fetched successfully");
        //ADD display all fetched playlists on UI functionality here.
    });
};

/*
* Makes and AJAX call to get a list of available songs to be added to playlist
* TODO: Add any additional consequent action necessary to .done()
*   which may be none...
*/
function getAvailableSongs(){
    $.ajax({
      type: "GET",
      url: "/getAvailableSongs",
      dataType: "json",
    })
    .fail(function(){
        console.log("Get available songs failed");
    })
    .done(function(data){
        console.log("All available songs fetched successfully");
        //ADD display available songs on UI functionality here.
    });
};




/*
* Makes and AJAX call to log into a specified playlist at the back-end
* TODO: Add any additional consequent action necessary to .done()
*   which may be none...
*/
function logIntoPlaylist(playlistNameInput, userNameInput, passwordInput){
    $.ajax({
      type: "POST",
      url: "/logIntoPlaylist",
      dataType: "json",
      playListName: playlistNameInput,
      userName : userNameInput,
      password : passwordInput
    })
    .fail(function(){
        console.log("Log into playlist failed");
    })
    .done(function(data){
        console.log(userNameInput + " logged into: " + playlistNameInput + " successfully.");
    });
};

var playlist = [];
var curr = -1;
//Handles dealing with file Input
function getFileInput() {
    var fileInput = document.getElementById("FileInput");
    fileInput.addEventListener('change', function(evt){
        for (i=0; i < fileInput.files.length; i++) {
            var file = fileInput.files[i],
                url = file.urn || file.name;
            ID3.loadTags(url, function() {
                showTags(url);
            }, {
                tags: ["title","artist","album","picture"],
                dataReader: ID3.FileAPIReader(file)
            });
            var reader = new FileReader();
            reader.onload = (function(theFile) {
                return function(e) {
                    playlist.push(e.target.result.toString());
                    if (i == fileInput.files.length) {
                        if (curr == -1) {
                            curr = 0;
                            replaceAudioElement();
                        }
                    }
                };
            })(file);
            reader.readAsDataURL(file);
        }
    });
}

function replaceAudioElement() {
    $("audio").remove();
    $(".first").after("<audio controls></audio>");
    $("audio").append("<source id='player' src='" + playlist[curr]+"' type='audio/mp3'>");
    $("audio").append("Your browser does not support this music player.");
    $("audio").on("ended", function() {
        if (curr != playlist.length -1) {
            curr += 1;
            replaceAudioElement();
        }
    });
}

/*Displays the song info after loaded
* TODO: change function to send data to server
*/
function showTags(url) {
    var tags = ID3.getAllTags(url);
    console.log(tags);
    alert (tags.title + " " + tags.artist + " " + tags.album);
}