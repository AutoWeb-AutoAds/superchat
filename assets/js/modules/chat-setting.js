var deleteChat = function(data){
    var isGroup = data.getAttribute('data-isGroup');
    var toID = data.getAttribute('data-toID');
    var chatID = data.getAttribute('data-chatID');
    var sATypeID = data.getAttribute('data-sATypeID');
    var groupID = data.getAttribute('data-groupID');
    if(isGroup == '1'){
        deleteChatFromGroupChat(groupID,chatID);
    }else{
        deleteChatByChatID(toID,chatID,sATypeID);
    }
}

var deleteChatByChatID = function(toID,chatID,sATypeID) {
    var data = {
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
                "ToID" : toID,
                "ChatID" : chatID,
                "SATypeID": sATypeID,
                "AccessKey" : localStorage['access_key']
            }
        }
    }
    socketIoCon.emit('deleteChat', JSON.stringify(data));
    socketIoCon.removeAllListeners('deleteChat-result');
    socketIoCon.on('deleteChat-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            $('#fadeOut_'+chatID).fadeOut('fast');
        }else{
            console.log(obj);
        }
    });
}

var deleteChatFromGroupChat = function(groupID,chatID){
    var dataDeleteChatGroup = {
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
                "AccessKey" : localStorage['access_key'],
                "GroupID" : groupID,
                "ChatID" : chatID
            }
        }
    }
    socketIoCon.emit('deleteChatFromGroupChat', JSON.stringify(dataDeleteChatGroup));
    socketIoCon.removeAllListeners('deleteChatFromGroupChat-result');
    socketIoCon.on('deleteChatFromGroupChat-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            $('#fadeOut_'+chatID).fadeOut('fast');
        }else{
            console.log(obj);
        }
    });
}

var clearPrivateChat = function(toID){
    var dataClearPrivateChat = {
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
                "AccessKey" : localStorage['access_key'],
                "SATypeID": "1",
                "ToID" : toID
            }
        }
    }

    socketIoCon.emit('clearPrivateChat', JSON.stringify(dataClearPrivateChat));
    socketIoCon.removeAllListeners('clearPrivateChat-result');
    socketIoCon.on('clearPrivateChat-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            $('#msgResult_'+toID).html('');
        }else{
            console.log(obj);
        }
    });

}

var clearChatInGroupChat = function(groupID){
    var clearGroupChat = {
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
                "AccessKey" : localStorage['access_key'],
                "GroupID" : groupID
            }
        }
    }

    socketIoCon.emit('clearChatInGroupChat', JSON.stringify(clearGroupChat));
    socketIoCon.removeAllListeners('clearChatInGroupChat-result');
    socketIoCon.on('clearChatInGroupChat-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            $('#msgResult_'+groupID).html('');
        }else{
            console.log(obj);
        }
    });
}

var sendSMS = function(content,destinationPhoneNumber,countryCode){
    var smsData = {
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
                "AccessKey" : localStorage['access_key'],
                "Content" : content,
                "DestinationPhoneNumber" : destinationPhoneNumber,
                "CountryCode": countryCode
            }
        }
    }
    socketIoCon.emit('sendSMS', JSON.stringify(smsData));
    socketIoCon.removeAllListeners('sendSMS-result');
    socketIoCon.on('sendSMS-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            $('.send-sms-success').show().html('Your message has been sent!');
        }else{
            $('.send-sms-success').show().html("Please upgrade your account. You dont have sms.");
            //console.log(obj);
        }
    });
}

var blockContact = function(friendId){
    var blockData = {
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
                "AccessKey" : localStorage['access_key'],
                "ListFriendID" : [friendId],
                "BlockStatus" : "1"
            }
        }
    }
    socketIoCon.emit('blockContact', JSON.stringify(blockData));
    socketIoCon.removeAllListeners('blockContact-result');
    socketIoCon.on('blockContact-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            console.log('Block success');
            closeJqxWindowId('div-block-contact');
            $('#background-input-chat_'+friendId).hide();
        }
    });
}

var deleteConversation = function(data){
    var chatType = data.getAttribute('data-chatType');
    var divUrl = basePath + '/chat/deleteConversation';
    var friendID = data.getAttribute('data-friendID');
    newJqxWindow('div-delete-conversation','Delete Entire Conversations?',400,110,divUrl,chatType,'');
}

var popBlockContact = function(data){
    var friendID = data.getAttribute('data-friendID');
    var divBlockContactUrl = basePath + '/chat/blockContact';
    newJqxWindow('div-block-contact','Block Contact?',400,110,divBlockContactUrl,'','');
}

var popSendSMS = function(data){
    var chatType = data.getAttribute('data-chatType');
    var friendID = data.getAttribute('data-friendID');
    var smsUrl = basePath + '/chat/sendSMS';
    newJqxWindow('div-chat-send-sms','Send SMS',350,280,smsUrl,chatType,'');
}

var saveChatBackground = function(toID,backgroundType,backgroundOption,socialNetworkTypeID,fileName,fileSize,mimeType,fileOption,isGroup){
    var chatBgData = {
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
                "AccessKey" : localStorage['access_key'],
                "ToID" : toID,
                "BackgroundType" : backgroundType,
                "BackgroundOption" : backgroundOption,
                "SocialNetworkTypeID" : socialNetworkTypeID,
                "FileName" : fileName,
                "FileSize" : fileSize,
                "MimeType" : mimeType,
                "FileOption" : fileOption,
                "IsGroup" : isGroup
            }
        }
    }

    socketIoCon.emit('saveChatBackground', JSON.stringify(chatBgData));
    socketIoCon.removeAllListeners('saveChatBackground-result');
    socketIoCon.on('saveChatBackground-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            console.log('Success');
        }else{
            console.log(obj);
        }
    });
}

var getChatBackground = function(toID,isGroup,socialNetworkTypeID,callback){
    var getChatBGData = {
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
                "AccessKey" : localStorage['access_key'],
                "ToID" : toID,
                "IsGroup" : isGroup,
                "SocialNetworkTypeID" : socialNetworkTypeID
            }
        }
    }

    socketIoCon.emit('getChatBackground', JSON.stringify(getChatBGData));
    socketIoCon.removeAllListeners('getChatBackground-result');
    socketIoCon.on('getChatBackground-result', function (datas) {
        var json = JSON.parse(datas);
        var objData = JSON.parse(json.Body.Data);
        if(objData.code == 1){
            callback(objData);
        }
    });
}

var popChatBackground = function(data){
    var backgroundType = data.getAttribute('data-background-chat');
    var chatType = data.getAttribute('data-chatType');
    var friendID = data.getAttribute('data-friendID');
    var isGroup = chatType == 'chat' ? '0':'1';
    if(backgroundType == 'gallery'){
        var url = basePath + '/chat/backgroundGallery';
        newJqxWindow('div-background-gallery','Background Gallery',500,350,url,chatType,'');
        getChatBackground(friendID,isGroup,1,function(result){
            if(result.data.backgroundOption != undefined){
                $('#chat-bg-gallery').html('<img src="'+result.data.backgroundOption+'" width="300" height="200">');
            }
        });
    }
}


