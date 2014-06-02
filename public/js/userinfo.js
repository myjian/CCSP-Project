function isValid(id){
    var item = document.getElementById(id);
    if (item.value === ''){
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
