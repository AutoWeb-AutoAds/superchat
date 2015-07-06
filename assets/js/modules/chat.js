$(document).ready(function(){
    getPrivateNotificationChat();
});
var appendSmsToScreenAndAddPrivateChat = function(friendId,sATypeID,chatTypeID,fileName,mimeType,content){
    var jsTabTitle = JSON.parse(localStorage.getItem('tabtile'));
    if(jsTabTitle != null || jsTabTitle.data != ''){
        $.each(jsTabTitle.data,function(key,value){
            if(sATypeID == 5){ //yahoo messenger
                if(friendId == value.friendId){
                    sendYahooChat(content,value.sourceFriendID,function(yahooMsg){
                        if(yahooMsg.code == 1){
                            getChatFromPrivateChat(friendId,5);
                        }else{
                            console.log(yahooMsg);
                            alert('Session expired. Please login again!');
                        }
                    });
                }
            }else if(sATypeID == 12){//icq
                if(friendId == value.friendId){
                    sendIcqChat(content,value.sourceFriendID,'',function(icqMsg){
                        if(icqMsg.code == 1){
                            getChatFromPrivateChat(friendId,12);
                        }else{
                            console.log(icqMsg);
                            alert('Session expired. Please login again!');
                        }
                    });
                }

            }else if(sATypeID == 8){//aim
                if(friendId == value.friendId){
                    sendAimChat(content,value.sourceFriendID,'',function(aimMsg){
                        if(aimMsg.code == 1){
                            getChatFromPrivateChat(friendId,8);
                        }else{
                            console.log(aimMsg);
                            alert('Session expired. Please login again!');
                        }
                    });
                }
            }

        });
        if(sATypeID != 1){
            return true;
        }
    }

    var addPrivateChat = {
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
                "ToID" : friendId,
                "AccessKey" : localStorage['access_key'],
                "SATypeID" :sATypeID,
                "Content" : content,
                "SocialID" : "",
                "ChatTypeID" : chatTypeID,  // chatTypeID : 1 text, 2 note ,3 sticker,4 file,5 share location
                "FileName" : fileName,
                "FileSize" : ["10"],
                "FileOption" : [""],
                "MimeType" : mimeType,// file extension
                "SocialFirstName" : "",
                "SocialLastName" : "",
                "SocialAvatar" : "",
                "Latitude" : "",
                "Longitude" : "",
                "Address" : "",
                "Country" : "",
                "Street" : "",
                "City" : "",
                "ChatSMS" : "",
                "CountryCode" : "",
                "PhoneNumber" : ""
            }
        }
    }

    socketIoCon.emit('addPrivateChat', JSON.stringify(addPrivateChat));
    socketIoCon.removeAllListeners('addPrivateChat-result');
    socketIoCon.on('addPrivateChat-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            getChatFromPrivateChat(friendId,sATypeID);
        }else{
            console.log(obj);
        }
    });
}

var getChatFromPrivateChat = function(friendId,sATypeID){
    var jsTabTitle = JSON.parse(localStorage.getItem('tabtile'));
    var hasFriendID = '';
    if(sATypeID == 8){
        if(jsTabTitle != null || jsTabTitle.data != ''){
            $.each(jsTabTitle.data,function(key,value){
                if(friendId == value.friendId){
                    hasFriendID = value.sourceFriendID;
                }
            });
        }
    }else{
        hasFriendID = friendId;
    }
    var privateData =  {
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
                "ToID" : hasFriendID,
                "AccessKey" : localStorage['access_key'],
                "SATypeID" : sATypeID,
                "Limit" : "15",
                "Offset" : "0"
            }
        }
    }

    socketIoCon.emit('getPrivateChat', JSON.stringify(privateData));
    socketIoCon.removeAllListeners('getPrivateChat-result');
    socketIoCon.on('getPrivateChat-result', function (datas) {
        var jsonObj = JSON.parse(datas);
        var obj = JSON.parse(jsonObj.Body.Data);
        if(obj.code == '1') {
            getPrivateChats(obj.data,friendId);
        }
    });
}

