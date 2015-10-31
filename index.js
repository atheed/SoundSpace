$(window).ready(function() {
    var fileInput = document.getElementById("FileInput");
    var src;
    fileInput.addEventListener('change', function(evt){
        var i = 0;
        var files = fileInput.files;
        var file = files[i];
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                src = e.target.result.toString();
                $("audio").remove();
                $("body").append("<audio id='player' preload='buffer' autoplay controls></audio>");
                $("audio").append("<source id='src' src='" + src +"' type='audio/mp3'>");
                $("audio").append("Your browser does not support this music player.");
                document.getElementById("player").onended = onEnd();
            };
        })(file);
        reader.readAsDataURL(file);
    });
});

function onEnd() {
    alert("This should come up when the song is over");
    /*$("audio").remove();
    $("body").append("<audio controls></audio>");
    $("audio").append("<source id='player' src='" + src +"' type='audio/mp3'>");
    $("audio").append("Your browser does not support this music player.");
    $("audio").bind("ended", onEnd());*/
    //This code was supposed to just re-add the same song again.
}


/* Makes an AJAX call to get the playlist from the back-end
*  TODO: Design decision : one playlist per room?
*  Should client be able to get different playlists by playlist id?
*  Expand the function accordingly
*/
function getPlaylist(){
    $.ajax({
      type: "GET",
      url: "/getPlaylist",
      dataType: "json"
    }).done(function(data) {
        /*This is where the dynamic changes to the html occur,
         Possibly going over the playlist per song, and creating new fields for each song vertically, simulating a playlist
         implement at will
            example: $('#results').html(JSON.stringify(data, null, 2));
        */
    });
}