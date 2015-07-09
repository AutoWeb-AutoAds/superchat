var unreadChat = function(ToID,SATypeID,callback){
    var unreadData = {
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
                "SATypeID" : SATypeID
            }
        }
    }
    socketIoCon.emit('unreadChat',JSON.stringify(unreadData));
    socketIoCon.removeAllListeners('unreadChat-result');
    socketIoCon.on('unreadChat-result',function(result){
        var json = JSON.parse(result);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            callback(obj);
        }
    });
}

var unreadGroupChat = function(groupID,callback){
    var unreadGroupChat = {
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
    socketIoCon.emit('unreadChatGroupChat',JSON.stringify(unreadGroupChat));
    socketIoCon.removeAllListeners('unreadChatGroupChat-result');
    socketIoCon.on('unreadChatGroupChat-result',function(result){
        var json = JSON.parse(result);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            callback(obj);
        }
    });
}

var markReadPrivateChat = function(fromID,socialTypeID){
    var markRead = {
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
                "ToID" : fromID,
                "AccessKey" : localStorage['access_key'],
                "SATypeID" : socialTypeID
            }
        }
    }

    socketIoCon.emit('markReadPrivateChat',JSON.stringify(markRead));
    socketIoCon.removeAllListeners('markReadPrivateChat-result');
    socketIoCon.on('markReadPrivateChat-result',function(result){
        var json = JSON.parse(result);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            $('#private-chat-notify_'+fromID).html('');
            $('#private-chat-time_'+fromID).html('');
        }
    });
}

var markReadGroupChat = function(groupID){
    var markReadGroupChat = {
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
    socketIoCon.emit('markReadGroupChat',JSON.stringify(markReadGroupChat));
    socketIoCon.removeAllListeners('markReadGroupChat-result');
    socketIoCon.on('markReadGroupChat-result',function(result){
        var json = JSON.parse(result);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            $('#group-chat-notify_'+groupID).html('');
            $('#group-chat-time_'+groupID).html('');
        }
    });
}

var getUnreadChatNotification = function(fromID,socialTypeID,tabTitle){
    var jsTabTitle = JSON.parse(localStorage.getItem('tabtile'));
    var d = new Date();
    var notificationDate = d.toLocaleTimeString();
    var time = notificationDate.split(':');
    var isAM = time[2].split(' ');
    var currentTime = time[0]+':'+time[1]+' '+isAM[1];
    if(jsTabTitle == null || jsTabTitle.data == ''){
        unreadChat(fromID,socialTypeID,function(result){
            $('#private-chat-notify_'+fromID).html('<div class="contact-badge">'+result.data.length+'</div>');
            $('#private-chat-time_'+fromID).html(currentTime);
        });
        unreadGroupChat(fromID,function(groupChatData){
            $('#group-chat-notify_'+fromID).html('<div class="contact-badge">'+groupChatData.data.length+'</div>');
            $('#group-chat-time_'+fromID).html(currentTime);
        });
        return false;
    }
    if(localStorage['friendId'] == fromID){
        var tempTitle = '';
        $.each(jsTabTitle.data,function(key,v){
            if(fromID == v.friendId){
                tempTitle = v.title;
                if(tabTitle != ''){
                    tempTitle = tabTitle;
                }
                //$("#jqxTabs").jqxTabs('setTitleAt', key+1,tempTitle);
                //jsTabTitle.data[key].title = tempTitle;
                //localStorage.setItem('tabtile',JSON.stringify(jsTabTitle));
            }
        });
        markReadPrivateChat(fromID,socialTypeID);
        markReadGroupChat(fromID);
    }else{
        // ----------------------- Private chat notifications -------------------
        unreadChat(fromID,socialTypeID,function(result){
            var unreadCount = result.data.length;
            var notification = '<div class="contact-badge">'+unreadCount+'</div>';
            //$.each(jsTabTitle.data,function(key,value){
            //    if(fromID == value.friendId && value.chatType == 'chat'){
            //        if(unreadCount){
            //            var locAllFriends = JSON.parse(localStorage.getItem('allFriends'));
            //            $.each(locAllFriends,function(k,vv){
            //                if(fromID == vv.FriendID){
            //                    jsTabTitle.data[key].title = vv.DisplayName+' '+unreadCount;
            //                    localStorage.setItem('tabtile',JSON.stringify(jsTabTitle));
            //                }
            //            });
            //            $("#jqxTabs").jqxTabs('setTitleAt', key+1, value.title);
            //        }
            //    }
            //});
            $('#private-chat-notify_'+fromID).html(notification);
            $('#private-chat-time_'+fromID).html(currentTime);
        });

        //--------------------------group chat notification------------------------
        unreadGroupChat(fromID,function(groupChatData){
            var groupChatNotificationNum = '<div class="contact-badge">'+groupChatData.data.length+'</div>';
            $.each(jsTabTitle.data,function(key,vv){
                if(fromID == vv.friendId && vv.chatType == 'GroupChat'){
                    if(groupChatNotificationNum){
                        var allGroupMembers = JSON.parse(localStorage.getItem('allGroupMembers'));
                        $.each(allGroupMembers.data,function(gIndex,gData){
                            //if(fromID == gData.groupID){
                            //    jsTabTitle.data[key].title = gData.groupName+' '+groupChatData.data.length;
                            //    localStorage.setItem('tabtile',JSON.stringify(jsTabTitle));
                            //}
                        });
                        //$("#jqxTabs").jqxTabs('setTitleAt', key+1, vv.title);
                    }
                }
            });
            $('#group-chat-notify_'+fromID).html(groupChatNotificationNum);
            $('#group-chat-time_'+fromID).html(currentTime);
        });
    }
}

