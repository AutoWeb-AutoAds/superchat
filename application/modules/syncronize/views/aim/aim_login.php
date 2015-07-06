<div class="form-body">
    <div class="login-height">
        <div class="div-header-img"><img src="assets/image/logos/aol.png"></div>
        <div class="div-input"><input type="text" id="aim-username" placeholder="Username or E-mail" autofocus="true"></div>
        <div class="div-input"><input type="password" id="aim-password" placeholder="Password"></div>
        <div class="message-error" id="message-error"></div>
    </div>
    <div class="float-right"><button type="button" id="btn-cancel-aim" class="btn btn-default">Cancel</button></div>
    <div class="float-right"><button type="button" id="div-btn-signin-aim" class="btn btn-primary active">Sign In</button></div>
</div>

<script>
    $(document).ready(function(){
        $('#div-btn-signin-aim').on('click',function(){
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
                    var aimResult = '';
                    if(aimObj.data.length){
                        $.each(aimObj.data,function(index,value){
                            var displayName = value.DisplayName != '' ? value.DisplayName:value.UserID;
                            var imageAvatar = 'http://54.88.49.6/superchat-local/image/convert_image?UserID='+value.UserID+'&FileWidth=40&FileHeight=40';
                            aimResult +='<div class="friend-tr-block">';
                            aimResult +='<div class="fb-imageAvatar twt-feed"><img src="'+imageAvatar+'" class="img-circle" width="40" height="40"></div>';
                            aimResult +='<div class="fb-friends-name">'+displayName+'</div>';
                            aimResult +='<div class="fb-addFriend"><img src="assets/image/Sync/check_02.png"></div>';
                            aimResult +='</div>';
                        });
                        $('#results-div').html(aimResult);
                        $('#header-title').html('Your AIM Contacts');
                        closeJqxWindowId('div-aim-login-pop');
                    }
                },'results-div');
            });
        });

        $('#btn-cancel-aim').on('click',function(){
            closeJqxWindowId('div-aim-login-pop');
        });
        $('#aim-username, #aim-password').keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                $("#div-btn-signin-aim").trigger('click');
            }
        });
    });

</script>