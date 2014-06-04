var reader;
var imgdata;
var sent_parts = 0;


$("#loadfile").on('click', function(){
    $("#upload").fadeOut();
});

$("[name=file]").change(function(){
    var file = this.files[0];
    //var img = $(this).siblings('img');
    reader = new FileReader();
    reader.onload = function (e){
        //img.attr('src', e.target.result);
        imgdata = e.target.result;
        //$("#submit").fadeIn();
        $("#upload").fadeIn();
        if(imgdata.slice(5,10) === "video")
        {
            $("#previewImg").hide();
            $("#movie").attr('src', e.target.result);
            $("#movie").show();
        }
        else if(imgdata.slice(5,10) === "image")
        {
            $("#movie").hide();
            $("#previewImg").attr('src', e.target.result);
            $("#previewImg").show();
        }
    }
    reader.readAsDataURL(file);
});


$("#upload").click(function(){
    $(this).button('loading');
    len = imgdata.length;
    num_parts = Math.ceil(len/50000);
    $("#progress").show();
    $("#progress").attr("max", num_parts);
    uploadimg(0, num_parts);
    //alert(imgdata.slice(5,10));
});


function uploadimg(i, num_parts){
    senddata = imgdata.slice(0 + i*50000, 50000 + i*50000);
    $.ajax({
        type: 'POST',
        url: window.location,
        data: {data: senddata, part: i, num_parts: num_parts},
        dataType: 'text',
        success: function(response){
            sent_parts = sent_parts + 1;
            
            $("#progress").attr("value", sent_parts);
            if (sent_parts >= num_parts)
            {
                document.location="/userRecords/"+response+"/success";
            }
            else
            {
            	
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