var viewChatNotifications = function(){
    var getAllFriends = JSON.parse(localStorage.getItem('allFriends'));
    var groupChatMembers = JSON.parse(localStorage.getItem('allGroupMembers'));
    if(getAllFriends != null){
        $.each(getAllFriends,function(indx,v){
            unreadChat(v.FriendID, v.SocialAccountTypeID,function(obj){
                $.each(obj.data,function(k,vl){
                    var chatedDate = vl.chattedDate;
                    var time = chatedDate.split(' ');
                    var currentTime = time[1].split(':');
                    $('#private-chat-notify_'+ vl.fromID).html('<div class="contact-badge">'+obj.data.length+'</div>');
                    $('#private-chat-time_'+ vl.fromID).html(currentTime[0]+':'+currentTime[1]);
                });
            });
        });
    }
    if(groupChatMembers != null){
        $.each(groupChatMembers.data,function(gInd,gVal){
            unreadGroupChat(gVal.groupID,function(groupData){
                $.each(groupData.data,function(kk,value){
                    if(value.content != ''){
                        var chatedDate = value.chattedDate;
                        var time = chatedDate.split(' ');
                        var currentTime = time[1].split(':');
                        $('#group-chat-notify_'+value.groupID).html('<div class="contact-badge">'+groupData.data.length+'</div>');
                        $('#group-chat-time_'+value.groupID).html(currentTime[0]+':'+currentTime[1]);
                    }
                });
            });
        });
    }
}

var getFriendRequests = function(){
    var input = {
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
                "Limit" : "",
                "Offset" : ""
            }
        }
    }

    socketIoCon.emit('getFriendRequest', JSON.stringify(input));
    socketIoCon.on('getFriendRequest-result', function (getFriend) {
        func_viewNotification(getFriend,'div-notification-result');
    });

}

