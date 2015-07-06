<script src="<?php echo base_url();?>assets/js/modules/jquery-2.1.3.min.js"></script>
<script src="<?php echo base_url();?>assets/js/socket-client/socket.io.js"></script>

<link href="<?php echo base_url();?>assets/jqx-lib/css/jqx.base.css" rel="stylesheet" />
<link href="<?php echo base_url();?>assets/jqx-lib/css/jqx.darkblue.css" rel="stylesheet" />
<!-- jqx lib-->
<script type="text/javascript" src="<?php echo base_url();?>assets/jqx-lib/js/jqx-all.js"></script>
<script type="text/javascript" src="<?php echo base_url();?>assets/jqx-lib/js/jqxcore.js"></script>

<script>

    $(function(){

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
            var email = $('#reset_by_email').val();
            var conCode = $('#reset_by_phoneCode').val();
            var phone = $('#reset_by_phone').val();
            resetPassword(email,phone,conCode);
        });

    });

    var resetPassword = function(byEmail,byPhone,conCode){
        var ValidateType= 2;

//        console.log(byEmail+'-'+byPhone+ '-' + conCode);
        if(byEmail && byEmail != ''){
            ValidateType =1;
            func_reset(ValidateType,byEmail,conCode,byPhone,function(result){
               var obj = JSON.parse(result);
                var usageData = obj;
//                console.log(obj);
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

                            $("#verify_pass").trigger('click');
//                            location.href='<?php //echo base_url();?>//login/Verify_Password';
                        }
                    });
                    console.log('success');
                }else{
                    console.log(obj);
                }
            });
        }else if(byEmail =='' && byPhone =='' && conCode ==''){
            $('#msg_return').html('Missing parameter Email or Phone!');
                    $('#msg_return').fadeIn(2000, function () {
                        $('#msg_return').fadeOut(6000);
                    });
        }else{
            func_reset(ValidateType,byEmail,conCode,byPhone,function(result){
                var obj = JSON.parse(result);
                var usageData = obj;
//                console.log(obj);
                if(obj.code ==1){

                    var user_id = obj.data.UserID;
                    $.ajax({
                        url: 'login/AuthSession',
                        type: 'POST',
                        data:{user_id:user_id,user_action:'resetPassword'},
                        success: function(result){
                            $("#verify_pass").trigger('click');
                        }
                    });
                    console.log('success');
                }else{
                    console.log('fail');
                }
            });
        }
    };
    var func_reset = function(ValidateType,email,conCode,phone,callback){
        var socketIoCon = io.connect('http://54.172.34.141:2000');
        var input= {
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
                    "ValidateType" : ValidateType,
                    "Email" : email,
                    "PhoneNumber":phone,
                    "CountryCode":conCode
                }
            }
        };

        socketIoCon.emit('forgetPassword',JSON.stringify(input));
        socketIoCon.removeAllListeners('forgetPassword-result');
        socketIoCon.on('forgetPassword-result',function(result){
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
            $ses = $this->session->userdata('access_key');
            echo $ses;
            ?>
        </div>
    </div>

    <div id="main-body-join">
        <div class="logo-social-title">
            <h1>Reset New Password</h1>
            <p>please enter your email or phone to reset your password</p>
        </div>
        <div class="logo-social-title">
            <div class="text-input-join"><input type="text" autofocus="true" autocomplete="off" name="reset_by_email" id="reset_by_email" placeholder="Enter your Email"></div>
        </div>
        <div class="text-input-join"><input type="text"  autocomplete="off" name="reset_by_phone" id="reset_by_phoneCode" placeholder="Country Code +855"></div>
        <div class="text-input-join"><input type="text"  autocomplete="off" name="reset_by_phone" id="reset_by_phone" placeholder="Enter your  Phone"></div>

        <div class="text-login-div" >
            <label style="cursor: pointer" id="reset_pass">
                <div class="text-login-div-left forget"><span id="join">Reset</span> <a href="<?php echo base_url(); ?>login/Verify_Password" rel="tab" id="verify_pass"></a></div>
                <div class="btn-login-div-right forget"><img src="<?php echo base_url()?>assets/image/login/arrow_01.png"> </div>
            </label>
            <div class="btn-login-div-right-msg"><span id="msg_return"></span></div>
        </div>


    </div>

</div>
