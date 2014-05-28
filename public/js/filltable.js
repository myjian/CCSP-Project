var info = '<div id="insertinfo"><div class="row"><input type="text" class="col-xs-10 col-xs-offset-1" id="plate" name="plate" placeholder="車牌"></div><div class="row"><input type="text" class="col-xs-10 col-xs-offset-1" id="road" name="road" placeholder="路段"></div><div class="row"><input type="textarea" class="col-xs-10 col-xs-offset-1" id="condition" name="condition" placeholder="情況簡述"></div><div class="row"><a class="btn btn-default col-xs-3 col-xs-offset-1" id="upload" href="#">上傳影片</a><input type="text" class="col-xs-7" id="url" name="url" placeholder="影片網址"></div><div class="row"><input type="submit" class="btn btn-default col-xs-10 col-xs-offset-1" value="確認送出"></div></div>';
var info2 = {taipei: '<div id="insertinfo"><div class="row"><img style="width:100%;" src="/fig/台北市.jpg"><a class="btn btn-default col-xs-10 col-xs-offset-1" href="https://www.tcpd.gov.tw/tcpd/cht/index.php?act=traffic&code=add">現在就去檢舉</a></div></div>',
highway: '<div id="insertinfo"><div class="row"><img style="width:100%;" src="/fig/國道.jpg"><a class="btn btn-default col-xs-10 col-xs-offset-1" href="https://services.hpb.gov.tw/WOSWeb/RVDefault.aspx">現在就去檢舉</a></div></div>'}


$("#country").on('change',function(){

	console.log(this.options[this.selectedIndex].value);
	$("#insertinfo").remove();

	country = this.options[this.selectedIndex].value;

	if(this.options[this.selectedIndex].value == "台北市")
	{
		$("#information").append(info2.taipei);
	}
	else if (this.options[this.selectedIndex].value == "國道") 
	{
		$("#information").append(info2.highway);
	}
	else
	{
		$("#information").append(info);
	};

});
