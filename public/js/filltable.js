var info = {taipei: '<a class="btn btn-default col-xs-10 col-xs-offset-1" href="https://www.tcpd.gov.tw/tcpd/cht/index.php?act=traffic&code=add">現在就去檢舉</a><img style="width:100%;" src="/fig/台北市.jpg">',
highway: '<a class="btn btn-default col-xs-10 col-xs-offset-1" href="https://services.hpb.gov.tw/WOSWeb/RVDefault.aspx">現在就去檢舉</a><img style="width:100%;" src="/fig/國道.jpg">'};

$("#country").on('change',function(){

	console.log(this.options[this.selectedIndex].value);
	$("#information").empty();

	country = this.options[this.selectedIndex].value;

	if(this.options[this.selectedIndex].value == "台北市")
	{
		$("#reportInfo").hide();
		$("#information").append(info.taipei);
	}
	else if (this.options[this.selectedIndex].value == "國道") 
	{
		$("#reportInfo").hide();
		$("#information").append(info.highway);
	}
	else
	{
		$("#reportInfo").show();
	};

});
