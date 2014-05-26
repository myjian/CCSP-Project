var info = '<div class="row"><input type="text" class="col-xs-10 col-xs-offset-1" id="plate" name="plate" placeholder="車牌"></div><div class="row"><input type="text" class="col-xs-10 col-xs-offset-1" id="road" name="road" placeholder="路段"></div><div class="row"><input type="textarea" class="col-xs-10 col-xs-offset-1" id="condition" name="condition" placeholder="情況簡述"></div><div class="row"><a class="btn btn-default col-xs-3 col-xs-offset-1" id="upload" href="#">上傳影片</a><input type="text" class="col-xs-7" id="url" name="url" placeholder="影片網址"></div><div class="row"><input type="submit" class="btn btn-default col-xs-10 col-xs-offset-1" value="確認送出"></div>'



function validateForm(){
    console.log("validateForm");
    $("#frame").append('<iframe src="//www.tcpd.gov.tw/tcpd/cht/index.php?act=traffic&amp;code=add" id="taipeiSubmit" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="1100" scrolling="auto" name="dataframe" id="dataframe"></iframe>');
    return false;
}


function fillTable(){
    console.log("fillTable");
    $("input[name='email']").attr("value", "bill8124@gmail.com");
    //$("input[name='email']", parent.frames["dataframe"].document).attr("value", "123");
}

function fillTheTable(){
    document.getElementById('taipeiSubmit').contentWindow.fillTable();
}

$("#country").on('change',function(){

	alert(this.options[this.selectedIndex].value);

	$("#information").append(info);


});
