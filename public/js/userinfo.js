function isValid(id){
    var item = document.getElementById(id);
    if (item.value === ''){
        alert(item.placeholder + '不可空白');
        item.focus();
        return false;
    }
    return true;
}

function validateForm(){
    if (!isValid('name')) return false;
    if (!isValid('phone')) return false;
    if (!isValid('address')) return false;
    if (!isValid('email')) return false;
    return true;
}

$('#now').on('click', function(event){
    var d = new Date();
    $('input[name="date"]').attr('value', d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate());
    $('input[name="time"]').attr('value', d.getHours() + ':' + d.getMinutes());
    /*
    var mailLink = $('<a class="btn">寄出信件</a>').attr('href', 'mailto:b99902067@ntu.edu.tw?subject=' + encodeURIComponent('交通違規檢舉')+ '&body=' + encodeURIComponent(mailBody));
    // + '&body=' + encodeURIComponent(mailBody)
    // + '&attachment=' + '/reportBadDriver.html'
    $('#mail').html(mailLink).append(mailBody);
    */
    return false;
});


$(document).ready(function() {
    $('#tryitForm').bootstrapValidator({
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: '姓名不可為空白'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: '電話不可為空白'
                    }
                }
            },
            address: {
                validators: {
                    notEmpty: {
                        message: '地址不可為空白'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: '電子郵件信箱不可為空白'
                    },
                    emailAddress: {
                        message: '非正確電子郵件信箱格式'
                    }
                }
            }
        }
    });
});
