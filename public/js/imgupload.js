var reader;
var imgdata;
var getcount = 0;


$("[type=file]").change(function(){
	var file = this.files[0];
	var img = $(this).siblings('img');
	reader = new FileReader();
	reader.onload = function (e) {
		img.attr('src', e.target.result);
		imgdata = e.target.result;
	}
	reader.readAsDataURL(file);
});


$("#upload").click(function(){
	$(this).button('loading');
	len = imgdata.length;
	times = Math.ceil(len/50000);
	uploadimg(0, times);
	//alert(imgdata.slice(5,10));
});


function uploadimg(i, times){
		senddata = imgdata.slice(0 + i*50000, 50000 + i*50000);
		//alert(senddata.length);
		$.ajax({
			type: 'POST',
			url: "/imgupload/"+(i+1),
			data: {data: senddata, max: times},
			dataType: 'text',
			success: function(response) {
				//alert(response);
				getcount = getcount + 1;
				if(getcount >= times)
				{
					window.location.assign('/imgsend');
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(i);
			}
		});
	i++;
	if(i < times)
	{
		setTimeout(uploadimg(i, times, send), 1000);
	}

}
