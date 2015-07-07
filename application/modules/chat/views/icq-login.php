<div class="form-body">
    <div class="login-height">
        <div class="div-header-img"><img src="assets/image/logos/icq.png"></div>
        <div class="div-input"><input type="text" id="icq-username" placeholder="E-mail or ICQ number" autofocus="true"></div>
        <div class="div-input"><input type="password" id="icq-password" placeholder="Password"></div>
        <div class="message-error" id="message-error"></div>
    </div>
    <div class="float-right"><button type="button" id="btn-signin-icq-filter" class="btn btn-primary active">Sign In</button></div>
</div>
<script>
    $(document).ready(function(){
        $('#btn-signin-icq-filter').on('click',function(){
            var userName = $('#icq-username').val();
            var password = $('#icq-password').val();
            if(userName == '') {
                $('#icq-username').focus();
                $('#icq-username').addClass('input-errors');
                return false;
            } else{
                $('#icq-username').removeClass('input-errors');
            }
            if(password == '') {
                $('#icq-password').focus();
                $('#icq-password').addClass('input-errors');
                return false;
            } else {
                $('#icq-password').removeClass('input-errors');
            }
            loginICQ(userName,password,function(){
                listICQFriends(function(icqObj){
                    var strICQ = '';
                    console.log(icqObj);
                    if(icqObj.data.length){
                        $.each(icqObj.data,function(index,value){
                            var imageAvatar = 'http://54.88.49.6/superchat-local/image/convert_image?UserID='+value.UserID+'&FileWidth=40&FileHeight=40';
                            var socialAccountID = escapeRegExp(value.UserID);
                            var friendName = func_DefaultName(value.DisplayName,'',',');
                            strICQ += '<div class="chat-contact-block" onclick="func_getTabtitle(this)" data-func_type="chat" data-title="'+friendName+'" data-SIPUser="" data-friendID="'+socialAccountID+'" data-sourceFriendID="'+value.UserID+'" data-socialAccountTypeID="12">';
                            strICQ += '<div class="contact-img"><img src="'+imageAvatar+'" class="img-circle" width="40" height="40"></div>';
                            strICQ += '<div class="contact-name-info">';
                            strICQ += '<div class="contact-name">'+friendName+'</div>';
                            strICQ += '<div class="contact-location"></div>';
                            strICQ += '</div>';
                            strICQ += '<div class="contact-notification">';
                            strICQ += '<div class="social-type-img"><div><img src="assets/image/icons/icq.png"></div><div id="private-chat-notify_'+socialAccountID+'"></div></div>';
                            strICQ += '</div>';
                            strICQ += '<div class="contact-chatted-time" id="private-chat-time_'+socialAccountID+'"></div>';
                            strICQ += '</div>';
                        });
                        $('#div-contact-scroll-left').html(strICQ);
                        closeJqxWindowId('div-icq-login-pop');
                    }
                },'div-contact-scroll-left');
            });
        });

        $('#icq-username, #icq-password').keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                $("#btn-signin-icq-filter").trigger('click');
            }
        });
    });

</script>