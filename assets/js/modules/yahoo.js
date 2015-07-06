var loginYahoo = function(username,password,callback){
    var  dataDev = {
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

    socketIoCon.emit('loginYahoo', JSON.stringify(dataDev));
    socketIoCon.removeAllListeners('loginYahoo-result');
    socketIoCon.on('loginYahoo-result', function(datas){
        var object = JSON.parse(datas);
        var ob = JSON.parse(object.Body.Data);
        if(ob.code == 1){
            console.log('Login Yahoo success');
            if(callback){
                callback();
            }
        } else {
            $('#message-error').show().html('Invalid Yahoo Username and/or Password!');
            console.log('Login failed');
            console.log(ob.message.description);
        }
    });
}

var checkYahooSession = function(callbackFunc){
    var yhSesData = {
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
    socketIoCon.emit('checkYahooSession', JSON.stringify(yhSesData));
    socketIoCon.removeAllListeners('checkYahooSession-result');
    socketIoCon.on('checkYahooSession-result', function(resulth){
        var json = JSON.parse(resulth);
        callbackFunc(JSON.parse(json.Body.Data));

    });
}

var yahooPopUp = function(){
    var yhLoginUrl = basePath+'/chat/yahooLogin';
    newJqxWindow('div-yahoo-login-pop','Yahoo Messenger!',300,500,yhLoginUrl,'','');
}

var listYahooFriends = function(callback,divLoading){
    beforeSendRequest(divLoading);
    var yahooData = {
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
    socketIoCon.emit('getYahooFriends', JSON.stringify(yahooData));
    socketIoCon.removeAllListeners('getYahooFriends-result');
    socketIoCon.on('getYahooFriends-result', function(datasyahoo){
        var objectYahoo = JSON.parse(datasyahoo);
        callback(JSON.parse(objectYahoo.Body.Data));
    });
}

var sendYahooChat = function(text,friendID,callbackFunc){
    var yahooChat = {
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
                "AccessKey" : localStorage['access_key']
            }
        }
    }

    socketIoCon.emit('sendYahooChat', JSON.stringify(yahooChat));
    socketIoCon.removeAllListeners('sendYahooChat-result');
    socketIoCon.on('sendYahooChat-result', function(datasyahoo){
        var obj = JSON.parse(datasyahoo);
        callbackFunc(JSON.parse(obj.Body.Data));
    });
}

var recieveYahooChat = function(listenData){
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
