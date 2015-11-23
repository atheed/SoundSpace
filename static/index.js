var roomInput;
var userInput;
var passwordInput;
var currentRoomName;
var currentUserName;
var socket = io();

$(window).ready(function () {
    
    //getPlaylist();
});

/*
 * Triggered when Create Room button is clicked on the landing page
 * Hides the landing page and reveals the secondary create room page if a room name is entered
 */
$(document).on('click', '#createRoomButton', function () {
    if (entryFieldsFilled()) {
        $("#landing").hide();
        $("#create").show();
    }
});

/*
 * Triggered when Create Continue button is clicked on the create room page
 * Hides the landing page and reveals the secondary create room page if a room name is entered
 */
$(document).on('click', '#createContinueButton', function () {
    passwordInput = $('[name = "pswdfield"]').val();
    $("#errorField").text("");
    createRoom(roomInput, userInput, passwordInput);
    
});

/*
 * Triggered when room name input field is clicked 
 * Resets the 'Room Name' placeholder text inside the input field
 * In case user previously caused the text to change to a warning 
 */
$(document).on('click', "#roomNameField", function () {
    $("#roomNameField").attr("placeholder", "Room Name");
});

/*
 * Triggered when user name input field is clicked 
 * Resets the 'User Name' placeholder text inside the input field
 * In case user previously caused the text to change to a warning 
 */
$(document).on('click', "#userNameField", function () {
    $("#userNameField").attr("placeholder", "User Name");
});


/*
 * Triggered when private radio button in secondary room creation screen is clicked
 * Reveals the password field
 */
$(document).on('click', '#privRadio', function () {
    $("#create > .input-field > input").show();
});

/*
 * Triggered when public radio button in secondary room creation screen is clicked
 * Resets and hides the password field
 */
$(document).on('click', '#pubRadio', function () {
    $('[name = "pswdfield"]').val();
    $("#create > .input-field > input").hide();
});

/*
 * Triggered when join room button is pressed on landing page
 * Hides the landing page if a room name is entered
 * Shows a password input field if the room is private
 */
$(document).on('click', '#joinRoomButton', function () {
    if (entryFieldsFilled()) {
        $("#errorField").text("");
        //Private room functionality not yet implemented.
        //$("#join").show();
        joinRoom(roomInput, userInput, "");
        //Error handling for private rooms
        //Trigger password input
    }
});

/*
 * Triggered when a Back button is clicked while either creating or joining a room
 * Hides the create/join room page and reverts to the landing page
 */
$(document).on('click', '.backButton', function () {
    if (entryFieldsFilled()) {
        $("#landing").show();
        $("#create").hide();
        $("#join").hide();
        $('.passwordField').val('');
    }
});

/* Function to change button text/classes/etc appropraitely upon clicking.
 *  Later on, can also be the starting point to actually do the upvote (i.e. to 
 *  propagate the vote onto the ordering of the queue)
 */