var getChatFromGroupChat = function(groupId,Limit,Offset,func_call){
    var dataChatGroup = {
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
                "GroupID" : groupId,
                "Limit" : Limit,
                "Offset" : Offset
            }
        }
    }
    socketIoCon.emit('getChatFromGroupChat',JSON.stringify(dataChatGroup));
    socketIoCon.removeAllListeners('getChatFromGroupChat-result');
    socketIoCon.on('getChatFromGroupChat-result',function(result){

        var jsonObj = JSON.parse(result);
        var obj = JSON.parse(jsonObj.Body.Data);
        //console.log(obj);
        if(obj.code == '1') {
            $('#msgResult_'+groupId).html('');
            var chatResult = '';
            //console.log(obj.data);
            $.each(obj.data, function (index, value) {
                var chattedDate = value.chattedDate.split(" ");
                var getChatDate = chattedDate[1];
                var imageAvatar = value.imageAvatar != '' ? '<img src="'+value.imageAvatar+'">':'<img src="assets/images/icons/defaultImg.gif">';
                var chatTypeID = value.chatTypeID;
                if(value.fromID == localStorage['user_id']){
                    // ----------------------- sender block ------------------------------
                    switch (chatTypeID){
                        case 1://Send plain text
                            chatResult +='<div class="list-sms-body" id="fadeOut_'+value.chatID+'">';
                            chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-groupID="'+value.groupID+'" data-isGroup="'+value.isGroup+'" data-toID="'+value.groupID+'" data-chatID="'+value.chatID+'" data-sATypeID="'+value.sATypeID+'" onClick="deleteChat(this)"></div>';
                            chatResult +='<div class="time-me-chated">'+getChatDate+'</div>';
                            chatResult +='<div class="bubble-me-chated"><img src="assets/image/9-Patch/bubble_me_header.png"></div>';
                            chatResult +='<div class="sms-me-content">'+value.content+'</div>';
                            chatResult +='</div>';
                            break;
                        case 2://Send note
                            break;
                        case 3://Send sticker
                            chatResult +='<div class="list-sms-body" id="fadeOut_'+value.chatID+'">';
                            chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-groupID="'+value.groupID+'" data-isGroup="'+value.isGroup+'" data-toID="'+value.friendID+'" data-chatID="'+value.chatID+'" data-sATypeID="'+value.sATypeID+'" onClick="deleteChat(this)"></div>';
                            chatResult +='<div class="time-me-chated">'+getChatDate+'</div><div class="bubble-me-chated"><img src="assets/image/9-Patch/bubble_me_header.png"></div>';
                            chatResult +='<div class="sms-me-content"><img src="assets/image/sticker/ant/'+value.content+'"></div>';
                            chatResult +='</div>';
                            break;
                        case 4://Send text file or image
                            if(value.fileInfo[0].mimeType == 'jpg' || value.fileInfo[0].mimeType=='png' || value.fileInfo[0].mimeType=='gif' || value.fileInfo[0].mimeType=='PNG' || value.fileInfo[0].mimeType=='BMP') {
                                //Send image file
                                chatResult +='<div class="list-sms-body" id="fadeOut_'+value.chatID+'">';
                                chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-groupID="'+value.groupID+'" data-isGroup="'+value.isGroup+'" data-toID="'+value.friendID+'" data-chatID="'+value.chatID+'" data-sATypeID="'+value.sATypeID+'" onClick="deleteChat(this)"></div>';
                                chatResult +='<div class="time-me-chated">'+getChatDate+'</div>';
                                chatResult +='<div class="bubble-me-chated"><img src="assets/image/9-Patch/bubble_me_header.png"></div>';
                                chatResult +='<div class="sms-me-content"><a href="#"><img src="'+value.fileInfo[0].fileUrl+'"></a></div>';
                                chatResult +='</div>';
                            }else{
                                //Send text file
                                var fileContent = '';
                                fileContent +='<div class="main-view-background">';
                                fileContent +='<div class="file-name">'+value.fileInfo[0].fileName+'</div><a href="'+value.fileInfo[0].fileUrl+'"><div class="view-file-background"><img src="assets/image/Profile/save_01.png"></div></a>';
                                fileContent +='</div>';
                                chatResult +='<div class="list-sms-body" id="fadeOut_'+value.chatID+'">';
                                chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-groupID="'+value.groupID+'" data-isGroup="'+value.isGroup+'" data-toID="'+value.friendID+'" data-chatID="'+value.chatID+'" data-sATypeID="'+value.sATypeID+'" onClick="deleteChat(this)"></div>';
                                chatResult +='<div class="time-me-chated">'+getChatDate+'</div>';
                                chatResult +='<div class="bubble-me-chated"><img src="assets/image/9-Patch/bubble_me_header.png"></div>';
                                chatResult +='<div class="sms-me-content">'+fileContent+'</div>';
                                chatResult +='</div>';
                            }
                            break;
                    }

                }else{
                    // ------------------------------ receiver block -----------------------------------------
                    switch (chatTypeID){
                        case 1://Send plain text
                            chatResult +='<div class="list-sms-body" id="fadeOut_'+value.chatID+'">';
                            chatResult +='<div class="friend-name">'+value.displayName+'</div>';
                            chatResult +='<div class="imgAvatar-friend">'+imageAvatar+'</div><div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
                            chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-groupID="'+value.groupID+'" data-isGroup="'+value.isGroup+'" data-toID="'+value.friendID+'" data-chatID="'+value.groupID+'" data-sATypeID="'+value.sATypeID+'" onClick="deleteChat(this)"></div>';
                            chatResult +='<div class="sms-content">'+value.content+'<br></div><div class="time-chated">'+getChatDate+'</div>';
                            chatResult +='<div class="social-con_active"><img src="assets/image/Chats/app_messenger_09.png"> </div>';
                            chatResult +='</div>';
                            break;
                        case 2://Send note
                            break;
                        case 3://Send sticker
                            chatResult +='<div class="list-sms-body" id="fadeOut_'+value.chatID+'">';
                            chatResult +='<div class="friend-name">'+value.displayName+'</div>';
                            chatResult +='<div class="imgAvatar-friend">'+imageAvatar+'</div><div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
                            chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-groupID="'+value.groupID+'" data-isGroup="'+value.isGroup+'" data-toID="'+value.friendID+'" data-chatID="'+value.chatID+'" data-sATypeID="'+value.sATypeID+'" onClick="deleteChat(this)"></div>';
                            chatResult +='<div class="sms-content"><img src="assets/image/sticker/ant/'+value.content+'"><br></div><div class="time-chated">'+getChatDate+'</div>';
                            chatResult +='<div class="social-con_active"><img src="assets/image/Chats/app_messenger_09.png"></div>';
                            chatResult +='</div>';
                            break;
                        case 4://Send text file or image
                            if(value.fileInfo[0].mimeType == 'jpg'||value.fileInfo[0].mimeType=='png'||value.fileInfo[0].mimeType=='gif'||value.fileInfo[0].mimeType=='PNG'||value.fileInfo[0].mimeType=='JPEG') {
                                //Send image
                                chatResult +='<div class="list-sms-body" id="fadeOut_'+value.chatID+'">';
                                chatResult +='<div class="friend-name">'+value.friendName+'</div>';
                                chatResult +='<div class="imgAvatar-friend">'+imageAvatar+'</div><div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
                                chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-groupID="'+value.groupID+'" data-isGroup="'+value.isGroup+'" data-toID="'+value.friendID+'" data-chatID="'+value.chatID+'" data-sATypeID="'+value.sATypeID+'" onClick="deleteChat(this)"></div>';
                                chatResult +='<div class="sms-content"><img src="'+value.fileInfo[0].fileUrl+'"><br></div><div class="time-chated">'+getChatDate+'</div>';
                                chatResult +='<div class="social-con_active"><img src="assets/image/Chats/app_messenger_09.png"></div>';
                                chatResult +='</div>';
                            }else{
                                //Send text file
                                var fileContent = '';
                                fileContent +='<div class="main-view-background">';
                                fileContent +='<a href="'+value.fileInfo[0].fileUrl+'"><div class="view-file-background"><img src="assets/image/Profile/save_01.png"></div></a>';
                                fileContent +='<div class="file-name">'+value.fileInfo[0].fileName+'</div>';
                                fileContent +='</div>';

                                chatResult +='<div class="list-sms-body" id="fadeOut_'+value.chatID+'">';
                                chatResult +='<div class="friend-name">'+value.displayName+'</div>';
                                chatResult +='<div class="imgAvatar-friend">'+imageAvatar+'</div><div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
                                chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-groupID="'+value.groupID+'" data-isGroup="'+value.isGroup+'" data-toID="'+value.friendID+'" data-chatID="'+value.chatID+'" data-sATypeID="'+value.sATypeID+'" onClick="deleteChat(this)"></div>';
                                chatResult +='<div class="sms-content">'+fileContent+'<br></div>';
                                chatResult +='<div class="time-chated">'+getChatDate+'</div><div class="social-con_active"><img src="assets/image/Chats/app_messenger_09.png"> </div>';
                                chatResult +='</div>';
                            }
                            break;
                    }
                }
            });
            $('#msgResult_'+groupId).append(chatResult);
            if(func_call){
                func_call();
            }
            //scroll messages to bottom of page
            var itemContainer = $("#msgResult_"+groupId);
            var scrollTo_int = itemContainer.prop('scrollHeight') + 'px';
            itemContainer.slimScroll({
                scrollTo : scrollTo_int,
                height:'97%',
                start: 'bottom',
                alwaysVisible: true
            });
        }
    });
}

