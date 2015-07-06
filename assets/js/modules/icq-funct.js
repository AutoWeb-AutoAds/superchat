var loginICQ = function(username,password,callback){
    var  icqData = {
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

    socketIoCon.emit('loginICQ', JSON.stringify(icqData));
    socketIoCon.removeAllListeners('loginICQ-result');
    socketIoCon.on('loginICQ-result', function(datas){
        var object = JSON.parse(datas);
        var ob = JSON.parse(object.Body.Data);
        if(ob.code == 1){
            console.log('Login ICQ success');
            if(callback){
                callback();
            }
        } else {
            $('#message-error').show().html('Invalid ICQ number and/or Password!');
            console.log('Login failed');
            console.log(ob.message.description);
        }
    });
}

var checkICQSession = function(callbackFunc){
    var icqSesData = {
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
    socketIoCon.emit('checkIcqSession', JSON.stringify(icqSesData));
    socketIoCon.removeAllListeners('checkIcqSession-result');
    socketIoCon.on('checkIcqSession-result', function(resulth){
        var json = JSON.parse(resulth);
        callbackFunc(JSON.parse(json.Body.Data));

    });
}

var icqPopUp = function(){
    var icqLoginUrl = basePath+'/chat/icqLogin';
    newJqxWindow('div-icq-login-pop','ICQ',300,500,icqLoginUrl,'','');
}

var listICQFriends = function(callback,divLoading){
    beforeSendRequest(divLoading);
    var icqData = {
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
    socketIoCon.emit('getIcqFriends', JSON.stringify(icqData));
    socketIoCon.removeAllListeners('getIcqFriends-result');
    socketIoCon.on('getIcqFriends-result', function(datasyahoo){
        var objectYahoo = JSON.parse(datasyahoo);
        callback(JSON.parse(objectYahoo.Body.Data));
    });
}

var sendIcqChat = function(text,friendID,displayName,callbackFunc){
    var icqChat = {
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
                "DisplayName": displayName,
                "AccessKey" : localStorage['access_key']
            }
        }
    }

    socketIoCon.emit('sendIcqChat', JSON.stringify(icqChat));
    socketIoCon.removeAllListeners('sendIcqChat-result');
    socketIoCon.on('sendIcqChat-result', function(result){
        var obj = JSON.parse(result);
        callbackFunc(JSON.parse(obj.Body.Data));
    });
}

var recieveIcqChat = function(listenData){
    var chatTypeID = listenData.chatTypeID;
    var chatNotification = '';
    var d = new Date();
    var getChatDate = d.toLocaleTimeString();
    $.titleAlert(listenData.fromID+' messaged you...',{stopOnFocus:true});
    $('<audio class="private-chat-audio"><source src="assets/sound/job-done.mp3" type="audio/mpeg"></audio>').appendTo('body');
    $('.private-chat-audio')[0].play();
    var defaultImg = 'http://54.88.49.6/superchat-local/image/convert_image?UserID='+listenData.fromID+'&FileWidth=25&FileHeight=25';
    var imageAvatar = listenData.imageAvatar != '' ? listenData.imageAvatar:defaultImg;
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
    itemContainer.slimScroll({
        scrollTo : scrollTo_int,
        height:'97%',
        start: 'bottom',
        alwaysVisible: true
    });
}