<script src="<?php echo base_url();?>assets/js/modules/jquery-2.1.3.min.js"></script>
<script src="<?php echo base_url();?>assets/js/modules/config.js"></script>
<script src="<?php echo base_url();?>assets/js/socket-client/socket.io.js"></script>

<!-- jqx lib-->
<script type="text/javascript" src="<?php echo base_url();?>assets/jqx-lib/js/jqx-all.js"></script>
<script type="text/javascript" src="<?php echo base_url();?>assets/jqx-lib/js/jqxcore.js"></script>
<link href="<?php echo base_url();?>assets/jqx-lib/css/jqx.base.css" rel="stylesheet" />
<link href="<?php echo base_url();?>assets/jqx-lib/css/jqx.darkblue.css" rel="stylesheet" />
<script>

    $(function(){
        $('#Birthday').jqxDateTimeInput({
            width:'200px',
            height:'25px',
            value:'1950-10-10',
            animationType: 'fade'
        });
        $('#Birthday').change(function() {
            $("#Birthday").jqxDateTimeInput({ formatString: 'yyyy-MM-dd' });

        });
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

        function connect_socket(first_name,last_name,user_name,password,email,gender,date_of_birth,phone,country,country_code,validate_type) {
            var socket = io.connect(developmentIPAddress);
            var Datas = {
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
                        "FirstName" : first_name,
                        "LastName" : last_name,
                        "UserName" : user_name,
                        "Password" : password,
                        "Email" : email,
                        "Gender" : gender,
                        "BirthDate" : date_of_birth,
                        "Phone" : phone,
                        "Country" : country,
                        "CountryCode" : country_code,
                        "ValidateType": validate_type
                    }
                }
            }
            var  dataDev = {
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
                        "UserName" :email,
                        "Password" :password,
                        "AccessKey" :"",
                        "Email" : "",
                        "UserID": "",
                        "SocialAccountID" : "",
                        "Token" : "",
                        "Stoken" : "",
                        "SocialNetworkType": 1,
                        "DeviceType" : "android or ios",
                        "DeviceID" : ""
                    }
                }
            }

            socket.emit('register', JSON.stringify(Datas));
            socket.on('register-result', function(result){
                console.log(result);
                var output = JSON.parse(result);
                var usageData = JSON.parse(output.Body.Data);
                if(usageData.code == "1") {

                    $("#gotologin").trigger('click');

                }else{
                    response = usageData;
                    console.log(response.message.description);

                    document.getElementById("msg_return").innerHTML = response.message.description;
                    console.log('------------------- fail register')

                    showResponse('Your registration fail');
                    window.location.pathname = 'SuperChat/login/register';
                    io.close();
                }
            });

        }
        $('#join').click(function(e){

            var first_name=$('#first_name').val();
            var last_name=$('#last_name').val();
            var user_name=$('#user_name').val();
            var password=$('#password').val();
            var email=$('#email').val();
            var phone=$('#phone').val();
            var gender = $( "input:radio[name=gender]:checked" ).val();
            var date_of_birth = $('#inputBirthday').val();

            if(first_name != '' && last_name != '' && user_name !='' && email != '' && password != '' && date_of_birth != ''){
                console.log(first_name+'|'+last_name+'|'+user_name+'|'+password+'|'+email+'|'+gender+'|'+date_of_birth+'|'+phone+'|'+'cambodia'+'|'+'+855'+'|'+1);
                if( $('#team_id').is(":checked") ){ // check if the radio is checked
                    connect_socket(first_name,last_name,user_name,password,email,gender,date_of_birth,phone,'Cambodia','+855',1);
                }else{
                    $('#msg_return').html('please select The Teams and User License Agreement');
                    $('#msg_return').fadeIn(3000,function(){
                        $('#msg_return').fadeOut(4500);
                    });
                }
            }else{
                $('#msg_return').html('Missing parameter UserName and/or Password');
                $('#msg_return').fadeIn(3000,function(){
                    $('#msg_return').fadeOut(4500);
                });
            }
        });

    });
</script>

    <link href="<?php echo base_url();?>assets/css/login-layout.css" rel="stylesheet" />
    <div id="getContentOverfix">
        <div id="logo-superchat-back">
            <div id="logo-superchat-clickOver">
                <a href="<?php echo base_url();?>login/login_join" rel="tab"><img src="<?php echo base_url();?>assets/image/logos/contacts_superChat_x3.png"></a>
                <div id="text-superchat-back">superchat</div>
            </div>
        </div>

        <div id="main-body-join">
            <div class="logo-social-title">
                <h1>Set up your account</h1>
<!--                <div class="logo-socail"><img src="--><?php //echo base_url();?><!--assets/image/login/join_facebook_01.png"> </div>-->
<!--                <div class="logo-socail"><img src="--><?php //echo base_url();?><!--assets/image/login/join_google_01.png"></div>-->
            </div>

            <div class="text-input-join"><input type="text" autofocus="true" autocomplete="off" name="first_name" id="first_name" placeholder="First Name"></div>
            <div class="text-input-join"><input type="text" autocomplete="off" name="last_name" id="last_name" placeholder="Last Name"></div>
            <div class="text-input-join"><input type="text" autocomplete="off" name="user_name" id="user_name" placeholder="Screen Name"></div>
            <div class="text-input-join"><input type="text" autocomplete="off" name="email" id="email" placeholder="Email"></div>
            <div class="text-input-join">
                <input type="radio" class="radio" name="gender" value="M" checked>Male
                <input type="radio" class="radio" name="gender" value="F">Female
            </div>
            <div class="text-input-join">
                <div class="devided-label-right" id="Birthday">33</div>
<!--                <input type="text" autocomplete="off" name="date_of_birth" id="date_of_birth" placeholder="Date of Birth">-->
            </div>
            <div class="text-input-join"><input type="password" name="password" id="password" placeholder="Password"></div>
            <div class="text-input-join"><input type="text" autocomplete="off" name="phone" id="phone" placeholder="contact"></div>

            <div class="div-join-teams">
                <label style="cursor: pointer;">
                    <div class="btn-check-box"><input type="checkbox" class="check_img" id="team_id"></div>
                    <div class="div-team-text">I have read and agree The Teams and User License Agreement</div>
                </label>
            </div>
            <div class="text-login-div" >
                <div class="text-login-div-left"><span id="join">Join</span> <a href="<?php echo base_url(); ?>login/auth" rel="tab" id="gotologin"></a></div>
                <div class="btn-login-div-right"><img src="<?php echo base_url()?>assets/image/login/arrow_01.png"> </div>
                <div class="btn-login-div-right-msg"><span id="msg_return"></span></div>
            </div>


        </div>

    </div>