var getPrivateNotificationChat = function(){
    socketIoCon.removeAllListeners('private-notification');
    socketIoCon.on('private-notification', function (response) {
        var output = JSON.parse(response);
        var action = output.Body.Action;
        var dataListen = output.Body.Data.data;
        switch (action){
            case "ADD_PRIVATE_CHAT":
                console.log(dataListen);
                addPrivateChat(dataListen);
                break;
            case "RECEIVE_CHAT_YAHOO":
                console.log(dataListen);
                recieveYahooChat(dataListen);
                break;
            case "RECEIVE_CHAT_ICQ":
                console.log(dataListen);
                recieveIcqChat(dataListen);
                break;
            case "RECEIVE_CHAT_AIM":
                console.log(dataListen);
                recieveAimChat(dataListen);
                break;
            case "ADD_FRIEND":
                hasAddFriend(dataListen);
                break;
            case "CANCELREQUEST":
                cancelFriendRequest(dataListen);
                break;
            case "ACCEPT_FRIEND":
                acceptFriendRequest(dataListen);
                break;
            case "PRESENCE":
                hasPresentChanged(dataListen);
                break;
            case "IGNORE_FRIEND":
                ignoreFriendRequest(dataListen);
                break;
            case "UNFRIEND":
                hasUnfriend(dataListen);
                break;
            case "100":
                func_IntiCoview(dataListen);
                break;
            //case "PRESENCE_GTALK":
            //    console.log('login gtalk');
            //    break;
        }

    });

    getPublicNotificationChat();
}

