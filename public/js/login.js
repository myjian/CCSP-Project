if(!localStorage.nowaddr)
{
  localStorage.nowaddr = "http://baddriver.herokuapp.com/";
};

if(!localStorage.change)
{
  localStorage.change = 0;
}

function rearrangeuser(){

    $(".logininfo").remove();
    $("#loginbutton").append('<a href="/auth/facebook"><button  id = "fblogin" class="btn btn-primary">FB<br>登入</button></a>');
    $("#fblogin").on('click', function(){
      localStorage.nowaddr = location.href;
      localStorage.change = 1;   
    });

}
function arrangeuser(){
    $("#fblogin").remove();
    $("#loginbutton").append();
    $("#loginbutton").append('<div style=";" class ="logininfo"><img class="logininfo" src="http://graph.facebook.com/'+ user.id +'/picture"><div style="display:block;"><a class="logininfo"  href ="'+user.link+'">'+user.name+'</a><a href = "/logout"><button class="logininfo" style="background-color: #5b74a8; color: #FFFFFF; margin-left:3px; " id="logout">登出</button></a></div></div>');

    $("#logout").on('click', function(){
      localStorage.nowaddr = location.href;
      localStorage.change = 1;
      rearrangeuser();
    });


  }
function getfblogininfo()
{ 
  if(localStorage.nowaddr != location.href && localStorage.change == 1)
  {
    document.location.href=localStorage.nowaddr;
    localStorage.change = 0;
  }


  $.ajax({
        type: 'GET',
        url: "/getfbinfo",
        dataType: 'text',
        success: function(response) {
          if(response != "123")
          {
            data = JSON.parse(response);
            console.log(data);
            user = data;
            arrangeuser();
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
        },
      });
} 

$("#fblogin").on('click', function(){
  localStorage.nowaddr = location.href;
  localStorage.change = 1;
});

getfblogininfo();
