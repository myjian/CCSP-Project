var info = '<div id="insertinfo"><div class="row"><input type="text" class="col-xs-10 col-xs-offset-1" id="plate" name="plate" placeholder="車牌"></div><div class="row"><input type="text" class="col-xs-10 col-xs-offset-1" id="road" name="road" placeholder="路段"></div><div class="row"><input type="textarea" class="col-xs-10 col-xs-offset-1" id="condition" name="condition" placeholder="情況簡述"></div><div class="row"><a class="btn btn-default col-xs-3 col-xs-offset-1" id="upload" href="#">上傳影片</a><input type="text" class="col-xs-7" id="url" name="url" placeholder="影片網址"></div><div class="row"><input type="submit" class="btn btn-default col-xs-10 col-xs-offset-1" value="確認送出"></div></div>'

$("#country").on('change',function(){

	console.log(this.options[this.selectedIndex].value);
	$("#insertinfo").remove();
	$("#information").append(info);


});
