
function rearrangeuser(){

    $(".logininfo").remove();
    $("#loginbutton").append('<a href="/auth/facebook"><button  id = "fblogin" class="btn btn-primary">FB<br>登入</button></a>');
    $("#fblogin").on('click', function(){
      $.ajax({
        type: 'GET',
        url: "/return",
        data: location.href(),
        dataType: 'text',
        success: function(response) {

        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert("error");
        },
      });

      getfblogininfo();



    });

}
function arrangeuser(){
    $("#fblogin").remove();
    $("#loginbutton").append();
    $("#loginbutton").append('<div style=";" class ="logininfo"><img class="logininfo" src="http://graph.facebook.com/'+ user.id +'/picture"><div style="display:block;"><a class="logininfo"  href ="'+user.link+'">'+user.name+'</a><a href = "/logout"><button class="logininfo" style="background-color: #5b74a8; color: #FFFFFF; margin-left:3px; " id="logout">登出</button></a></div></div>');

    $("#logout").on('click', function(){

      $.ajax({
        type: 'GET',
        url: "/return",
        data: location.href(),
        dataType: 'text',
        success: function(response) {

        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert("error");
        },
      });



      rearrangeuser();
    });


  }
function getfblogininfo()
{
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
          alert("error");
        },
      });
} 

$("#fblogin").on('click', function(){

  $.ajax({
        type: 'GET',
        url: "/return",
        data: location.href(),
        dataType: 'text',
        success: function(response) {

        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert("error");
        },
      });

  getfblogininfo();

});

getfblogininfo();