var addPrivateChat = function(listenData){
    var chatNotification = '';
    var chatTypeID = listenData.chatTypeID;
    var imageAvatar = listenData.imageAvatar != '' ? '<img src="'+listenData.imageAvatar+'">':'<img src="assets/image/icons/defaultImg.gif">';
    var d = new Date();
    var getChatDate = d.toLocaleTimeString();
    $.titleAlert(listenData.displayName+' messaged you...',{stopOnFocus:true});
    $('<audio class="private-chat-audio"><source src="assets/sound/job-done.mp3" type="audio/mpeg"></audio>').appendTo('body');
    $('.private-chat-audio')[0].play();
    getUnreadChatNotification(listenData.fromID,listenData.sATypeID,listenData.displayName);
    switch (chatTypeID){
        case 1:
            //get plain text notification
            chatNotification +='<div class="list-sms-body">';
            chatNotification +='<div class="friend-name">'+listenData.fromUserName+'</div>';
            chatNotification +='<div class="imgAvatar-friend">'+imageAvatar+'</div>';
            chatNotification +='<div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
            chatNotification +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" title=""></div>';
            chatNotification +='<div class="sms-content">'+listenData.content+'<br></div>';
            chatNotification +='<div class="time-chated">'+getChatDate+'</div>';
            chatNotification +='<div class="social-con_active"><img src="assets/image/Chats/app_messenger_09.png"> </div>';
            chatNotification +='</div>';
            break;
        case 3:
            //get sticker notification
            chatNotification +='<div class="list-sms-body">';
            chatNotification +='<div class="friend-name">'+listenData.fromUserName+'</div>';
            chatNotification +='<div class="imgAvatar-friend">'+imageAvatar+'</div><div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
            chatNotification +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16"></div>';
            chatNotification +='<div class="sms-content"><img src="assets/image/sticker/ant/'+listenData.content+'"><br></div>';
            chatNotification +='<div class="time-chated">'+getChatDate+'</div>';
            chatNotification +='<div class="social-con_active"><img src="assets/image/Chats/app_messenger_09.png"></div>';
            chatNotification +='</div>';
            break;
        case 4:
            //get text file or image notification
            if(listenData.fileInfo[0].mimeType == 'jpg'||listenData.fileInfo[0].mimeType=='png'||listenData.fileInfo[0].mimeType=='PNG'||listenData.fileInfo[0].mimeType=='gif'||listenData.fileInfo[0].mimeType=='jpeg'||listenData.fileInfo[0].mimeType=='bmp') {
                //get image notification
                chatNotification +='<div class="list-sms-body">';
                chatNotification +='<div class="friend-name">'+listenData.fromUserName+'</div>';
                chatNotification +='<div class="imgAvatar-friend">' + imageAvatar + '</div><div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
                chatNotification +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16"></div>';
                chatNotification +='<div class="sms-content"><img src="'+listenData.fileInfo[0].fileUrl+'"><br></div>';
                chatNotification +='<div class="time-chated">'+getChatDate+'</div>';
                chatNotification +='<div class="social-con_active"><img src="assets/image/Chats/app_messenger_09.png"></div>';
                chatNotification +='</div>';
            }else{
                //get text file notification
                var fileContent = '';
                fileContent +='<div class="main-view-background">';
                fileContent +='<a href="'+listenData.fileInfo[0].fileUrl+'"><div class="view-file-background"><img src="assets/image/Profile/save_01.png"></div></a>';
                fileContent +='<div class="file-name">'+listenData.fileInfo[0].fileName+'</div>';
                fileContent +='</div>';
                chatNotification +='<div class="list-sms-body">';
                chatNotification +='<div class="friend-name">'+listenData.fromUserName+'</div>';
                chatNotification +='<div class="imgAvatar-friend">'+imageAvatar+'</div><div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
                chatNotification +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16"></div>';
                chatNotification +='<div class="sms-content">'+fileContent+'<br></div>';
                chatNotification +='<div class="time-chated">'+getChatDate+'</div>';
                chatNotification +='<div class="social-con_active"><img src="assets/image/Chats/app_messenger_09.png"></div>';
                chatNotification +='</div>';

            }
            break;
    }
    $('#msgResult_'+listenData.fromUserID).append(chatNotification);
    //scroll messages to bottom of page
    var itemContainer = $("#msgResult_"+listenData.fromUserID);
    var scrollTo_int = itemContainer.prop('scrollHeight') + 'px';
    itemContainer.slimScroll({
        scrollTo : scrollTo_int,
        height:'97%',
        start: 'bottom',
        alwaysVisible: true
    });
}

