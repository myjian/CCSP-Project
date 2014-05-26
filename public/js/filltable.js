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
