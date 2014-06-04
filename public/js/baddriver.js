function isValid(id){
    var item = document.getElementById(id);
    if (item.value === ''){
        item.focus();
        return false;
    }
    return true;
}

function validateForm(){

    if (!isValid('country')) return false;
    if (!isValid('location')) return false;
    if (!isValid('carNum')) return false;
    if (!isValid('description')) return false;
    if (!isValid('date')) return false;
    if (!isValid('time')) return false;
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
            country: {
                validators: {
                    notEmpty: {
                        message: '請選擇縣市'
                    }
                }
            },
            location: {
                validators: {
                    notEmpty: {
                        message: '請填入詳細地點'
                    }
                }
            },
            carNum: {
                validators: {
                    notEmpty: {
                        message: '請填入違規車牌'
                    }
                }
            },
            date: {
                validators: {
                    notEmpty: {
                        message: '請選擇日期'
                    }
                }
            },
            time: {
                validators: {
                    notEmpty: {
                        message: '請輸入時間'
                    }
                }
            },
            description: {
                validators: {
                    notEmpty: {
                        message: '請簡述案發時情況'
                    }
                }
            }
        }
    });
});

