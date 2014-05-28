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
    if (!isValid("country")) return false;
    if (!isValid("location")) return false;
    if (!isValid('carNum')) return false;
    if (!isValid("condition")) return false;
    if (!isValid("year")) return false;
    if (!isValid("month")) return false;
    if (!isValid("day")) return false;
    if (!isValid("hour")) return false;
    if (!isValid("minute")) return false;
    if (!isValid("url")) return false;
    return true;
}

$("#emailGen").on('click', function(event){
    if (!validateForm()) return;
    /*
    var mailLink = $('<a class="btn">寄出信件</a>').attr('href', 'mailto:b99902067@ntu.edu.tw?subject=' + encodeURIComponent('交通違規檢舉')+ '&body=' + encodeURIComponent(mailBody));
    // + '&body=' + encodeURIComponent(mailBody)
    // + '&attachment=' + '/reportBadDriver.html'
    $("#mail").html(mailLink).append(mailBody);
    */
});