$(document).on('click', '.upvoteButton', function () {
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
$(document).on('click', '.undoUpvoteButton', function () {
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
$(document).on('click', '.downvoteButton', function () {
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
$(document).on('click', '.undoDownvoteButton', function () {
    var $this = $(this);
    $this.text('Downvote');
    $this.removeClass("undoDownvoteButton");
    $this.addClass("downvoteButton");
    var del = this.id.slice(0, -1) + 'u';
    document.getElementById(del).style.display = "inline";
});

/* Shows/hides the person who suggested the song
 *  Credits to Matt Kruse for the idea
 */
$(function () {
    $('tr.parent')
        .css("cursor", "pointer")
        .click(function () {
            $(this).siblings('.child-' + this.id).toggle();
        });
    $('tr[@class^=child-]').hide().children('td');
});

/*
 * Makes and AJAX call to create a new playlist at the back-end
 * TODO: Add any additional consequent action necessary to .done()
 *   which may be none...
 */

$(document).on('click', '#nextSong', function() {
    if (curr != playlist.length - 1) {
        curr += 1;
        replaceAudioElement($("audio").prop("volume"));
    }
});

$(document).on('click', '#prevSong',function() {
    if (curr != 0) {
        curr -=1;
        replaceAudioElement($("audio").prop("volume"));
    }
});

function createRoom(roomNameIn, userNameIn, passwordIn) {
    $.ajax({
        type: "POST",
        url: "/createRoom",
        dataType: "json",
        data: {
            roomName: roomNameIn,
            username: userNameIn,
            password: passwordIn,
        },
        statusCode: {
            201: function (data) {
                console.log("roomcreated");
                console.log(data);
                $("#create").hide();
                $("#playlist").show();
                getFileInput();
                //TODO: Trigger Join to the newly created room
            },
            400: function () {
                $("#errorField").text("Room Name already exists. Select a different room name.");
            },
            500: function () {
                $("#errorField").text("Internal Server Error");
            }
        }
    })
};



/*
 * Makes and AJAX call to log into a specified playlist at the back-end
 * TODO: Add any additional consequent action necessary to .done()
 *   which may be none...
 */
function joinRoom(roomNameInput, userNameInput, passwordInput) {
    var data = {
        roomName: roomNameInput,
        username: userNameInput,
        password: passwordInput
    };
    $.ajax({
        type: "POST",
        url: "/joinRoom",
        dataType: "json",
        data: data,
        statusCode: {
            200: function (data) {
                $("#landing").hide();
                $("#playlist").show();
                console.log(data);
                console.log(userNameInput + " logged into: " + roomNameInput + " successfully.");
            },
            400: function () {
                $("#errorField").text("Room not found.");
            },
            500: function () {
                $("#errorField").text("Internal Server Error.");
            }
        }
    })
};

var playlist = [];
var songs = [];
var songnames = [];
var songurls = [];
var songpaths = [];
var curr = -1;
//Handles dealing with file Input
function getFileInput() {
    var fileInput = document.getElementById("FileInput");
    fileInput.addEventListener('change', function (evt) {
        songs = [];
        songnames = [];
        songurls = [];
        songpaths = [];
        for (i = 0; i < fileInput.files.length; i++) {
            var file = fileInput.files[i],
                url = file.urn || file.name;
            songurls.push(url);
            songnames.push("");
        }
        readFile(fileInput.files, 0);
    });
}

function readFile(files, i) {
    var file = files[i];
    var reader = new FileReader();
    reader.onload = (function (theFile) {
        return function (e) {
            songpaths.push(e.target.result.toString());
            playlist.push(e.target.result.toString());
            ID3.loadTags(songurls[i], function () {
                writeSongName(i);
            }, {
                tags: ["title", "artist", "album", "picture"],
                dataReader: ID3.FileAPIReader(file)
            });
            if (i == files.length - 1) {
                if (curr == -1) {
                    curr = 0;
                    replaceAudioElement(1);
                }
            } else {
                readFile(files, i + 1);
            }
        };
    })(file);
    reader.readAsDataURL(file);
}

function sendUpdate() {
    for (j = 0; j < songnames.length; j++) {
        songs.push({
            songName: songnames[j],
            songPath: songpaths[j],
            room: "demo"
        })
    }
    console.log(songs);
    socket.emit("playlistUpdate", {
        songs: songs,
        updateType: "add"
    });
}

function replaceAudioElement(volume) {
    $("audio").remove();
    $(".first").after("<audio controls autoplay='autoplay'></audio>");
    $("audio").append("<source id='player' src='" + playlist[curr] + "' type='audio/mp3'>");
    $("audio").append("Your browser does not support this music player.");
    $("audio").prop("volume", volume);
    $("audio").on("ended", function () {
        if (curr != playlist.length - 1) {
            curr += 1;
            replaceAudioElement($("audio").prop("volume"));
        }
    });

}


/*Displays the song info after loaded
 * TODO: change function to send data to server
 */
function writeSongName(i) {
    var url = songurls[i];
    var tags = ID3.getAllTags(url);
    songnames[i] = tags.title;
    if (i == songnames.length-1) {
        sendUpdate();
    }
}

function entryFieldsFilled() {
    roomInput = $("#roomNameField").val();
    userInput = $("#userNameField").val();

    if (roomInput == "" || userInput == "") {
        if (roomInput == "") {
            $("#roomNameField").attr("placeholder", "You must enter a room to continue");
        }
        if (userInput == "") {
            $("#userNameField").attr("placeholder", "You must enter a user name to continue");
        }
        return false;
    }
    return true;
}