var getPublicNotificationChat = function(){
    socketIoCon.removeAllListeners('public-notification');
    socketIoCon.on('public-notification',function(response){
        var output = JSON.parse(response);
        var action = output.Body.Action;
        var dataListen = output.Body.Data.data;
        console.log(dataListen);
        switch (action){
            case "ADD_CHAT_TO_GROUP_CHAT":
                //console.log(dataListen);
                getUnreadChatNotification(dataListen.groupID,dataListen.sATypeID,dataListen.groupName);
                //show browser alert message title bar
                $.titleAlert(dataListen.fromUserName+' messaged you...',{stopOnFocus:true});
                $('<audio class="public-chat-audio"><source src="assets/sound/job-done.mp3" type="audio/mpeg"></audio>').appendTo('body');
                $('.public-chat-audio')[0].play();

                var chatNotification = '';
                var chatTypeID = dataListen.chatTypeID;
                var d = new Date();
                var getChatDate = d.toLocaleTimeString();
                var imageAvatar = dataListen.imageAvatar != '' ? '<img src="'+dataListen.imageAvatar+'">':'<img src="assets/image/icons/defaultImg.gif">';
                switch (chatTypeID){
                    case 1:
                        //get plain text notification
                        chatNotification +='<div class="list-sms-body">';
                        chatNotification +='<div class="friend-name">'+dataListen.fromUserName+'</div>';
                        chatNotification +='<div class="imgAvatar-friend">'+imageAvatar+'</div><div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
                        chatNotification +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" title=""></div>';
                        chatNotification +='<div class="sms-content">'+dataListen.content+'<br></div>';
                        chatNotification +='<div class="time-chated">'+getChatDate+'</div>';
                        chatNotification +='<div class="social-con_active"><img src="assets/image/Chats/app_messenger_09.png"> </div>';
                        chatNotification +='</div>';
                        break;
                    case 2:
                        //get Note notifiction
                        break;
                    case 3:
                        //get sticker notification
                        chatNotification +='<div class="list-sms-body">';
                        chatNotification +='<div class="friend-name">'+dataListen.fromUserName+'</div>';
                        chatNotification +='<div class="imgAvatar-friend">'+imageAvatar+'</div><div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
                        chatNotification +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16"></div>';
                        chatNotification +='<div class="sms-content"><img src="assets/image/sticker/ant/'+dataListen.content+'"><br></div>';
                        chatNotification +='<div class="time-chated">'+getChatDate+'</div>';
                        chatNotification +='<div class="social-con_active"><img src="assets/image/Chats/app_messenger_09.png"></div>';
                        chatNotification +='</div>';
                        break;
                    case 4:
                        //get text file or image notification
                        if(dataListen.fileInfo[0].mimeType == 'jpg'||dataListen.fileInfo[0].mimeType=='png'||dataListen.fileInfo[0].mimeType=='PNG'||dataListen.fileInfo[0].mimeType=='gif'||dataListen.fileInfo[0].mimeType=='jpeg'||dataListen.fileInfo[0].mimeType=='bmp') {
                            //get image notification
                            chatNotification +='<div class="list-sms-body">';
                            chatNotification +='<div class="friend-name">'+dataListen.fromUserName+'</div>';
                            chatNotification +='<div class="imgAvatar-friend">' + imageAvatar + '</div><div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
                            chatNotification +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16"></div>';
                            chatNotification +='<div class="sms-content"><img src="'+dataListen.fileInfo[0].fileUrl+'"><br></div>';
                            chatNotification +='<div class="time-chated">'+getChatDate+'</div>';
                            chatNotification +='<div class="social-con_active"><img src="assets/image/Chats/app_messenger_09.png"></div>';
                            chatNotification +='</div>';
                        }else{
                            //get text file notification
                            var fileContent = '';
                            fileContent +='<div class="main-view-background">';
                            fileContent +='<a href="'+dataListen.fileInfo[0].fileUrl+'"><div class="view-file-background"><img src="assets/image/Profile/save_01.png"></div></a>';
                            fileContent +='<div class="file-name">'+dataListen.fileInfo[0].fileName+'</div>';
                            fileContent +='</div>';
                            chatNotification +='<div class="list-sms-body">';
                            chatNotification +='<div class="friend-name">'+dataListen.fromUserName+'</div>';
                            chatNotification +='<div class="imgAvatar-friend">'+imageAvatar+'</div><div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
                            chatNotification +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16"></div>';
                            chatNotification +='<div class="sms-content">'+fileContent+'<br></div>';
                            chatNotification +='<div class="time-chated">'+getChatDate+'</div>';
                            chatNotification +='<div class="social-con_active"><img src="assets/image/Chats/app_messenger_09.png"></div>';
                            chatNotification +='</div>';

                        }
                        break;
                }

                $('#msgResult_'+dataListen.groupID).append(chatNotification);
                //scroll messages to bottom of page
                var itemContainer = $("#msgResult_"+dataListen.groupID);
                var scrollTo_int = itemContainer.prop('scrollHeight') + 'px';
                itemContainer.slimScroll({
                    scrollTo : scrollTo_int,
                    height:'97%',
                    start: 'bottom',
                    alwaysVisible: true
                });
                break;
            case "100":
                func_IntiCoview(dataListen);
                break;

            default :
                break;
        }
    });
}

