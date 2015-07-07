$(function(){
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
var checkGoogleSession = function(callback){
    var checkGSes = {
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
                "AccessKey" : localStorage.getItem('access_key')
            }
        }
    }
    socketIoCon.emit('checkGoogleSession', JSON.stringify(checkGSes));
    socketIoCon.removeAllListeners('checkGoogleSession-result');
    socketIoCon.on('checkGoogleSession-result', function(resulth){
        var json = JSON.parse(resulth);
        callback(JSON.parse(json.Body.Data));

    });
}

var getGoogleFriends = function(callback,divLoading){
    beforeSendRequest(divLoading);
    var googleData = {
        "Header": {
            "From": "",
            "To": "",
            "DateTime": "",
            "PartnerID": "",
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
                "AccessKey" : localStorage['access_key']
            }
        }
    }
    socketIoCon.emit('getGoogleFriends', JSON.stringify(googleData));
    socketIoCon.removeAllListeners('getGoogleFriends-result');
    socketIoCon.on('getGoogleFriends-result', function(resulth){
        var js = JSON.parse(resulth);
        callback(JSON.parse(js.Body.Data));
    });
}

var loginGoogle = function (email,token,callback) {
    var loginGData = {
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
                "AccessKey" : localStorage.getItem('access_key'),
                    "Email" : email,
                    "Token" : token
            }
        }
    }

    socketIoCon.emit('loginGoogle', JSON.stringify(loginGData));
    socketIoCon.removeAllListeners('loginGoogle-result');
    socketIoCon.on('loginGoogle-result', function(resulth){
        var js = JSON.parse(resulth);
        callback();
    });
}

var listGoogleFriends = function(){
    getFriendBySocialType(4,0,"","",function(result){
        var googleFriend = '';
        $.each(result.data,function(index,value){
            var name = value.DisplayName !='' ? value.DisplayName:value.SocialAccountID;
            var friendName = func_DefaultName(name,'','');
            var imageAvatar = value.SocialAvatar !='' ? '<img src="'+value.SocialAvatar+'" class="img-circle" width="40" height="40">':'';
            googleFriend += '<div class="chat-contact-block" onclick="func_getTabtitle(this)" data-func_type="chat" data-title="'+friendName+'" data-SIPUser="" data-friendID="'+value.SocialAccountID+'" data-sourceFriendID="'+value.SocialAccountID+'" data-socialAccountTypeID="4">';
            googleFriend += '<div class="contact-img">'+imageAvatar+'</div>';
            googleFriend += '<div class="contact-name-info">';
            googleFriend += '<div class="contact-name">'+friendName+'</div>';
            googleFriend += '<div class="contact-location"></div>';
            googleFriend += '</div>';
            googleFriend += '<div class="contact-notification">';
            googleFriend += '<div class="social-type-img"><div><img src="assets/image/icons/g-pluse.png"></div><div id="private-chat-notify_'+value.SocialAccountID+'"></div></div>';
            googleFriend += '</div>';
            googleFriend += '<div class="contact-chatted-time" id="private-chat-time_'+value.SocialAccountID+'"></div>';
            googleFriend += '</div>';
        });
        $('#div-contact-scroll-left').html(googleFriend);

    },'div-contact-scroll-left');
}

var sendGoogleChat = function(text,friendID,displayName,callback){
    var googleChat = {
        "Header": {
            "From": "",
            "To": "",
            "DateTime": "",
            "PartnerID": "",
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
                "Text" : text,
                "FriendID":friendID,
                "DisplayName":displayName,
                "AccessKey" : localStorage.getItem('access_key')
            }
        }
    }
    socketIoCon.emit('sendGoogleChat', JSON.stringify(googleChat));
    socketIoCon.removeAllListeners('sendGoogleChat-result');
    socketIoCon.on('sendGoogleChat-result', function(result){
        var obj = JSON.parse(result);
        callback(JSON.parse(obj.Body.Data));
    });
}

var receiveGoogleChat = function(listenData){
    console.log(listenData);
    var chatTypeID = listenData.chatTypeID;
    var chatNotification = '';
    var d = new Date();
    var getChatDate = d.toLocaleTimeString();
    $.titleAlert(listenData.fromID+' messaged you...',{stopOnFocus:true});
    $('<audio class="private-chat-audio"><source src="assets/sound/job-done.mp3" type="audio/mpeg"></audio>').appendTo('body');
    $('.private-chat-audio')[0].play();
    var defaultImg = 'http://54.88.49.6/superchat-local/image/convert_image?UserID='+listenData.fromID+'&FileWidth=25&FileHeight=25';
    var imageAvatar = listenData.imageAvatar !='' ? listenData.imageAvatar:defaultImg;
    getUnreadChatNotification(listenData.fromID,listenData.sATypeID,listenData.fromID);
    switch (chatTypeID){
        case 1:
            //get plain text notification
            chatNotification +='<div class="list-sms-body">';
            chatNotification +='<div class="friend-name">'+listenData.displayName+'</div>';
            chatNotification +='<div class="imgAvatar-friend"><img src="'+imageAvatar+'" class="img-circle"></div>';
            chatNotification +='<div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
            chatNotification +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" title=""></div>';
            chatNotification +='<div class="sms-content">'+listenData.content+'<br></div>';
            chatNotification +='<div class="time-chated">'+getChatDate+'</div>';
            chatNotification +='<div class="social-con_active"><img src="assets/image/Chats/app_messenger_09.png"> </div>';
            chatNotification +='</div>';
            break;
    }
    $('#msgResult_'+listenData.fromUserID).append(chatNotification);
    var itemContainer = $("#msgResult_"+listenData.fromUserID);
    var scrollTo_int = itemContainer.prop('scrollHeight') + 'px';
    itemContainer.slimScroll({scrollTo : scrollTo_int, height:'97%', start: 'bottom', alwaysVisible: true});
}


// ******************* google login api goes here *************************
var googleUser = {};
var loginGoogleAPI = function(callback,divSignIn) {
    gapi.load('auth2', function(){
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: googlePlusClientId,
            cookiepolicy: 'single_host_origin'
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        attachSignin(document.getElementById(divSignIn),function(data){
            callback(data);
        });
    });
}
var attachSignin = function(googleButton,callback) {
    auth2.attachClickHandler(googleButton, {},
        function(googleUser) {
            callback(googleUser);
        },
        function(error) {
            console.log(JSON.stringify(error, undefined, 2));
        }
    );
}