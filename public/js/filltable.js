var info = {taipei: '<br><a class="btn btn-danger col-xs-10 col-xs-offset-1" href="https://www.tcpd.gov.tw/tcpd/cht/index.php?act=traffic&code=add">現在就去檢舉</a><br><br><br><img class="img" style="width:100%;" src="/fig/台北市.jpg">',
highway: '<br><a class="btn btn-danger col-xs-10 col-xs-offset-1" href="https://services.hpb.gov.tw/WOSWeb/RVDefault.aspx">現在就去檢舉</a><br><br><br><img class="img" style="width:100%;" src="/fig/國道.jpg">'};

$("select[name=country]").on('change',function(){

	console.log(this.options[this.selectedIndex].value);
	$("#information").empty();

	country = this.options[this.selectedIndex].value;

	if(this.options[this.selectedIndex].value == "台北市")
	{
		$("#reportInfo").hide();

		if(screen.width > 800)
		{			
			$("#information").append('<div style="width:80%; margin-left:10%; margin-right:10%;">'+info.taipei+'</div>');
		}
		else
		{
			$("#information").append(info.taipei);	
		}
	}
	else if (this.options[this.selectedIndex].value == "國道") 
	{
		$("#reportInfo").hide();
		if(screen.width > 800)
		{			
			$("#information").append('<div style="width:80%; margin-left:10%; margin-right:10%;">'+info.highway+'</div>');
		}
		else
		{
			$("#information").append(info.highway);
		}
	}
	else if(this.options[this.selectedIndex].value == "請選擇縣市")
	{
		$("#reportInfo").hide();
	}
	else
	{
		$("#reportInfo").show();
	};

});
