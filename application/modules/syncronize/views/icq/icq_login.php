<div class="form-body">
    <div class="login-height">
        <div class="div-header-img"><img src="assets/image/logos/icq.png"></div>
        <div class="div-input"><input type="text" id="icq-username" placeholder="E-mail or ICQ number" autofocus="true"></div>
        <div class="div-input"><input type="password" id="icq-password" placeholder="Password"></div>
        <div class="message-error" id="message-error"></div>
    </div>
    <div class="float-right"><button type="button" id="btn-cancel-icq" class="btn btn-default">Cancel</button></div>
    <div class="float-right"><button type="button" id="div-btn-signin-icq" class="btn btn-primary active">Sign In</button></div>
</div>
<script>
    $(document).ready(function(){
        $('#div-btn-signin-icq').on('click',function(){
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
                    console.log(icqObj);
                    var icqResult = '';
                    if(icqObj.data.length){
                        $.each(icqObj.data,function(index,value){
                            var displayName = func_DefaultName(value.DisplayName,'',',');
                            var imageAvatar = 'http://54.88.49.6/superchat-local/image/convert_image?UserID='+value.UserID+'&FileWidth=40&FileHeight=40';
                            icqResult +='<div class="friend-tr-block">';
                            icqResult +='<div class="fb-imageAvatar twt-feed"><img src="'+imageAvatar+'" class="img-circle" width="40" height="40"></div>';
                            icqResult +='<div class="fb-friends-name">'+displayName+'</div>';
                            icqResult +='<div class="fb-addFriend"><img src="assets/image/Sync/check_02.png"></div>';
                            icqResult +='</div>';
                        });
                        $('#results-div').html(icqResult);
                        $('#header-title').html('Your ICQ Contacts');
                        closeJqxWindowId('div-icq-login-pop');
                    }

                },'results-div');
            });
        });

        $('#btn-cancel-icq').on('click',function(){
            closeJqxWindowId('div-icq-login-pop');
        });
        $('#icq-username, #icq-password').keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                $("#div-btn-signin-icq").trigger('click');
            }
        });
    });

</script>