FB.init({
  appId: '273057782873545',
  status: true,
  cookie: true,
  xfbml: true,
  oauth: true,
  channelURL: '//101.13.147.172/channel.html' //
  
          });

$("#fblogin").on('click', function(){


        
        // 
        FB.getLoginStatus(function (response) {
          alert("getLoginStatus");
          if (response.authResponse) {
            FB.api('/me', function (response) {
              LoginSuccess(response);
            });
          } else {
            FB.login(function (response) {
              if (response.authResponse) {
                FB.api('/me', function (response) {
                  LoginSuccess(response);
                });
              } else {
                alert('!authResponse');
              }
            }, {
              scope: 'email'
            });
          }
        })

        alert("ya");

      });