var appendSmsToScreenAndAddChatToGroupChat =  function(GroupID,Content,ChatTypeID,FileName,FileSize,FileOption,MimeType,Longitude,Latitude,Address,Country,Street,City,Option){
    var datas = {
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
                "GroupID" : GroupID,
                "Content" : Content,
                "ChatTypeID" : ChatTypeID,
                "FileName" : FileName,
                "FileSize" : FileSize,
                "FileOption" : FileOption,
                "MimeType" : MimeType,
                "Longitude" : Longitude,
                "Latitude" : Latitude,
                "Address" : Address,
                "Country" : Country,
                "Street" : Street,
                "City" : City,
                "Option" : Option
            }
        }
    }
    socketIoCon.emit('addChatToGroupChat',JSON.stringify(datas));
    socketIoCon.removeAllListeners('addChatToGroupChat-result');
    socketIoCon.on('addChatToGroupChat-result',function(result){
        var output = JSON.parse(result);
        var dataListen = JSON.parse(output.Body.Data);
        dataListen = dataListen.data;
        console.log(result);
        var chattedDate = dataListen.chattedDate.split(" ");
        var getChatDate = chattedDate[1];
        var chatResult= '';
        switch (dataListen.chatTypeID){
            case 1:
                chatResult +='<div class="list-sms-body" id="fadeOut_'+dataListen.chatID+'">';
                chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-groupID="'+dataListen.groupID+'" data-isGroup="'+dataListen.isGroup+'" data-toID="'+dataListen.groupID+'" data-chatID="'+dataListen.chatID+'" data-sATypeID="'+dataListen.sATypeID+'" onClick="deleteChat(this)"></div>';
                chatResult +='<div class="time-me-chated">'+getChatDate+'</div>';
                chatResult +='<div class="bubble-me-chated"><img src="assets/image/9-Patch/bubble_me_header.png"></div>';
                chatResult +='<div class="sms-me-content">'+dataListen.content+'</div>';
                chatResult +='</div>';
                break;
            case 3:

                chatResult +='<div class="list-sms-body" id="fadeOut_'+dataListen.chatID+'">';
                chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-groupID="'+dataListen.groupID+'" data-isGroup="'+dataListen.isGroup+'" data-toID="'+dataListen.groupID+'" data-chatID="'+dataListen.chatID+'" data-sATypeID="'+dataListen.sATypeID+'" onClick="deleteChat(this)"></div>';
                chatResult +='<div class="time-me-chated">'+getChatDate+'</div><div class="bubble-me-chated"><img src="assets/image/9-Patch/bubble_me_header.png"></div>';
                chatResult +='<div class="sms-me-content"><img src="assets/image/sticker/ant/'+dataListen.content+'"></div>';
                chatResult +='</div>';

                break;

            case 4:

                if(dataListen.fileInfo[0].mimeType == 'jpg' || dataListen.fileInfo[0].mimeType=='png' || dataListen.fileInfo[0].mimeType=='gif' || dataListen.fileInfo[0].mimeType=='PNG' || dataListen.fileInfo[0].mimeType=='BMP') {
                    //Send image file
                    chatResult +='<div class="list-sms-body" id="fadeOut_'+dataListen.chatID+'">';
                    chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-groupID="'+dataListen.groupID+'" data-isGroup="'+dataListen.isGroup+'" data-toID="'+dataListen.friendID+'" data-chatID="'+dataListen.chatID+'" data-sATypeID="'+dataListen.sATypeID+'" onClick="deleteChat(this)"></div>';
                    chatResult +='<div class="time-me-chated">'+getChatDate+'</div>';
                    chatResult +='<div class="bubble-me-chated"><img src="assets/image/9-Patch/bubble_me_header.png"></div>';
                    chatResult +='<div class="sms-me-content"><a href="#"><img src="'+dataListen.fileInfo[0].fileUrl+'"></a></div>';
                    chatResult +='</div>';
                }else{
                    //Send text file
                    var fileContent = '';
                    fileContent +='<div class="main-view-background">';
                    fileContent +='<div class="file-name">'+dataListen.fileInfo[0].fileName+'</div><a href="'+dataListen.fileInfo[0].fileUrl+'"><div class="view-file-background"><img src="assets/image/Profile/save_01.png"></div></a>';
                    fileContent +='</div>';
                    chatResult +='<div class="list-sms-body" id="fadeOut_'+dataListen.chatID+'">';
                    chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-groupID="'+dataListen.groupID+'" data-isGroup="'+dataListen.isGroup+'" data-toID="'+dataListen.friendID+'" data-chatID="'+dataListen.chatID+'" data-sATypeID="'+dataListen.sATypeID+'" onClick="deleteChat(this)"></div>';
                    chatResult +='<div class="time-me-chated">'+getChatDate+'</div>';
                    chatResult +='<div class="bubble-me-chated"><img src="assets/image/9-Patch/bubble_me_header.png"></div>';
                    chatResult +='<div class="sms-me-content">'+fileContent+'</div>';
                    chatResult +='</div>';
                }

                break;

            default :

                break;
        }

        $('#msgResult_'+dataListen.groupID).append(chatResult);
        //scroll messages to bottom of page
        var itemContainer = $("#msgResult_"+dataListen.groupID);
        var scrollTo_int = itemContainer.prop('scrollHeight') + 'px';
        itemContainer.slimScroll({
            scrollTo : scrollTo_int,
            height:'97%',
            start: 'bottom',
            alwaysVisible: true
        });

    });

}

