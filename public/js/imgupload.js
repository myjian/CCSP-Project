var reader;
var imgdata;
var sent_parts = 0;

var video_preview = '<video controls style="width: 100%">您的瀏覽器不支援 HTML5 影片播放標籤 &lt;video&gt; 格式。<br>Your browser doesn\'t support the &lt;video&gt; tag.</video>';
var image_preview = '<img class="img-responsive">';

$("#loadfile").click(function(){
    $("#upload").fadeOut();
    $('#preview').fadeOut();
});

$("[name=file]").change(function(){
    var file = this.files[0];
    reader = new FileReader();
    reader.onload = function (e){
        imgdata = e.target.result;
        //$("#submit").fadeIn();
        $("#upload").fadeIn().button('reset');
        if (imgdata.slice(5,10) === "image") {
            $("#preview").html($(image_preview).attr('src', e.target.result));
        }
        $('#preview').fadeIn();
    }
    reader.readAsDataURL(file);
});


$("#upload").click(function(){
    $(this).button('loading');
    len = imgdata.length;
    num_parts = Math.ceil(len/50000);
    $("#progress").show();
    $("#progress").attr("max", num_parts);
    $.ajax({
        type: 'POST',
        url: window.location,
        data: {data: '', part: -1, num_parts: num_parts},
        dataType: 'text',
        success: function(response){
            uploadimg(0, num_parts);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.warning('failed');
        }
    });
});


function uploadimg(i, num_parts){
    senddata = imgdata.slice(50000 * i, 50000 * (i + 1));
    $.ajax({
        type: 'POST',
        url: window.location,
        data: {data: senddata, part: i, num_parts: num_parts},
        dataType: 'text',
        success: function(response){
            sent_parts = sent_parts + 1;
            console.log(sent_parts + '/' + num_parts + ' sent');
            $("#progress").attr("value", sent_parts);
            if (sent_parts >= num_parts){
                window.location.assign(response);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.warning('part ' + i + ' of ' + num_parts + 'failed');
        }
    });
    i++;
    if(i < num_parts)
    {
        setTimeout(uploadimg(i, num_parts), 1000);
    }
}
