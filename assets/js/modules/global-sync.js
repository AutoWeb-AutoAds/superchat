$(document).ready(function(){
    $('#results-div').html('');
    $('#results-div').slimscroll({
        height: $(document).height() - 150,
        size:'5px',
        alwaysVisible:false
    });
    $('#div-sync-social').slimscroll({
        height: $(document).height() - 80,
        size:'5px',
        alwaysVisible:false
    });

    //-------------------- AIM --------------------------
    $('#aim').click(function(e){
        checkAIMSession(function(result){
            if(result.code == 0){
                var aimLoginUrl = basePath + '/syncronize/aim_login';
                newJqxWindow('div-aim-login-pop','AIM.com',300,500,aimLoginUrl,'','');
            }else{
                listAIMFriends(function(aimObj){
                    var aimResult = '';
                    $.each(aimObj.data,function(index,value){
                        var displayName = value.DisplayName != '' ? value.DisplayName:value.UserID;
                        var imageAvatar = '<img src="assets/image/icons/defaultImg.gif">';
                        aimResult +='<div class="friend-tr-block">';
                        aimResult +='<div class="fb-imageAvatar twt-feed">'+imageAvatar+'</div>';
                        aimResult +='<div class="fb-friends-name">'+displayName+'</div>';
                        aimResult +='<div class="fb-addFriend"><img src="assets/image/Sync/check_02.png"></div>';
                        aimResult +='</div>';
                    });
                    $('#results-div').html(aimResult);
                    $('#header-title').html('Your AIM Contacts');
                },'results-div');
            }
        });
    });

    // ------------------ Yahoo Messenger ---------------
    $('#yahoo').click(function(e) {
        checkYahooSession(function(result){
            if(result.code == 0){
                var yahooLoginUrl = basePath + '/syncronize/yahoo_login';
                newJqxWindow('div-yahoo-login-pop','Yahoo! Messenger',300,500,yahooLoginUrl,'','');
            }else{
                listYahooFriends(function(yahooObj){
                    console.log(yahooObj);
                    var yahooResult = '';
                    $.each(yahooObj.data,function(index,value){
                        var displayName = value.UserID;
                        var imageAvatar = '<img src="'+value.ImageAvatar+'" class="img-circle" width="40" height="40">';
                        yahooResult +='<div class="friend-tr-block">';
                        yahooResult +='<div class="fb-imageAvatar twt-feed">'+imageAvatar+'</div>';
                        yahooResult +='<div class="fb-friends-name">'+displayName+'</div>';
                        yahooResult +='<div class="fb-addFriend"><img src="assets/image/Sync/check_02.png"></div>';
                        yahooResult +='</div>';
                    });
                    $('#results-div').html(yahooResult);
                    $('#header-title').html('Your Yahoo! messenger Contacts');
                },'results-div');
            }
        });
    });

    // --------------------- ICQ ------------------------
    $('#icq').click(function(e) {
        checkICQSession(function(result){
            if(result.code == 0){
                var icqLoginUrl = basePath+'/syncronize/icq_login';
                newJqxWindow('div-icq-login-pop','ICQ',300,500,icqLoginUrl,'','');
            }else{
                listICQFriends(function(icqObj){
                    var icqResult = '';
                    $.each(icqObj.data,function(index,value){
                        var displayName = value.DisplayName;
                        var imageAvatar = '<img src="assets/image/icons/defaultImg.gif">';
                        icqResult +='<div class="friend-tr-block">';
                        icqResult +='<div class="fb-imageAvatar twt-feed">'+imageAvatar+'</div>';
                        icqResult +='<div class="fb-friends-name">'+displayName+'</div>';
                        icqResult +='<div class="fb-addFriend"><img src="assets/image/Sync/check_02.png"></div>';
                        icqResult +='</div>';
                    });
                    $('#results-div').html(icqResult);
                    $('#header-title').html('Your ICQ Contacts');
                },'results-div');
            }
        });
    });

});