var getGroupChatById = function(groupId,func_callBack){
    var datas = {
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
                "GroupID" : groupId
            }
        }
    }

    socketIoCon.emit('getGroupChatById',JSON.stringify(datas));
    socketIoCon.removeAllListeners('getGroupChatById-result');
    socketIoCon.on('getGroupChatById-result',function(result){
       var obj = JSON.parse(result);
        var useData = JSON.parse(obj.Body.Data);
        if(useData.Code ==1){
            func_callBack(useData.data);
        }
    });


}

var func_addContactToGroupChat = function(ToID,FriendID,SATypeID,GroupName,func_callBack){
    var datas = {
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
                "ToID" : ToID,
                "FriendID" : FriendID,
                "SATypeID" : SATypeID,
                "GroupName" : GroupName
            }
        }
    }

    func_callBack();

};

/* ------------- Send stickers -------------*/
var func_sentSticker = function(filename){
    var friendId = localStorage['friendId'];
    var filenames = filename.getAttribute("data-filename");
    var getChatType = filename.getAttribute("data-chatType");
    if(getChatType != 'GroupChat'){
        appendSmsToScreenAndAddPrivateChat(friendId,1,3,'','',filenames);
    }else{
        appendSmsToScreenAndAddChatToGroupChat(friendId,filenames,3,filenames,'','','','','','','','','','');
    }

}

/*-----------------------Group Chat Function --------------------*/
var func_createGroupChat = function(GTypeID,GroupName,GroupAvatar,MemberID,func_callback){
    console.log(GroupName+' is group');
    var gchat ={
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
                "GTypeID" : GTypeID,
                "GroupName" : GroupName,
                "GroupAvatar" : GroupAvatar,
                "MemberID" : MemberID
            }
        }
    }
    socketIoCon.emit('createGroupChat',JSON.stringify(gchat));
    socketIoCon.removeAllListeners('createGroupChat-result');
    socketIoCon.on('createGroupChat-result',function(result){
        var json = JSON.parse(result);
        var obj = JSON.parse(json.Body.Data);
        console.log(obj);
            func_callback(obj);
    });

}// end function create group chat

var addContactToGroupChat = function(GroupID,FriendID){
    var datas ={
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
                "FriendID" : FriendID,
                "GroupID" : GroupID,
                "ListFriend" : '',
                "Option" : ''
            }
        }
    }


    console.log(FriendID);
    socketIoCon.emit('addContactToGroupChat',JSON.stringify(datas));
    socketIoCon.removeAllListeners('addContactToGroupChat-result');
    socketIoCon.on('addContactToGroupChat-result',function(result){
        console.log(result);
    });
}