var getPrivateChats = function(listenData,friendId){
    var chatResult = '';
    $('#msgResult_'+friendId).html('');
    $.each(listenData, function (index, value) {
        var chattedDate = value.chattedDate.split(" ");
        var getChatDate = chattedDate[1];
        var defaultImg = 'http://54.88.49.6/superchat-local/image/convert_image?UserID='+value.friendID+'&FileWidth=25&FileHeight=25';
        var imageAvatar = '';
        if(value.imageAvatar!=''){
            if(value.sATypeID == 8){
                imageAvatar = defaultImg;
            }else{
                imageAvatar = value.imageAvatar;
            }

        }else{
            imageAvatar = defaultImg;
        }
        var chatTypeID = value.chatTypeID;
        if(value.fromID == localStorage['user_id']){
            // ----------------------- sender block ------------------------------
            switch (chatTypeID){
                case 1://Send plain text
                    chatResult +='<div class="list-sms-body" id="fadeOut_'+value.chatID+'">';
                    chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-toID="'+value.friendID+'" data-chatID="'+value.chatID+'" data-sATypeID="'+value.sATypeID+'" data-isGroup="'+value.isGroup+'" onClick="deleteChat(this)"></div>';
                    chatResult +='<div class="time-me-chated">'+getChatDate+'</div>';
                    chatResult +='<div class="bubble-me-chated"><img src="assets/image/9-Patch/bubble_me_header.png"></div>';
                    chatResult +='<div class="sms-me-content">'+value.content+'</div>';
                    chatResult +='</div>';
                    break;
                case 3://Send sticker
                    chatResult +='<div class="list-sms-body" id="fadeOut_'+value.chatID+'">';
                    chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-toID="'+value.friendID+'" data-chatID="'+value.chatID+'" data-sATypeID="'+value.sATypeID+'" data-isGroup="'+value.isGroup+'" onClick="deleteChat(this)"></div>';
                    chatResult +='<div class="time-me-chated">'+getChatDate+'</div><div class="bubble-me-chated"><img src="assets/image/9-Patch/bubble_me_header.png"></div>';
                    chatResult +='<div class="sms-me-content"><img src="assets/image/sticker/ant/'+value.content+'"></div>';
                    chatResult +='</div>';
                    break;
                case 4://Send text file or image
                    if(value.fileInfo[0].mimeType == 'jpg' || value.fileInfo[0].mimeType=='png' || value.fileInfo[0].mimeType=='gif' || value.fileInfo[0].mimeType=='PNG' || value.fileInfo[0].mimeType=='BMP') {
                        //Send image file
                        chatResult +='<div class="list-sms-body" id="fadeOut_'+value.chatID+'">';
                        chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-isGroup="'+value.isGroup+'" data-toID="'+value.friendID+'" data-chatID="'+value.chatID+'" data-sATypeID="'+value.sATypeID+'" onClick="deleteChat(this)"></div>';
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
                        chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-isGroup="'+value.isGroup+'" data-toID="'+value.friendID+'" data-chatID="'+value.chatID+'" data-sATypeID="'+value.sATypeID+'" onClick="deleteChat(this)"></div>';
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
                    chatResult +='<div class="friend-name">'+value.friendName+'</div>';
                    chatResult +='<div class="imgAvatar-friend"><img src="'+imageAvatar+'" class="img-circle" width="25" height="25"></div>';
                    chatResult +='<div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
                    chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-isGroup="'+value.isGroup+'" data-toID="'+value.friendID+'" data-chatID="'+value.chatID+'" data-sATypeID="'+value.sATypeID+'" onClick="deleteChat(this)"></div>';
                    chatResult +='<div class="sms-content">'+value.content+'<br></div><div class="time-chated">'+getChatDate+'</div>';
                    chatResult +='<div class="social-con_active"><img src="assets/image/Chats/app_messenger_09.png"> </div>';
                    chatResult +='</div>';
                    break;
                case 3://Send sticker
                    chatResult +='<div class="list-sms-body" id="fadeOut_'+value.chatID+'">';
                    chatResult +='<div class="friend-name">'+value.friendName+'</div>';
                    chatResult +='<div class="imgAvatar-friend"><img src="'+imageAvatar+'" class="img-circle" width="25" height="25"></div>';
                    chatResult +='<div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
                    chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-isGroup="'+value.isGroup+'" data-toID="'+value.friendID+'" data-chatID="'+value.chatID+'" data-sATypeID="'+value.sATypeID+'" onClick="deleteChat(this)"></div>';
                    chatResult +='<div class="sms-content"><img src="assets/image/sticker/ant/'+value.content+'"><br></div><div class="time-chated">'+getChatDate+'</div>';
                    chatResult +='<div class="social-con_active"><img src="assets/image/Chats/app_messenger_09.png"></div>';
                    chatResult +='</div>';
                    break;
                case 4://Send text file or image
                    if(value.fileInfo[0].mimeType == 'jpg'||value.fileInfo[0].mimeType=='png'||value.fileInfo[0].mimeType=='gif'||value.fileInfo[0].mimeType=='PNG'||value.fileInfo[0].mimeType=='JPEG') {
                        //Send image
                        chatResult +='<div class="list-sms-body" id="fadeOut_'+value.chatID+'">';
                        chatResult +='<div class="friend-name">'+value.friendName+'</div>';
                        chatResult +='<div class="imgAvatar-friend"><img src="'+imageAvatar+'" class="img-circle" width="25" height="25"></div>';
                        chatResult +='<div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
                        chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-isGroup="'+value.isGroup+'" data-toID="'+value.friendID+'" data-chatID="'+value.chatID+'" data-sATypeID="'+value.sATypeID+'" onClick="deleteChat(this)"></div>';
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
                        chatResult +='<div class="friend-name">'+value.friendName+'</div>';
                        chatResult +='<div class="imgAvatar-friend"><img src="'+imageAvatar+'" class="img-circle" width="25" height="25"></div>';
                        chatResult +='<div class="bubble-chat"><img src="assets/image/9-Patch/bubble_header.png"></div>';
                        chatResult +='<div class="delete-chat"><img src="assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" data-isGroup="'+value.isGroup+'" data-toID="'+value.friendID+'" data-chatID="'+value.chatID+'" data-sATypeID="'+value.sATypeID+'" onClick="deleteChat(this)"></div>';
                        chatResult +='<div class="sms-content">'+fileContent+'<br></div>';
                        chatResult +='<div class="time-chated">'+getChatDate+'</div><div class="social-con_active"><img src="assets/image/Chats/app_messenger_09.png"> </div>';
                        chatResult +='</div>';
                    }
                    break;
            }
        }
    });

    $('#msgResult_'+friendId).append(chatResult);
    var itemContainer = $("#msgResult_"+friendId);
    var scrollTo_int = itemContainer.prop('scrollHeight') + 'px';
    itemContainer.slimScroll({scrollTo : scrollTo_int, height:'97%', start: 'bottom', alwaysVisible: true});
}

var hasPresentChanged = function(listenData){
    console.log('has present changed');
}
var hasUnfriend = function(listenData){
    console.log('Unfriend');
}

var hasAddFriend = function(listenData){
    var result = '';
    var imageAvatar = 'http://54.88.49.6/superchat-local/image/convert_image?UserID='+listenData.FriendID+'&FileWidth=20&FileHeight=20';
    result +='<div class="div-noti-form" id="div-form-'+listenData.FriendID+'">';
    result +='<div class="div-noti-form-profile"><img src="'+imageAvatar+'" class="img-circle"></div>';
    result +='<div class="div-noti-form-name">';
    result +=listenData.DisplayName;
    result +='<br>Sent you a friend request';
    result +='</div>';
    result +='<div class="div-noti-form-conf">';
    result +='<div onclick="Func_Request(this)" data-act="Accept" data-friID="'+listenData.FriendID+'"><img src="/assets/image/Profile/check_01.png" class="img-circle conf" width="20" height="20"></div>';
    result +='<div class="check"  data-act="Cancel" onclick="Func_Request(this)" data-friID="'+listenData.FriendID+'"><img src="/assets/image/Profile/cancel_01.png" class="img-circle conf" width="20" height="20"></div>';
    result +='</div>';
    result +='</div>';
    $('#div-notification-result').append(result);
}

var cancelFriendRequest = function(FriendID){
    console.log(FriendID);
    var data ={
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
                "FriendID" : FriendID,
                "AccessKey" : localStorage['access_key']
            }
        }
    }
    socketIoCon.emit('cancelFriendRequest',JSON.stringify(data));
    socketIoCon.removeAllListeners('cancelFriendRequest-result');
    socketIoCon.on('cancelFriendRequest-result',function(result){
        console.log(result);
    });
}

