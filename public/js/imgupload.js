var image_preview = '<img class="img-responsive">';

$("#loadfile").click(function(){
    $("#upload").fadeOut();
    $('#preview').fadeOut();
});

$("[name=file]").change(function(){
    var file = this.files[0];
    if (file.type.startsWith('image')) {
        var reader = new FileReader();
        reader.onload = function (e){
            var imgdata = e.target.result;
            $("#preview").html($(image_preview).attr('src', imgdata));
            $('#preview').fadeIn();
        }
        reader.readAsDataURL(file);
    }
    $("#upload").fadeIn().button('reset');
});

$("#upload").click(function(){
    $(this).button('loading');
    $("#progress").show();
    var formData = new FormData(document.forms[0]);
    $.ajax({
        type: 'POST',
        url: window.location,
        data: formData,
        xhr: function() {  // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', function(e) {
                    console.log('progress ' + e.loaded + '/' + e.total);
                    if(e.lengthComputable){
                        $('progress').attr({value: e.loaded, max: e.total});
                    }
                }, false);
            }
            return myXhr;
        },
        // Ajax events
        success: function(response) {
            window.location.assign('.');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.warn(textStatus);
            console.warn(errorThrown);
        },
        // Options to tell jQuery not to process data or worry about content-type.
        contentType: false,
        cache: false,
        processData: false
    });
});
