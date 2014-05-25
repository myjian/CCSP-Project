FB.init({
  appId: 273057782873545,
  status: true,
  cookie: true,
  xfbml: true,
  oauth: true,
  channelURL: '//dl.dropboxusercontent.com/u/31505706/channel.html' //
  
});
var user = {};
function rearrangeuser(){

    $(".logininfo").remove();
    $("#loginbutton").append('<button  id = "fblogin" class="btn btn-primary">FB<br>登入</button>');
    $("#fblogin").on('click', function(){



      FB.login(function (response) {
        if (response.authResponse) {
          FB.api('/me', function (response) {
            console.log(response);
            user.name = response.name;
            user.link = response.link;
            user.id = response.id; 
            arrangeuser();                                   
          });
        } 
        else {
               getfblogininfo(); //alert('!authResponse');
             }    //alert("ya");


      });

    });

}
function arrangeuser(){
    $("#fblogin").remove();
    $("#loginbutton").append();
    $("#loginbutton").append('<div style=";" class ="logininfo"><img class="logininfo" src="http://graph.facebook.com/'+ user.id +'/picture"><div style="display:block;"><a class="logininfo"  href ="'+user.link+'">'+user.name+'</a><button class="logininfo" style="background-color: #5b74a8; color: #FFFFFF; margin-left:3px; " id="logout">登出</button></div></div>');

    $("#logout").on('click', function(){

      rearrangeuser();
      FB.logout(function(response) {
        console.log(response);
      });

    });


  }
function getfblogininfo()
{

  FB.getLoginStatus(function (response) {
    //console.log(response);

    if(response.status === "connected")
    {
      FB.api('/me', function (response) {
        console.log(response);
        user.name = response.name;
        user.link = response.link;
        user.id = response.id;

        arrangeuser();              
      });    
    }

  });

}


$("#fblogin").on('click', function(){



  FB.login(function (response) {
    //console.log(response);
    if (response.authResponse) {
      FB.api('/me', function (response) {
        console.log(response);
        user.name = response.name;
        user.link = response.link;
        user.id = response.id;
        arrangeuser();                                   
      });
    } 
    else {

      getfblogininfo();
                //alert('!authResponse');
      }



        //alert("ya");


      });
});

  

getfblogininfo();