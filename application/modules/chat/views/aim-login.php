<div class="form-body">
    <div class="login-height">
        <div class="div-header-img"><img src="assets/image/logos/aol.png"></div>
        <div class="div-input"><input type="text" id="aim-username" placeholder="Username or E-mail" autofocus="true"></div>
        <div class="div-input"><input type="password" id="aim-password" placeholder="Password"></div>
        <div class="message-error" id="message-error"></div>
    </div>
    <div class="float-right"><button type="button" id="btn-signin-aim-filter" class="btn btn-primary active">Sign In</button></div>
</div>
<script>
    $(document).ready(function(){
        $('#btn-signin-aim-filter').on('click',function(){
            var userName = $('#aim-username').val();
            var password = $('#aim-password').val();
            if(userName == '') {
                $('#aim-username').focus();
                $('#aim-username').addClass('input-errors');
                return false;
            } else{
                $('#aim-username').removeClass('input-errors');
            }
            if(password == '') {
                $('#aim-password').focus();
                $('#aim-password').addClass('input-errors');
                return false;
            } else {
                $('#aim-password').removeClass('input-errors');
            }
            loginAIM(userName,password,function(){
                listAIMFriends(function(aimObj){
                    console.log(aimObj);
                    var strAIM = '';
                    if(aimObj.data.length){
                        $.each(aimObj.data,function(index,value){
                            var imageAvatar = 'http://54.88.49.6/superchat-local/image/convert_image?UserID='+value.UserID+'&FileWidth=40&FileHeight=40';
                            var socialAccountID = escapeRegExp(value.UserID);
                            var friendName = value.DisplayName =='' ? func_DefaultName(value.UserID,'',','):func_DefaultName(value.DisplayName,'',',');
                            strAIM += '<div class="chat-contact-block" onclick="func_getTabtitle(this)" data-func_type="chat" data-title="'+friendName+'" data-SIPUser="" data-friendID="'+socialAccountID+'" data-sourceFriendID="'+value.UserID+'" data-socialAccountTypeID="8">';
                            strAIM += '<div class="contact-img"><img src="'+imageAvatar+'" class="img-circle" width="40" height="40"></div>';
                            strAIM += '<div class="contact-name-info">';
                            strAIM += '<div class="contact-name">'+friendName+'</div>';
                            strAIM += '<div class="contact-location"></div>';
                            strAIM += '</div>';
                            strAIM += '<div class="contact-notification">';
                            strAIM += '<div class="social-type-img"><div><img src="assets/image/icons/aim.png"></div><div id="private-chat-notify_'+socialAccountID+'"></div></div>';
                            strAIM += '</div>';
                            strAIM += '<div class="contact-chatted-time" id="private-chat-time_'+socialAccountID+'"></div>';
                            strAIM += '</div>';
                        });
                        $('#div-contact-scroll-left').html(strAIM);
                        closeJqxWindowId('div-aim-login-pop');
                    }
                },'div-contact-scroll-left');
            });
        });
        $('#aim-username, #aim-password').keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                $("#btn-signin-aim-filter").trigger('click');
            }
        });
    });

</script>