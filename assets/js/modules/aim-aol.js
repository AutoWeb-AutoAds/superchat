var loginAIM = function(username,password,callback){
    var  aimLogin = {
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
                "UserName" : username,
                "Password" : password
            }
        }
    }

    socketIoCon.emit('loginAim', JSON.stringify(aimLogin));
    socketIoCon.removeAllListeners('loginAim-result');
    socketIoCon.on('loginAim-result', function(datas){
        var object = JSON.parse(datas);
        var ob = JSON.parse(object.Body.Data);
        if(ob.code == 1){
            if(callback){
                callback();
            }
            console.log('Login Aim success');
        } else {
            $('#message-error').show().html('Invalid AIM Username and/or Password!');
            console.log(ob.message.description);
        }
    });
}

var checkAIMSession = function(callbackFunc){
    var aimSesData = {
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
    socketIoCon.emit('checkAimSession', JSON.stringify(aimSesData));
    socketIoCon.removeAllListeners('checkAimSession-result');
    socketIoCon.on('checkAimSession-result', function(resulth){
        var json = JSON.parse(resulth);
        callbackFunc(JSON.parse(json.Body.Data));

    });
}

var aimPopUp = function(){
    var aimLoginUrl = basePath+'/chat/AIMLogin';
    newJqxWindow('div-aim-login-pop','AIM.com',300,500,aimLoginUrl,'','');
}

var listAIMFriends = function(callback,divLoading){
    beforeSendRequest(divLoading);
    var aimData = {
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
    socketIoCon.emit('getAimFriends', JSON.stringify(aimData));
    socketIoCon.removeAllListeners('getAimFriends-result');
    socketIoCon.on('getAimFriends-result', function(result){
        var json = JSON.parse(result);
        callback(JSON.parse(json.Body.Data));
    });
}

var sendAimChat = function(text,friendID,displayName,callbackFunc){
    var AimChat = {
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
                "FriendID" : friendID,
                "DisplayName":displayName,
                "AccessKey" : localStorage['access_key']
            }
        }
    }

    socketIoCon.emit('sendAimChat', JSON.stringify(AimChat));
    socketIoCon.removeAllListeners('sendAimChat-result');
    socketIoCon.on('sendAimChat-result', function(result){
        var obj = JSON.parse(result);
        callbackFunc(JSON.parse(obj.Body.Data));
    });
}

var recieveAimChat = function(listenData){
    var chatTypeID = listenData.chatTypeID;
    var aimChatNotification = '';
    var d = new Date();
    var getChatDate = d.toLocaleTimeString();
    var fromID = escapeRegExp(listenData.fromID);
    $.titleAlert(listenData.displayName+' messaged you...',{stopOnFocus:true});
    $('<audio class="private-chat-audio"><source src="assets/sound/job-done.mp3" type="audio/mpeg"></audio>').appendTo('body');
    $('.private-chat-audio')[0].play();
    var defaultImg = 'http://54.88.49.6/superchat-local/image/convert_image?UserID='+fromID+'&FileWidth=25&FileHeight=25';
    var imageAvatar = defaultImg;
    getUnreadChatNotification(fromID,listenData.sATypeID,fromID);
    switch (chatTypeID){
        case 1:
            aimChatNotification +='<div class="list-sms-body">';
            aimChatNotification +='<div class="friend-name">'+listenData.displayName+'</div>';
            aimChatNotification +='<div class="imgAvatar-friend"><img src="'+imageAvatar+'" class="img-circle" width="25" height="25"></div>';
            aimChatNotification +='<div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
            aimChatNotification +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16"></div>';
            aimChatNotification +='<div class="sms-content">'+listenData.content+'<br></div>';
            aimChatNotification +='<div class="time-chated">'+getChatDate+'</div>';
            aimChatNotification +='<div class="social-con_active"><img src="assets/image/Chats/app_messenger_09.png"> </div>';
            aimChatNotification +='</div>';
            break;
    }
    $('#msgResult_'+fromID).append(aimChatNotification);
    var itemContainer = $("#msgResult_"+fromID);
    var scrollTo = itemContainer.prop('scrollHeight') + 'px';
    itemContainer.slimScroll({scrollTo : scrollTo, height:'97%', start: 'bottom', alwaysVisible: true});
}