/*----------------Initializing Tab Chat------------------------*/
var func_addTab = function(str_title,friendId,sourceFriendID,eventLoad,func_type,SIPUser,socialTypeID){
    var tabIndex = localStorage.getItem('tabIndex');
    var title = $('#jqxTabs').jqxTabs('getTitleAt',tabIndex);
    var selectedTabIndex = ($('#jqxTabs').jqxTabs('selectedItem'));
    var length = $('#jqxTabs').jqxTabs('length');
    $('#jqxTabs').jqxTabs({ scrollPosition:'both'});
    var url = '/chat/chats/';
    var lc_tabtitle = localStorage.getItem('tabtile');
    var json_tabTitle = {"data":[{"title":str_title,"friendId":friendId,"sourceFriendID":sourceFriendID,"chatType":func_type,"SIPUser":SIPUser,"socialTypeID":socialTypeID}]};

    // --------------------reload page if tab existed------------------------------
    if(eventLoad && eventLoad == 'loadingTab'){
        var objLoad = JSON.parse(lc_tabtitle);
        var currentFriendId;
        var local_friendId = localStorage.getItem('friendId');
        if(objLoad != null){
            var idx = 1;
            $.each(objLoad.data, function (index, value) {
                if(value.friendId == local_friendId){
                    currentFriendId = value.friendId;
                    tabAjaxDataLoading(url, 'jqxTabs', value.title, idx,value.friendId,value.chatType,value.SIPUser,value.socialTypeID);
                    $('#jqxTabs').jqxTabs('addLast',value.title,'');
                    if(value.chatType == 'GroupChat'){
                        getGroupChatById(value.friendId,function(result){
                            func_viewGroupById(result,'results-div-Group');
                        });
                        getChatFromGroupChat(value.friendId,'','');
                    }else{
                        getChatFromPrivateChat(currentFriendId,value.socialTypeID);
                    }

                }else{
                    tabAjaxDataLoading(url, 'jqxTabs', value.title, idx,value.friendId,value.chatType,value.SIPUser,value.socialTypeID);
                    $('#jqxTabs').jqxTabs('addLast',value.title,'');//Add tab title
                }
                idx++;
            });
            $('#jqxTabs').jqxTabs({ selectedItem: tabIndex });
        }

    }else{
        /*----------- set tab sotrage------------*/
        localStorage.setItem('friendId',friendId);
        if(lc_tabtitle == null){
            localStorage.setItem('tabIndex',length);
            localStorage.setItem('tabtile',JSON.stringify(json_tabTitle));
            tabAjaxDataLoading(url, 'jqxTabs', str_title, parseInt(length),friendId,func_type,SIPUser,socialTypeID);
            $('#jqxTabs').jqxTabs('addLast',str_title,'');//Add tab title
            $('#jqxTabs').jqxTabs('select',existTabIndex);
            localStorage.setItem('tabIndex',existTabIndex);
            if(func_type && func_type =="GroupChat"){
                getGroupChatById(friendId,function(result){
                    func_viewGroupById(result,'results-div-Group');
                });
                getChatFromGroupChat(friendId,'','');
            }else{
                getChatFromPrivateChat(friendId,socialTypeID);
            }
        }else{
            var objArray = JSON.parse(lc_tabtitle);
            var title_checker = true;
            var existTabIndex = -1;
            $.each(objArray.data, function (index, value) {
                if(localStorage['friendId'] == value.friendId){
                    existTabIndex = index + 1;
                    title_checker = false;
                    return false;
                }
            });
            //if tab exited, we selected existed tab
            if(existTabIndex!= -1){
                $('#jqxTabs').jqxTabs('select',existTabIndex);
                localStorage.setItem('tabIndex',existTabIndex);
                if(func_type && func_type =="GroupChat"){
                    getGroupChatById(friendId,function(result){
                        func_viewGroupById(result,'results-div-Group');
                    });
                    getChatFromGroupChat(friendId,'','');
                }else{
                    getChatFromPrivateChat(friendId,socialTypeID);
                }
                return false;
            }
            if(title_checker == true ) {
                localStorage.setItem('tabIndex',length);
                tabAjaxDataLoading(url, 'jqxTabs', str_title, parseInt(length),friendId,func_type,SIPUser,socialTypeID);
                $('#jqxTabs').jqxTabs('addLast',str_title,'');//Add tab title
                if(func_type && func_type =="GroupChat"){
                    getChatFromGroupChat(friendId,'','');
                    getGroupChatById(friendId,function(result){
                        func_viewGroupById(result,'results-div-Group');
                    });
                }else{
                    getChatFromPrivateChat(friendId,socialTypeID);
                }
                objArray.data[objArray.data.length] = {"title":str_title,"friendId":friendId,"sourceFriendID":sourceFriendID,"chatType":func_type,"SIPUser":SIPUser,"socialTypeID":socialTypeID};
                localStorage.setItem('tabtile',JSON.stringify(objArray));
            }
        }
    }

}//End add New Tab

var func_TabClick = function(){
    $('#jqxTabs').on('tabclick', function (event) {
        var clickedItem = event.args.item;
        var tabTitle = $(this).jqxTabs('getTitleAt',event.args.item);
        var localTabTitle = localStorage.getItem('tabtile');
        localStorage.setItem('tabIndex',clickedItem);
        if(localTabTitle != null){
            var obArray = JSON.parse(localTabTitle);
            var allFriends = JSON.parse(localStorage.getItem('allFriends'));
            var allGroupMembers = JSON.parse(localStorage.getItem('allGroupMembers'));
            $.each(obArray.data,function(index,value){
                if(value.title == tabTitle){
                    localStorage.setItem('friendId',value.friendId);
                    getChatFromPrivateChat(value.friendId,value.socialTypeID);

                    // ---------------------- private chat notifications ---------------
                    $.each(allFriends,function(k,v){
                        if(value.friendId == v.FriendID){
                            markReadPrivateChat(value.friendId,v.SocialAccountTypeID);
                            //obArray.data[index].title = func_DefaultName(v.DisplayName,'',',');
                            //localStorage.setItem('tabtile',JSON.stringify(obArray));
                            //$("#jqxTabs").jqxTabs('setTitleAt', index+1,func_DefaultName(v.DisplayName,'',','));
                        }
                    });
                    if(value.chatType =="GroupChat"){
                        getChatFromGroupChat(value.friendId,'','',function(){
                            var id = localStorage.getItem('friendId');
                            var lw = $('.add_'+id).width();
                            var w = $('#main-chat-body_'+id).width();
                            if(w != null){
                                if(w >800){
                                    $('#main-chat-body_'+id).width(w-lw-2);
                                }

                                $('.add_'+id).fadeIn();
                            }


                        });
                        getGroupChatById(value.friendId,function(result){
                            func_viewGroupById(result,'results-div-Group');
                        });
                        // ------------------ group chat notifications---------------------
                        $.each(allGroupMembers.data,function(gKey,gData){
                            if(gData.groupID == value.friendId){
                                markReadGroupChat(gData.groupID);
                                //obArray.data[index].title = func_DefaultName(gData.groupName,'',',');
                                //localStorage.setItem('tabtile',JSON.stringify(obArray));
                                //$("#jqxTabs").jqxTabs('setTitleAt', index+1,func_DefaultName(gData.groupName,'',','));
                            }
                        });
                    }else{
                        getChatFromPrivateChat(value.friendId,value.socialTypeID);
                    }
                }
            });
        }
    });
}

