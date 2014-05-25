

$("#datatable").submit(function(e){

	console.log(e);
	
	$("#frame").append('<frameset><iframe src="//www.tcpd.gov.tw/tcpd/cht/index.php?act=traffic&amp;code=add" title="違規檢舉專區" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="1100" scrolling="auto" name = "dataframe" id = "dataframe"></iframe></frameset>');
	fillthetable();
	
	console.log("123");
});	

function fillthetable(){

	$("input[name='email']").attr("value", "123");
	$("input[name='email']" ,parent.frames["dataframe"].document).attr("value", "123");
	console.log("456");

}