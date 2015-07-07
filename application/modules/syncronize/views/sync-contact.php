<div id="fb-root"></div>
<div class="div-sync-box-center" style="background: #ffffff">
    <div id="div-sync-social">
        <div class="header-title">Networks to Syncronize</div>
        <div class="synce-td-body" id="facebook">
            <div class="btn-net-check" id="check-fb"><img id="facebook-check" src="<?php echo base_url();?>assets/image/Sync/check_01.png"></div>
            <div class="synce-social-name">Facebook</div>
            <div class="synce-arrow-right"><img src="<?php echo base_url();?>assets/image/Sync/chevron_01.png"></div>
        </div>
        <div class="border-thin"></div>
        <div class="synce-td-body" id="skype">
            <div class="btn-net-check" id="check-skype"><img id="facebook-check" src="<?php echo base_url();?>assets/image/Sync/check_01.png"></div>
            <div class="synce-social-name">Skype</div>
            <div class="synce-arrow-right"><img src="<?php echo base_url();?>assets/image/Sync/chevron_01.png"></div>
        </div>
        <div class="border-thin"></div>
        <div class="synce-td-body" id="g-plus">
            <div class="btn-net-check" id="check-gtalk"><img src="<?php echo base_url();?>assets/image/Sync/check_01.png"></div>
            <div class="synce-social-name">Google+</div>
            <div class="synce-arrow-right"><img src="<?php echo base_url();?>assets/image/Sync/chevron_01.png"></div>
        </div>
        <div class="border-thin"></div>
        <div class="synce-td-body" id="twitter">
            <div class="btn-net-check" id="check-twitter"><img id="facebook-check" src="<?php echo base_url();?>assets/image/Sync/check_01.png"></div>
            <div class="synce-social-name">Twitter</div>
            <div class="synce-arrow-right"><img src="<?php echo base_url();?>assets/image/Sync/chevron_01.png"></div>
        </div>
        <div class="border-thin"></div>
        <div class="synce-td-body" id="viber">
            <div class="btn-net-check" id="check-viber"><img id="facebook-check" src="<?php echo base_url();?>assets/image/Sync/check_01.png"></div>
            <div class="synce-social-name">Viber</div>
            <div class="synce-arrow-right"><img src="<?php echo base_url();?>assets/image/Sync/chevron_01.png"></div>
        </div>
        <div class="border-thin"></div>
        <div class="synce-td-body" id="yahoo">
            <div class="btn-net-check" id="check-ym"><img src="<?php echo base_url();?>assets/image/Sync/check_01.png"></div>
            <div class="synce-social-name">Yahoo!Messanger</div>
            <div class="synce-arrow-right"><img src="<?php echo base_url();?>assets/image/Sync/chevron_01.png"></div>
        </div>
        <div class="border-thin"></div>
        <div class="synce-td-body" id="linkedIn">
            <div class="btn-net-check" id="check-linkedIn"><img id="facebook-check" src="<?php echo base_url();?>assets/image/Sync/check_01.png"></div>
            <div class="synce-social-name">Linkedin</div>
            <div class="synce-arrow-right"><img src="<?php echo base_url();?>assets/image/Sync/chevron_01.png"></div>
        </div>
        <div class="border-thin"></div>
        <div class="synce-td-body" id="wechat">
            <div class="btn-net-check" id="check-wechat"><img id="facebook-check" src="<?php echo base_url();?>assets/image/Sync/check_01.png"></div>
            <div class="synce-social-name">Wechat</div>
            <div class="synce-arrow-right"><img src="<?php echo base_url();?>assets/image/Sync/chevron_01.png"></div>
        </div>
        <div class="border-thin"></div>
        <div class="synce-td-body" id="line">
            <div class="btn-net-check" id="check-line"><img id="facebook-check" src="<?php echo base_url();?>assets/image/Sync/check_01.png"></div>
            <div class="synce-social-name">Line</div>
            <div class="synce-arrow-right"><img src="<?php echo base_url();?>assets/image/Sync/chevron_01.png"></div>
        </div>
        <div class="border-thin"></div>
        <div class="synce-td-body" id="aim">
            <div class="btn-net-check" id="check-aim"><img src="<?php echo base_url();?>assets/image/Sync/check_01.png"></div>
            <div class="synce-social-name">AIM</div>
            <div class="synce-arrow-right"><img src="<?php echo base_url();?>assets/image/Sync/chevron_01.png"></div>
        </div>
        <div class="border-thin"></div>
        <div class="synce-td-body" id="icq">
            <div class="btn-net-check" id="check-icq"><img src="<?php echo base_url();?>assets/image/Sync/check_01.png"></div>
            <div class="synce-social-name">ICQ</div>
            <div class="synce-arrow-right"><img src="<?php echo base_url();?>assets/image/Sync/chevron_01.png"></div>
        </div>
    </div>
</div>
<div class="div-sync-box-right">
    <div class="header-title" id="header-title"></div>
    <div id="results-div"></div>
</div>
<script src="<?php echo base_url();?>assets/js/modules/linkedin.js"></script>
<!--<script src="--><?php //echo base_url();?><!--assets/js/modules/global-sync.js"></script>-->
<script src="<?php echo base_url();?>assets/js/modules/facebook.js"></script>
<script src="<?php echo base_url();?>assets/js/modules/g-plus.js"></script>
<script>
    $(function(){
        checkGoogleSession(function(result){
            console.log(result);
            if(result.code == 0){
                $.getScript("https://apis.google.com/js/api:client.js", function() {
                    loginGoogleAPI(function(objUser){
                        var token = objUser.B.access_token;
                        var email = objUser.getBasicProfile().getEmail();
                        console.log(token);
                        loginGoogle(email,token,function(){
                            getFriendBySocialType(4,0,"","",function(result){
                                console.log(result);
                                var str = '';
                                $.each(result.data,function(index,value){
                                    var socialAvatar = value.SocialAvatar;
                                    var displayName = value.DisplayName;
                                    str +='<div class="friend-tr-block">';
                                    str +='<div class="fb-imageAvatar twt-feed"><img src="'+socialAvatar+'"></div>';
                                    str +='<div class="fb-friends-name"><div>'+displayName+'</div><div class="location"></div></div>';
                                    str +='<div class="fb-addFriend"><img src="assets/image/Sync/check_02.png"></div>';
                                    str +='</div>';
                                });
                                $('#results-div').append(str);
                            },'results-div');

                        });
                    },'g-plus');
                });
            }else{
                $('#g-plus').on('click',function(){
                    getFriendBySocialType(4,0,"","",function(result){
                        var str = '';
                        $.each(result.data,function(index,value){
                            var socialAvatar = value.SocialAvatar;
                            var displayName = value.DisplayName !='' ? value.DisplayName:value.SocialAccountID;
                            str +='<div class="friend-tr-block">';
                            str +='<div class="fb-imageAvatar twt-feed"><img src="'+socialAvatar+'"></div>';
                            str +='<div class="fb-friends-name"><div>'+displayName+'</div><div class="location"></div></div>';
                            str +='<div class="fb-addFriend"><img src="assets/image/Sync/check_02.png"></div>';
                            str +='</div>';
                        });
                        $('#results-div').html(str);
                    },'results-div');
                });
            }
        });
    });
</script>
<!--<script src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>-->

<!--linkedin connect to sever-->
<script type="text/javascript" src="//platform.linkedin.com/in.js">
   api_key: 75lzvb42wlfr62
   onLoad: onLinkedInLoad
</script>


