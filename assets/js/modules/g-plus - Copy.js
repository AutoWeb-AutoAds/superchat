// Use a button to handle authentication the first time.
//var handleClientLoad = function() {
//    gapi.client.setApiKey(googlePlusApiKey);
//    window.setTimeout(checkAuth,1);
//}
//var checkAuth = function() {
//    gapi.auth.authorize({client_id: googlePlusClientId, scope: googlePlusScopes, immediate: true}, handleAuthResult);
//}
//
//var handleAuthClick = function(event) {
//    gapi.auth.authorize({client_id: googlePlusClientId, scope: googlePlusScopes, immediate: false}, handleAuthResult);
//    return false;
//}
//// Load the API and make an API call.  Display the results on the screen.
//var makeApiCall = function() {
//    $('#loading-div').show();
//
//    gapi.client.load('plus','v1', function(){
//        var request = gapi.client.plus.people.list({'userId': 'me','collection': 'visible','orderBy':'alphabetical'});//order by displayName ASC
//        request.execute(function(resp) {
//            //console.log(resp);
//            $('#results-div').html('');
//            var str = '';
//            var listSocialAccount = new Array;
//            for(var i = 0; i <resp.items.length; i++){
//                var socialAccountId = resp.items[i].id;
//                var displayName = resp.items[i].displayName;
//                var socialAvatar = resp.items[i].image.url;
//                var listSocial = {"SocialAccountID":socialAccountId,"SocialFirstName":"","SocialLastName":"","SocialAvatar":socialAvatar,"DisplayName":displayName};
//                listSocialAccount.push(listSocial);
//
//                str +='<div class="friend-tr-block">';
//                str +='<div class="fb-imageAvatar twt-feed"><img src="'+socialAvatar+'"></div>';
//                str +='<div class="fb-friends-name"><div>'+displayName+'</div><div class="location"></div></div>';
//                str +='<div class="fb-addFriend"><a href="javascript:void(0)" id="'+socialAccountId+'"><img src="assets/image/Sync/add_01.png" onclick="synSocialAccount(this)" data-id="'+socialAccountId+'" data-img="'+socialAvatar+'"></a></div>';
//                str +='</div>';
//           }
//            $('#results-div').append(str);
//            $('#loading-div').hide();
//            $('#btn-start-syn').click(function(e){
//                $('#results-div').html('');
//                $('#loading-div').show();
//                synSocialAccounts(listSocialAccount,localStorage['access_key'],4);
//            });
//        });
//
//    });
//}
//
//var handlePermissionClick = function(){
//    $('#g-plus').on('click',function(){
//        $('#header-title').html('Your Google+ Contacts');
//        handleAuthClick();
//    });
//}
//
//var handleAuthResult = function(authResult) {
//    var methods = authResult.status.method;
//    if(methods == 'PROMPT'){
//        //After login, then append result into screen
//        makeApiCall();
//    }else{
//        //ask permission for user, login first
//        handlePermissionClick();
//    }
//}
//
//var synSocialAccounts = function(listSocialAccount,accessKey,socialAccountTypeId){
//    var friendData = {
//        "Header": {
//            "From": "",
//            "To": "",
//            "DateTime": "",
//            "PartnerID": "",
//            "DeviceType": "",
//            "DeviceOS": "",
//            "FromIP": "",
//            "Region": "enUS"
//        },
//        "Body": {
//            "ID": "",
//            "ObjectType": "1000",
//            "Action": "100",
//            "Data": {
//                "AccessKey" : accessKey,
//                "SocialAccountTypeID" :socialAccountTypeId,
//                "ListSocialAccount" : listSocialAccount
//            }
//        }
//    }
//    socketIoCon.removeAllListeners('addFriendSocials-result');
//    socketIoCon.emit('addFriendSocials', JSON.stringify(friendData));
//    socketIoCon.on('addFriendSocials-result', function (datas) {
//        var object = JSON.parse(datas);
//        var ob = JSON.parse(object.Body.Data);
//        if(ob.code == 1){
//            console.log(ob.message.description);
//        }else{
//            console.log(ob.message.description);
//        }
//    });
//}
//
//var synSocialAccount = function(data){
//    var socialAccountId = data.getAttribute('data-id');
//    var socialAvartar = data.getAttribute('data-img');
//    var gFriendData = {
//        "Header": {
//            "From": "",
//            "To": "",
//            "DateTime": "",
//            "PartnerID": "",
//            "DeviceType": "",
//            "DeviceOS": "",
//            "FromIP": "",
//            "Region": "enUS"
//        },
//        "Body": {
//            "ID": "",
//            "ObjectType": "1000",
//            "Action": "100",
//            "Data": {
//                "AccessKey" : localStorage['access_key'],
//                "SocialAccountTypeID" :"4",
//                "ListSocialAccount" : [{"SocialAccountID":socialAccountId,"SocialFirstName":"","SocialLastName":"","SocialAvatar":socialAvartar}]
//            }
//        }
//    }
//    socketIoCon.removeAllListeners('addFriendSocials-result');
//    socketIoCon.emit('addFriendSocials', JSON.stringify(gFriendData));
//    socketIoCon.on('addFriendSocials-result', function (datas) {
//        var object = JSON.parse(datas);
//        var ob = JSON.parse(object.Body.Data);
//        if(ob.code == 1){
//            console.log('Success!');
//            $('#'+socialAccountId).html('');
//            $('#'+socialAccountId).append('<img src="assets/image/Sync/check_02.png">');
//        }else{
//            console.log('Sync ready!');
//        }
//    });
//}

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
            alert(JSON.stringify(error, undefined, 2));
        }
    );
}