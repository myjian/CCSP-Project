var fbLogin = '<a id="fblogin" class="btn btn-primary" href="/auth/facebook?redirectPath=' + encodeURIComponent(getPath()) + '">FB<br>登入</a>';
var fbLogout = '<a href="/logout" style="margin-left: 3px"><button style="background-color: #5b74a8; color: #FFFFFF">登出</button></a>';

function getPath(){
    var l = document.createElement("a");
    l.href = document.location;
    return l.pathname;
}

function displayFB(user){
    var fbArea = $("#fbArea");
    if (user){
        fbArea.append('<img src="http://graph.facebook.com/'+ user.id +'/picture"><br>',
                '<a href="' + user.link + '">' + user.name + '</a>', fbLogout);
    }
    else {
        fbArea.append(fbLogin);
    }
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