var func_TabRemove = function(){
    $('#jqxTabs').on('removed',function(event){
        var clickedItem = event.args.item;
        var titleExisted = localStorage.getItem('tabtile');//get cookie name
        if(titleExisted != '' && titleExisted != null){
            var objArray = JSON.parse(titleExisted);
        }
        var idx=0;
        var getCloseTabTitle = event.args.title;

        $.each(objArray.data, function (index, value) {
            if(value.title == getCloseTabTitle){
                objArray.data.splice(idx ,1);
                localStorage.setItem("tabtile", JSON.stringify(objArray));
            }
            idx++;
        });
    });
}

var sendTextChat = function(data){
    var friendId = data.getAttribute('data-friendID');
    var textChat = $('input#message_'+friendId).val();
    var data_chatType =  data.getAttribute('data-chattype');
    var socialTypeID = data.getAttribute('data-socialTypeID');
    if(data_chatType == "GroupChat"){
        appendSmsToScreenAndAddChatToGroupChat(friendId,textChat,1,'','','','','','','','','','')
    }else{
        appendSmsToScreenAndAddPrivateChat(friendId,socialTypeID,1,'','',textChat);
    }

    var itemContainer = $("#msgResult_"+friendId);
    var scrollTo = itemContainer.prop('scrollHeight') + 'px';
    itemContainer.slimScroll({
        scrollTo : scrollTo,
        height:'98%',
        start: 'bottom'
    });
    $('input#message_'+friendId).val('');
}

var sendFile = function(data){
    var friendId = data.getAttribute('data-friendID');
    var data_chatType =  data.getAttribute('data-chatType');
    var socialTypeID = data.getAttribute('data-socialTypeID');
    getAWSToken(function(usageData){
        var AccessKeyId = usageData.data.AccessKeyId;
        var SecretAccessKey = usageData.data.SecretAccessKey;
        var SessionToken = usageData.data.SessionToken;
        var userId = localStorage['user_id'];
        $('#sendFileForm_'+friendId).ajaxForm({
            url:basePath + '/chat/saveFileSended',
            data:{friendId:friendId,AccessKeyId:AccessKeyId,SecretAccessKey:SecretAccessKey,SessionToken:SessionToken,userId:userId},
            success:function(response) {
                if(response){
                    var file = $('#file_'+friendId)[0].files[0];
                    var textChatForChat = file.name;
                    var FileName = file.name;
                    var fileExtension = file.type;
                    var file_ext = file.name.split('.').pop();
                    if(data_chatType == "GroupChat"){
                        appendSmsToScreenAndAddChatToGroupChat(friendId,textChatForChat,4,FileName,10,'',file_ext,'','','','','','','')
                    }else{
                        appendSmsToScreenAndAddPrivateChat(friendId,socialTypeID,4,FileName,file_ext);
                    }

                }
            }
        }).submit();
    });

}

var func_showGroupUI = function(userID){

    var getID = userID.getAttribute('data-addG');
    var userID = localStorage.getItem('friendId');
    var chatWid = $('#main-chat-body_'+userID).width();
    var addChat = $('.'+getID).width();
    if(chatWid >800){
        var newWd = chatWid - addChat - 2;
        $('.'+getID).fadeIn();
    }else{
        var newWd = chatWid + addChat + 2;
        $('.'+getID).fadeOut();
    }

    $('#main-chat-body_'+userID).width(newWd);


}

var func_ShowForm = function(current){
    var userAct = current.getAttribute('data-act');
    var getresult = current.getAttribute('data-result');
    if(userAct =='LoadGMember'){
        $("#"+getresult).fadeToggle(300,'swing',function(){
        });
    }else{
        $("#"+getresult).fadeToggle();
    }

    return false;
}

var searchContact = function(data){
    var friendId = data.getAttribute('data-friendID');
    var txtSearch = $('#search-friend'+friendId).val();
    searchFriendToAddChat(txtSearch,function(result){
        func_viewFriendSearch(result,'results-div'+friendId);
        var height = $( "#div-box-left" ).height() -305;
        $('#results-div'+friendId).slimscroll({
            position: 'right',
            height: height,
            size:'1px',
            alwaysVisible:false
        });
    });
}



