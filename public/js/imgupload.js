var reader;
var imgdata;

$(function(){
	$("[type=file]").change(function(){
		var file = this.files[0],
		img = $(this).siblings('img')
		reader = new FileReader()
		reader.onload = function (e) {
			img.attr('src', e.target.result);
			imgdata = e.target.result;
			len = imgdata.length;
			times = len/50000;
			var i = 0;
			var send = new Date();
			uploadimg(i, times, send);

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
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(i);
			},
		});
		i++;
		setTimeout(uploadimg(i, times, send), 1000);
	}

}