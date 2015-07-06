<script src="<?php echo base_url();?>assets/js/modules/jquery-2.1.3.min.js"></script>
<script src="<?php echo base_url();?>assets/js/modules/config.js"></script>
<script src="<?php echo base_url();?>assets/js/socket-client/socket.io.js"></script>
<script src="https://apis.google.com/js/api:client.js"></script>
<script>
    $(document).keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            $("#login").trigger('click');
        }
    });

    var loginTwitter = function(Token,Stoken){
        var socketIoCon = io.connect(developmentIPAddress);
        var dataInput = {
            "Header": {
                "From": "",
                "To": "",
                "DateTime": "",
                "PartnerID": "",
                "HubID": "",
                "Type": "",
                "DeviceType": "",
                "DeviceOS": "",
                "FromIP": "",
                "Region": "enUS"
            },
            "Body": {
                "ID": "",
                "ObjectType": "1000",
                "Action": "100",
                "Data": {
                    "AccessKey" : "",
                    "Token" : Token,
                    "Stoken" : Stoken
                }
            }
        }

        socketIoCon.emit('login', JSON.stringify(dataInput));
        socketIoCon.removeAllListeners('login-result');
        socketIoCon.on('login-result', function(datas){
            var object = JSON.parse(datas);
            var ob = JSON.parse(object.Body.Data);
            var acc_id = ob.data.AccessKey;
            var user_id = ob.data.UserID;
            var user_name = ob.data.DisplayName;
            if(ob.code == '1'){
                localStorage.setItem("user_id",user_id);
                localStorage.setItem("access_key",acc_id);
                $.ajax({
                    url: 'login/AuthSession',
                    type: 'POST',
                    data:{access_key:acc_id,user_id:user_id,email:username,user_name:user_name,user_action:'login'},
                    success: function(result){
                        location.href='<?php echo base_url();?>applications';
                    }
                });
                $('#msg_return').html('');
            } else {
                console.log(ob);
                $('#msg_return').html('Incorrect username or password');

            }

        });

    }

    $(function() {

        function superchatLogin(socialNetworkType,username,password,socialAccountID,email,token,Stoken) {
            var socketIoCon = io.connect(developmentIPAddress);
            localStorage.clear();
            if(!Stoken){
                Stoken = '';
            }
            var dataLogin = {
                "Header": {
                    "From": "",
                    "To": "",
                    "DateTime": "",
                    "PartnerID": "",
                    "HubID": "",
                    "Type": "",
                    "DeviceType": "",
                    "DeviceOS": "",
                    "FromIP": "",
                    "Region": "enUS"
                },
                "Body": {
                    "ID": "",
                    "ObjectType": "1000",
                    "Action": "100",
                    "Data": {
                        "UserName" :username,
                        "Password" :password,
                        "AccessKey" : "",
                        "Email" :email,
                        "UserID": "",
                        "SocialAccountID" :socialAccountID,
                        "Token" : token,
                        "Stoken" : Stoken,
                        "SocialNetworkType":socialNetworkType,
                        "DeviceType" : "",
                        "DeviceID" : ""
                    }
                }
            }
            socketIoCon.emit('login', JSON.stringify(dataLogin));
            socketIoCon.removeAllListeners('login-result');
            socketIoCon.on('login-result', function(datas){
                var object = JSON.parse(datas);
                var ob = JSON.parse(object.Body.Data);
                var acc_id = ob.data.AccessKey;
                var user_id = ob.data.UserID;
                var user_name = ob.data.DisplayName;
                if(ob.code == '1'){
                    localStorage.setItem("user_id",user_id);
                    localStorage.setItem("access_key",acc_id);
                    $.ajax({
                        url: 'login/AuthSession',
                        type: 'POST',
                        data:{access_key:acc_id,user_id:user_id,email:username,user_name:user_name,user_action:'login'},
                        success: function(result){
                            location.href='<?php echo base_url();?>applications';
                        }
                    });
                    $('#msg_return').html('');
                } else {
                    console.log(ob);
                    $('#msg_return').html('Incorrect username or password');

                }

            });

        }
//------------------------end superchatLogin----------------------------
        $("a[rel='tab']").click(function (e) {
            e.preventDefault();
            //get the link location that was clicked
            var pageurl = $(this).attr('href');
            //to get the ajax content and display in div with id 'getContent'
            $.ajax({
                url: pageurl + '?rel=tab',
                success: function (data) {
                    $('#getContentOverfix').html(data);
                }
            });
            if (pageurl != window.location) {
                window.history.pushState({path: pageurl}, '', pageurl);
            }
            return false;
        });
        $('#login').click(function (e) {
            var username = $('#username').val();
            var password = $('#password').val();
            if (username != '' || password != '') {
                superchatLogin(1, username, password, '', '', '');
            } else {
                $('#msg_return').html('Missing parameter user name or password!');
                $('#msg_return').fadeIn(2000, function () {
                    $('#msg_return').fadeOut(6000);
                });
            }
        });

        $('#facebook-btn').click(function(){
            facebookSignin();
        });
        $('#twitter-btn').click(function(){
            var myWindow = window.open("/login/Twitter", "", "width=900, height=730");
//            ../libraries/EpiTwitter/TwitterLogin.php
        });
        //-------------------------Library for include facebook api---------------------------------------------
        window.fbAsyncInit = function () {
            FB.init({
                appId: faceBookAppID,
                xfbml: true,
                version: 'v1.0'
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        //----------------------------Function for Facebook apply here -------------------------------------------
        function facebookSignin() {
            FB.login(function(response) {
                if (response.authResponse) {
                    FB.api('/me', function(response) {
                        var facebook_email_session = response.email;
                        localStorage.setItem("facebook_email_session",facebook_email_session);
                        FB.getLoginStatus(function(response1) {
                            if (response1.status === 'connected') {

                                var socialAccountID = response1.authResponse.userID;
                                var token = response1.authResponse.accessToken;
                                var socialNetworkType = 2;
                                var username = '';
                                var password = '';
                                var email = facebook_email_session;
                                superchatLogin(socialNetworkType,username,password,socialAccountID,email,token);
                            } else if (response.status === 'not_authorized') {
                                // the user is logged in to Facebook,
                                // but has not authenticated your app
                            } else {
                                // the user isn't logged in to Facebook.
                            }
                        });
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, {scope: 'publish_actions'});
        }

        // ------------ login with google --------------
        loginGoogle(function(objUser){
            var accessToken = objUser.B.access_token;
            var userID = objUser.getId();
            var userEmail = objUser.getBasicProfile().getEmail();
            superchatLogin(4,'','',userID,userEmail,accessToken);
        });
    });

    var googleUser = {};
    var loginGoogle = function(callback) {
        gapi.load('auth2', function(){
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            auth2 = gapi.auth2.init({
                client_id: googlePlusClientId,
                cookiepolicy: 'single_host_origin'
                // Request scopes in addition to 'profile' and 'email'
                //scope: 'additional_scope'
            });
            attachSignin(document.getElementById('google-btn-login'),function(data){
                callback(data);
            });
        });
    }
    function attachSignin(googleButton,callback) {
        auth2.attachClickHandler(googleButton, {},
            function(googleUser) {
                callback(googleUser);
            },
            function(error) {
                console.log(JSON.stringify(error, undefined, 2));
            }
        );
    }


</script>

<link href="<?php echo base_url();?>assets/css/login-layout.css" rel="stylesheet" />
<div id="getContentOverfix">
    <div id="logo-superchat-back">
        <div id="logo-superchat-clickOver">
            <a href="<?php echo base_url();?>login/login_join" rel="tab"><img src="<?php echo base_url();?>assets/image/logos/contacts_superChat_x3.png"></a>
            <div id="text-superchat-back">superchat</div>
        </div>
    </div>

    <div id="main-body-login">
        <div class="text-input-login"><input type="text" autofocus="true" autocomplete="off" name="username" id="username" placeholder="Username"></div>
        <div class="text-input-login"><input type="password" name="password" id="password" placeholder="Password"></div>
        <div class="forgot-password"><a href="<?php echo base_url();?>login/forgetpass" rel="tab">forgot password?</a></div>
        <div class="logo-social-clearfix">
            <div class="logo-socail" id="twitter-btn"><img src="<?php echo base_url();?>assets/image/login/join_twitter_01.png"> </div>
            <div class="logo-socail" id="facebook-btn"><img src="<?php echo base_url();?>assets/image/login/join_facebook_01.png"> </div>
            <div class="logo-socail">
                <div id="gSignInWrapper">
                    <div id="google-btn-login" class="customGPlusSignIn">
                        <span class="icon"></span>
                    </div>
                </div>
            </div>

        </div>
        <div class="text-login-div">
            <div class="text-login-div-left">Login</div>
            <div class="btn-login-div-right" id="login"><img src="<?php echo base_url()?>assets/image/login/arrow_01.png"> </div>
            <div class="btn-login-div-right-msg"><span id="msg_return"></span></div>
        </div>
        <div class="remember-username">
            <label style="cursor: pointer;">
                <div class="btn-check-box"><input type="checkbox"></div>
                <div class="text-check-box">Remember my username and password</div>
            </label>
        </div>

    </div>
    <div style="clear: both;"></div>
    <div id="singup-block">
        <div class="singup-text">No account yet? <a href="<?php echo base_url()?>">Sign up</a> </div>
    </div>
</div>