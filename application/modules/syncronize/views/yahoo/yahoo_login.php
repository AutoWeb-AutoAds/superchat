<div class="form-body">
    <div class="login-height">
        <div class="div-header-img"><img src="assets/image/logos/yahoo.png"></div>
        <div class="div-input"><input type="text" id="y-username" placeholder="Yahoo username" autofocus="true"></div>
        <div class="div-input"><input type="password" id="y-password" placeholder="Password"></div>
        <div class="message-error" id="message-error"></div>
    </div>

    <div class="float-right"><button type="button" id="btn-cancel-yahoo" class="btn btn-default">Cancel</button></div>
    <div class="float-right"><button type="button" id="div-btn-signin-yh" class="btn btn-primary active">Sign In</button></div>
</div>
<script>
    $(document).ready(function(){
        $('#div-btn-signin-yh').on('click',function(){
            var yUserName = $('#y-username').val();
            var username = yUserName.split("@");
            var yPassword = $('#y-password').val();
            if(yUserName == '') {
                $('#y-username').focus();
                $('#y-username').addClass('input-errors');
                return false;
            } else{
                $('#y-username').removeClass('input-errors');
            }
            if(yPassword == '') {
                $('#y-password').focus();
                $('#y-password').addClass('input-errors');
                return false;
            } else {
                $('#y-password').removeClass('input-errors');
            }
            loginYahoo(username[0],yPassword,function(){
                listYahooFriends(function(yahooObj){
                    var yahooResult = '';
                    if(yahooObj.data.length){
                        $.each(yahooObj.data,function(index,value){
                            var displayName = func_DefaultName(value.UserID,'',',');
                            var imageAvatar = '<img src="'+value.ImageAvatar+'" class="img-circle" width="40" height="40">';
                            yahooResult +='<div class="friend-tr-block">';
                            yahooResult +='<div class="fb-imageAvatar twt-feed">'+imageAvatar+'</div>';
                            yahooResult +='<div class="fb-friends-name">'+displayName+'</div>';
                            yahooResult +='<div class="fb-addFriend"><img src="assets/image/Sync/check_02.png"></div>';
                            yahooResult +='</div>';
                        });
                        $('#results-div').html(yahooResult);
                        $('#header-title').html('Your Yahoo! messenger Contacts');
                        closeJqxWindowId('div-yahoo-login-pop');
                    }

                },'results-div');
            });
        });
        $('#btn-cancel-yahoo').on('click',function(){
            closeJqxWindowId('div-yahoo-login-pop');
        });
        $('#y-username, #y-password').keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                $("#div-btn-signin-yh").trigger('click');
            }
        });
    });

</script>