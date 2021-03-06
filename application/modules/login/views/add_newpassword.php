<script src="<?php echo base_url();?>assets/js/modules/jquery-2.1.3.min.js"></script>
<script src="<?php echo base_url();?>assets/js/socket-client/socket.io.js"></script>

<script>

    $(function(){
        var socketIoCon = io.connect('http://54.172.34.141:2000');
        $("a[rel='tab']").click(function(e){
            e.preventDefault();//prevent default action
            //get the link location that was clicked
            var pageurl = $(this).attr('href');
            //to get the ajax content and display in div with id 'getContent'
            $.ajax({
                url:pageurl+'?rel=tab',
                success: function(data){
                    $('#getContentOverfix').html(data);
                    $('#logo-superchat-overfix').fadeIn(2000);
                }

            });
            //to change the browser URL to 'pageurl'
            //Ex: http://superchatweb.com/my_profile/chat
            if(pageurl!=window.location){
                window.history.pushState({path:pageurl},'',pageurl);
            }
            return false;
        });

        $('#reset_pass').on('click',function(e){
            var UserID = $('#UserID').val();
            var VerifyCode = $('#VerifyCode').val();
            var confirmCode = #('#confirmCode').val();

            resetPassword(UserID,VerifyCode);
        });

    });

    var resetPassword = function(UserID,VerifyCode){

        if(UserID && UserID != ''){

            func_addNewPassword(ValidateType,byEmail,conCode,byPhone,function(result){
                var obj = JSON.parse(result);
                var usageData = obj;
                console.log(obj);
                if(obj.code ==1){
//                    $('#msg_return').html('Missing parameter user name or password!');
//                    $('#msg_return').fadeIn(2000, function () {
//                        $('#msg_return').fadeOut(6000);
//                    });
                    var user_id = obj.data.UserID;
                    $.ajax({
                        url: 'login/AuthSession',
                        type: 'POST',
                        data:{user_id:user_id,user_action:'resetPassword'},
                        success: function(result){
                            $("#login").trigger('click');
//                            location.href='<?php //echo base_url();?>//login/auth';
                        }
                    });
                    console.log('success');
                }else{
                    console.log(obj);
                }
            });
        }else{

        }
    };
    var func_addNewPassword = function(UserID,VerifyCode,callback){
        var input= {
            "Header": {
                "From": "",
                "To": "",
                "DateTime": "",
                "PartnerID": "",
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
                    "UserID" : UserID,
                    "VerifyCode" : VerifyCode
                }
            }
        };

        socketIoCon.emit('func_addNewPassword',JSON.stringify(input));
        socketIoCon.removeAllListeners('func_addNewPassword-result');
        socketIoCon.on('func_addNewPassword-result',function(result){
            var obj = JSON.parse(result);
            var usageData = obj.Body.Data;
            callback(usageData);
        });

    };

</script>

<link href="<?php echo base_url();?>assets/css/login-layout.css" rel="stylesheet" />
<style>
    .logo-social-title{
        padding-bottom: 50px;
    }
    .text-login-div-left.forget,.btn-login-div-right.forget,.btn-login-div-right-msg{
        padding-top: 50px;
    }
</style>
<div id="getContentOverfix">
    <div id="logo-superchat-back">
        <div id="logo-superchat-clickOver">
            <a href="<?php echo base_url();?>login/login_join" rel="tab"><img src="<?php echo base_url();?>assets/image/logos/contacts_superChat_x3.png"></a>
            <div id="text-superchat-back">superchat</div>
            <?php
            $userid = $this->session->userdata('userID');
            echo '<input type="hidden" name="user_id" id="user_id" value="'.$userid.'">';

            ?>

        </div>
    </div>

    <div id="main-body-join">
        <div class="logo-social-title">
            <h1>Verify your Password</h1>
            <p>please enter your code to verify</p>
        </div>
        <div class="logo-social-title">
            <div class="text-input-join"><input type="text" autofocus="true" autocomplete="off" name="verify_code" id="verify_code" placeholder="Enter your Code"></div>
            <div class="text-input-join"><input type="text" autofocus="true" autocomplete="off" name="verify_code" id="verify_code" placeholder="Enter your Code"></div>
        </div>


        <div class="text-login-div" >
            <label style="cursor: pointer" id="reset_pass">
                <div class="text-login-div-left forget"><span id="join">Reset</span> <a href="<?php echo base_url(); ?>login/auth" rel="tab" id="login"></a></div>
                <div class="btn-login-div-right forget"><img src="<?php echo base_url()?>assets/image/login/arrow_01.png"> </div>
            </label>
            <div class="btn-login-div-right-msg"><span id="msg_return"></span></div>
        </div>


    </div>

</div>
