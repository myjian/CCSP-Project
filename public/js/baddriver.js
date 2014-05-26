function isValid(id){
    var item = document.getElementById(id);
    if (item.value === ""){
        alert(item.placeholder + "不可空白");
        item.focus();
        return false;
    }
    return true;
}

function validateForm(){
    if (!isValid('plate')) return false;
    if (!isValid("country")) return false;
    if (!isValid("road")) return false;
    if (!isValid("condition")) return false;
    if (!isValid("url")) return false;
    return true;
}

function fillTable(){
    var iframe = $('<iframe id="dataframe" name="dataframe" src="//www.tcpd.gov.tw/tcpd/cht/index.php?act=traffic&amp;code=add" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="1100" scrolling="auto"></iframe>');
    $("#frame").append(iframe);
}
