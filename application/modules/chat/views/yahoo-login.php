<div class="form-body">
    <div class="login-height">
        <div class="div-header-img"><img src="assets/image/logos/yahoo.png"></div>
        <div class="div-input"><input type="text" id="yahoo-username" placeholder="Yahoo username" autofocus="true"></div>
        <div class="div-input"><input type="password" id="yahoo-password" placeholder="Password"></div>
        <div class="message-error" id="message-error"></div>
    </div>
    <div class="float-right"><button type="button" id="btn-cancel-yahoo" class="btn btn-default">Cancel</button></div>
    <div class="float-right"><button type="button" id="btn-signin-yh-filter" class="btn btn-primary active">Sign In</button></div>
</div>
<script>
    $(document).ready(function(){
        $('#btn-signin-yh-filter').on('click',function(){
            var yUserName = $('#yahoo-username').val();
            var username = yUserName.split("@");
            var yPassword = $('#yahoo-password').val();
            if(yUserName == '') {
                $('#yahoo-username').focus();
                $('#yahoo-username').addClass('input-errors');
                return false;
            } else{
                $('#yahoo-username').removeClass('input-errors');
            }
            if(yPassword == '') {
                $('#yahoo-password').focus();
                $('#yahoo-password').addClass('input-errors');
                return false;
            } else {
                $('#yahoo-password').removeClass('input-errors');
            }
            loginYahoo(username[0],yPassword,function(){
                listYahooFriends(function(objData){
                    console.log(objData);
                    var strYahoo = '';
                    if(objData.data.length){
                        $.each(objData.data,function(index,value){
                            var imageAvatar = value.ImageAvatar !='' ? value.ImageAvatar:'assets/image/icons/defaultImg.gif';
                            var socialAccountID = escapeRegExp(value.UserID);
                            var friendName = func_DefaultName(value.UserID,'',',');
                            strYahoo += '<div class="chat-contact-block" onclick="func_getTabtitle(this)" data-func_type="chat" data-title="'+friendName+'" data-SIPUser="" data-friendID="'+socialAccountID+'" data-sourceFriendID="'+value.UserID+'" data-socialAccountTypeID="5">';
                            strYahoo += '<div class="contact-img"><img src="'+imageAvatar+'" class="img-circle" width="40" height="40"></div>';
                            strYahoo += '<div class="contact-name-info">';
                            strYahoo += '<div class="contact-name">'+friendName+'</div>';
                            strYahoo += '<div class="contact-location"></div>';
                            strYahoo += '</div>';
                            strYahoo += '<div class="contact-notification">';
                            strYahoo += '<div class="social-type-img"><div><img src="assets/image/icons/yahoo-messenger.png"></div><div id="private-chat-notify_'+socialAccountID+'"></div></div>';
                            strYahoo += '</div>';
                            strYahoo += '<div class="contact-chatted-time" id="private-chat-time_'+socialAccountID+'"></div>';
                            strYahoo += '</div>';
                        });
                        $('#div-contact-scroll-left').html(strYahoo);
                        closeJqxWindowId('div-yahoo-login-pop');
                    }
                },'div-contact-scroll-left');
            });
        });
        $('#btn-cancel-yahoo').on('click',function(){
            closeJqxWindowId('div-yahoo-login-pop');
        });
        $('#yahoo-username, #yahoo-password').keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                $("#btn-signin-yh-filter").trigger('click');
            }
        });
    });

</script>