var acceptFriendRequest = function(FriendID){
    console.log(FriendID);
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
                "FriendID" : FriendID,
                "AccessKey" : localStorage['access_key']
            }
        }
    }

    socketIoCon.emit('acceptFriendRequest',JSON.stringify(data));
    socketIoCon.removeAllListeners('acceptFriendRequest-result');
    socketIoCon.on('acceptFriendRequest-result',function(result){
        $('#div-form-'+FriendID).addClass('dis');
    });
}

var ignoreFriendRequest = function(FriendID){
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
                "FriendID" : FriendID,
                "AccessKey" : localStorage['access_key']
            }
        }
    }
    socketIoCon.emit('ignoreFriendRequest',JSON.stringify(data));
    socketIoCon.removeAllListeners('ignoreFriendRequest-result');
    socketIoCon.on('ignoreFriendRequest-result',function(respone){
        $('#div-form-'+FriendID).addClass('dis');
    });
}

var func_IntiCoview = function(response){
    console.log(response);
    var result = localStorage.getItem('allFriends');
    var usageData = JSON.parse(result);
    var senderID = response.cosyncData.cosyncData.SenderID;
    var GroupID= response.cosyncData.cosyncData.GroupID;
    var movieNmae = response.cosyncData.cosyncData.DisplayName;
    var SocialMediaTypeID = response.cosyncData.cosyncData.SocialMediaTypeID;
    var url = response.cosyncData.cosyncData.Video[2].url;

    $.each(usageData,function(index,value){

        if(value.FriendID == senderID){
            var imageAvatar = value.ImageAvatar != '' ? value.ImageAvatar:'assets/image/icons/defaultImg.gif';
            var results = '';
            results +='<div class="div-noti-form cls-border-NA">';
            results +='<div data-senderID="'+senderID+'" data-GroupID="'+GroupID+'" data-DisplayName="'+value.DisplayName+'"  '+
            'data-ImageAvatar = "'+imageAvatar+'"  onclick="acceptCoInvite(this)" data-url="'+url+'" data-SocialMediaTypeID="'+SocialMediaTypeID+'" data-Chanel="'+movieNmae+'" '+
            '>';
            results +='<div class="div-noti-form-profile"><img src="'+imageAvatar+'" class="img-circle"></div>';
            results +='<div class="div-noti-form-name">';
            results +=value.DisplayName+' invited you to see ' +movieNmae;
            results +='</div>';
            results +='</div>';
            results += '<image src="/assets/jqx-lib/css/images/close.png" data-senderID="'+senderID+'" data-GroupID="'+GroupID+'" onclick="cencelCoView(this)" class="noti_close">';
            results +='</div>';
            $('#msg_notifi').html(results);
            $('#messageNotification').jqxNotification({ showCloseButton: false });
            $("#messageNotification").jqxNotification("open");
        }

    });


}
