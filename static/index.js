$(window).ready(function() {
    var fileInput = document.getElementById("FileInput");
    fileInput.addEventListener('change', function(evt){
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                $("#player").src = e.target.result; 
                console.log(e.target.result);
            };
        })(file);
        reader.readAsDataURL(file);
    });
});