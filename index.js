$(window).ready(function() {
    var fileInput = document.getElementById("FileInput");
    fileInput.addEventListener('change', function(evt){
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                $("audio").remove();
                $("body").append("<audio controls></audio>");
                $("audio").append("<source id='player' src='" + e.target.result.toString()+"' type='audio/mp3'>");
                $("audio").append("Your browser does not support this music player.");
            };
        })(file);
        reader.readAsDataURL(file);
    });
});



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

/*
*
*
*
*/