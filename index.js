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