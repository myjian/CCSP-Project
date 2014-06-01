var fbLogin = '<a id="fblogin" class="btn btn-primary" href="/auth/facebook?redirectPath=' + encodeURIComponent(getPath()) + '">FB<br>登入</a>';
var fbLogout = '<a href="/userinfo"><button style="background-color: #5b74a8; color: #FFFFFF">更改資料</button></a><a href="/logout?redirectPath=' + encodeURIComponent(getPath()) + '"><button style="background-color: #5b74a8; color: #FFFFFF">登出</button></a>';

function getPath(){
    var l = document.createElement("a");
    l.href = document.location;
    return l.pathname;
}

function displayFB(user){
    var fbArea = $("#fbArea");
    fbArea.hide();
    if (user){
        fbArea.append('<p style="margin-bottom: 5px"><img class="img-thumbnail" src="http://graph.facebook.com/'+ user.id +'/picture" alt="' + user.name + '"></p>', fbLogout);
    }
    else {
        fbArea.append(fbLogin);
    }
    fbArea.fadeIn();
}

function getfblogininfo(){
    $.get('/getfbinfo', {},
        function(data, textStatus, jqXHR){
            console.log(data);
            if (data.login === true){
                displayFB(data.user);
            }
            else {
                displayFB(null);
            }
        },
        'json'
    );
}

getfblogininfo();
