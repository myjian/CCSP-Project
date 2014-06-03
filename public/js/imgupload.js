var reader;
var imgdata;
var getcount = 0;

$("#send").hide();

$(function(){
	$("[type=file]").change(function(){
		var file = this.files[0],
		img = $(this).siblings('img')
		reader = new FileReader()
		reader.onload = function (e) {
			img.attr('src', e.target.result);
			imgdata = e.target.result;
			len = imgdata.length;
			times = Math.ceil(len/50000);
			var i = 0;
			var send = new Date();
			uploadimg(i, times, send);
			alert(imgdata.slice(5,10));

		}
		reader.readAsDataURL(file);
	})
})


function uploadimg(i, times, send){

	if(i <= times)
	{
		senddata = imgdata.slice(0 + i*50000, 50000 + i*50000)
		//alert(senddata.length);
		$.ajax({
			type: 'POST',
			url: "/imgupload/"+(i+1),
			data: {data: senddata, id: send, max: times},
			dataType: 'text',
			success: function(response) {
				//alert(response);
				getcount = getcount + 1;
				if(getcount >= times)
				{
					$("#send").show();
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(i);
			},
		});
		i++;
		setTimeout(uploadimg(i, times, send), 1000);
	}

}