/**
 * Created by Borama003 on 5/11/2015.
 */
/*--------------Search Friend-------------------------*/
var searchFriendToAddChat = function (ConnectionName,func_callback){

    var searchData = {
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
                "ConnectionName" : ConnectionName
            }
        }
    }

    socketIoCon.emit('searchFriend',JSON.stringify(searchData));
    socketIoCon.removeAllListeners('searchFriend-result');
    socketIoCon.on('searchFriend-result',function(result){
        var oj = JSON.parse(result);
        var obj = oj.Body.Data;
        func_callback(obj);
    });
}

var func_DefaultName =function(getName,con,where){
    if(con =='length'){
        getName = getName.substr(0,where);
        if(where < getName.length){
            getName = getName+'...';
        }
    }else{
        if(getName.indexOf(where) >0) {
            getName = getName.substr(0, getName.indexOf(where));
        }
        var ls = '';
        if(getName.length > 14){
            ls  = '...';
        }
        getName = getName.substr(0,12);
        getName += ls;
    }

    return getName;
}

var func_viewContact = function(result,divResult,func_callBack){
    var usageData = result.data;
    if(result.code == 1 ){
        localStorage.setItem('allFriends',JSON.stringify(usageData));
        var result = '';
        var fri_name = '';
        var socialTypeImg = '';
        $.each(usageData,function(index,value){
            var imageAvatar = '';
            var socialAccountID = '';
            var defaultImage = 'http://54.88.49.6/superchat-local/image/convert_image?UserID='+value.FriendID+'&FileWidth=40&FileHeight=40';
            var country = value.Country == undefined ? '' : value.Country;
            if(value.SocialAccountTypeID == 1){
                imageAvatar = value.ImageAvatar !='' ? value.ImageAvatar:defaultImage;
                socialAccountID = value.FriendID;
            }else{
                imageAvatar = value.SocialAvatar !='' ? value.SocialAvatar:defaultImage;
                var split = value.SocialAccountID.split('@');
                socialAccountID = split[0];
            }
            if(value.DisplayName != "" && value.DisplayName != null){
                fri_name = value.DisplayName;
            }else if(value.SocialAccountID !="" && value.SocialAccountID != null){
                fri_name = value.SocialAccountID;
            }else{
                fri_name = value.FirstName+ ' ' + value.LastName;
            }
            fri_name = func_DefaultName(fri_name,'',',');

            if(value.SocialAccountTypeID == 1){
                socialTypeImg = '<img src="assets/image/icons/sc_icon_72.png">';//supperchat
            }else if(value.SocialAccountTypeID == 2){
                socialTypeImg = '<img src="assets/image/icons/fb.png">';//facebook
            }else if(value.SocialAccountTypeID == 3){
                socialTypeImg = '';//twitter
            }else if(value.SocialAccountTypeID == 4){
                socialTypeImg = '<img src="assets/image/icons/g-pluse.png">';//gtalk
            }else if(value.SocialAccountTypeID == 5){
                socialTypeImg = '<img src="assets/image/icons/yahoo-messenger.png">';//yahoo
            }else if(value.SocialAccountTypeID == 8){
                socialTypeImg = '<img src="assets/image/icons/aim.png">';//aim
            }else if(value.SocialAccountTypeID == 11){
                socialTypeImg = '';//skype
            }else if(value.SocialAccountTypeID == 12){
                socialTypeImg = '<img src="assets/image/icons/icq.png">';//icq
            }

            result += '<div class="chat-contact-block" onclick="func_getTabtitle(this)" data-func_type="chat" data-title="'+fri_name+'" data-SIPUser="'+value.SIPUser+'" data-friendID="'+socialAccountID+'" data-socialAccountTypeID="'+value.SocialAccountTypeID+'">';
            result += '<div class="contact-img"><img src="'+imageAvatar+'" class="img-circle" width="40" height="40"></div>';
            result += '<div class="contact-name-info">';
            result += '<div class="contact-name">'+fri_name+'</div>';
            result += '<div class="contact-location">'+country+'</div>';
            result += '</div>';
            result += '<div class="contact-notification">';
            result += '<div class="social-type-img"><div>'+socialTypeImg+'</div><div id="private-chat-notify_'+socialAccountID+'"></div></div>';
            result += '</div>';
            result += '<div class="contact-chatted-time" id="private-chat-time_'+socialAccountID+'"></div>';
            result += '</div>';
        });
        if(func_callBack){
            func_callBack();
        }
        $('#'+divResult).html(result);
    }
}

var func_viewFriendSearch = function(result,divResult,types){

    var userData = JSON.parse(result);
    if(!types){types = 'one';}
    if(userData.code ==1){
        $('#'+divResult).addClass('add-contact-to-group');
        var numAddAll = 0;
        var results = '';
        var friendId_local = localStorage.getItem('friendId');
        var userIdArray = new Array();
        var isFriends = '';
//                    console.log(userData.data.SearchResult);
        $('#'+divResult).html("");
        $.each(userData.data.SearchResult, function (index, value) {
            var displayName = value.DisplayName;
            var imageAvatar = '<img src="' + value.ImageAvatar + '" alt="" class="imgProfile addImg">';
            var userId = value.FriendID;
            if(userId != friendId_local || types == 'all'){
                var connectionStatus = value.ConnectionStatus;
                var country = value.Country;
                var imgCheck = '<img src="assets/image/profile/contactProfile_invitationSent_x1.png" alt="" class="imgCheck" id="imgCheck'+userId+'">';
                if(value.ImageAvatar == '' || value.ImageAvatar == null){
                    imageAvatar = '<img src="assets/image/icons/defaultImg.gif" alt="" class="imgProfile addImg">';
                }

                isFriends = '<a href="javascript:void(0)" onclick="addContact(this)" data-userName="'+ displayName+'" data-userId="'+userId+'" id="id'+userId+'"><img src="assets/image/Sync/add_01.png"></a>';

                isFriends += '<a href="javascript:void(0)" class="de-active" onclick="subContact(this)" data-userName="'+ displayName+'" data-userId="'+userId+'" id="ch'+userId+'"><img src="assets/image/Sync/check_02.png"></a>';

                results +='<div class="friend-tr-block border-butt">';
                results +='<div class="fb-imageAvatar twt-feed">';
                results += '<a href="javascript:void(0)" onclick="addContact(this)"  data-action="addContact" data-Url="'+value.ImageAvatar+'" data-userName="'+ displayName+'" data-userId="'+userId+'">';
                results += imageAvatar ;
                results += '</a>';
                results += '<a href="javascript:void(0)" onclick="addContact(this)" data-action="subContact" data-userName="'+ displayName+'" data-userId="'+userId+'">';
                results += imgCheck;
                results += '</a>';
                results +='</div>';
                results +='<div class="fb-friends-name"><div>'+displayName+'</div><div class="location">'+country+'</div></div>';
                results +='<div class="fb-addFriend">'+isFriends+'</div>';
                results +='</div>';

            }

        });
        $('#div-add-result'+friendId_local).fadeIn();
        $('#div-add-result'+friendId_local).html('<div class="add-contact-add"><label>Add</label></div>');
        $('.jqx-tabs-content-element.jqx-rc-b').css({'overflow':'hidden'});
        var height = $( "#div-box-left" ).height() -425;

        $('#'+divResult).append(results);
        $('#loading-div').hide();
    }else{
        $("#"+divResult).html('<div id="search-not-found">Search not found, please try again!</div>');

    }
}

var getGroupChat = function(valLimit,valOffset,func_callback){
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
                "Limit" : "",
                "Offset" : ""
            }
        }
    }

    socketIoCon.emit('getGroupChat',JSON.stringify(datas));
    socketIoCon.removeAllListeners('getGroupChat-result');
    socketIoCon.on('getGroupChat-result',function(resutlt){
        var js = JSON.parse(resutlt);
        var useData = JSON.parse(js.Body.Data);
        if(useData.code == 1){

            func_callback(useData);
        }else{
            console.log('Error')
        }
    });
}

var func_viewGetGroupChat = function(results,divResult,func_callBack){
    //console.log(results);
    var usageData = results.data;
    var result = '';
    var fri_name = '';
    var socialType = '<img src="assets/image/icons/sc_icon_72.png">';
    $.each(usageData,function(index,value){
        var images = value.groupAvatar;
        var imageAvatar = (images != '')? images : 'assets/image/icons/defaultImg.gif';
        //fri_name = ;
        fri_name = func_DefaultName(value.groupName,'',',');
        var groupMember = value.memberInfo.length -1;
        result += '<div class="chat-contact-block" onclick="func_getTabtitle(this)" data-gmember="'+groupMember+'" data-func_type="GroupChat" data-title="'+fri_name+'" data-friendID="'+ value.groupID +'" data-socialAccountTypeID="'+value.gTypeID+'">';
        result += '<div class="contact-img"><img src="assets/image/Chats/recent_groupAvatar2_x1.png" class="img-circle1" width="40" height="40">';
        //console.log(value.memberInfo);
        $.each(value.memberInfo,function(key,vaules){
            if(key < 3){
                result += '<img src="http://54.88.49.6/superchat-local/image/convert_image?UserID='+vaules.GMemberID+'&FileWidth=18&FileHeight=18" width="18" height="18" class="img-circle groupImg'+key+'">';
            }
        });
        result += '</div>';
        result += '<div class="contact-name-info">';
        result += '<div class="contact-name">'+fri_name+'</div>';
        result += '<div class="contact-location"></div>';
        result += '</div>';
        result += '<div class="contact-notification">';
        result += '<div class="social-type-img"><div>'+socialType+'</div><div id="group-chat-notify_'+value.groupID+'"></div></div>';
        result += '</div>';
        result += '<div class="contact-chatted-time" id="group-chat-time_'+value.groupID+'"></div>';
        result += '</div>';
    });
    localStorage.setItem('allGroupMembers',JSON.stringify(results));
    $('#'+divResult).append(result);
    if(func_callBack){
        func_callBack();
    }

}

var getGroupChatById = function(GroupID,func_callBack){
    console.log(GroupID)
    var dataById = {
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
                "GroupID" : GroupID
            }
        }
    }
    socketIoCon.emit('getGroupChatById',JSON.stringify(dataById));
    socketIoCon.removeAllListeners('getGroupChatById-result');
    socketIoCon.on('getGroupChatById-result',function(result){
        var obj = JSON.parse(result);

        var usageData = JSON.parse(obj.Body.Data);

        if(func_callBack){
            func_callBack(usageData);
        }

    });
}

var func_viewGroupById = function(result,divResult){
    //console.log(result);
    if(result.code ==1){
        //console.log(divResult+''+result.data.groupID);
        $('#'+divResult).addClass('add-contact-to-group');
        var numAddAll = 0;
        var results = '';
        var friendId_local = localStorage.getItem('user_id');
        var userIdArray = new Array();
        var isFriends = '';
        $('#'+divResult+''+result.data.groupID).html("");

        var idx=0;
        $.each(result.data.memberInfo, function (index, value) {
            var displayName = value.displayName;
            var imageAvatar = '<img src="' + value.imageAvatar + '" alt="" class="imgProfile addImg">';
            var userId = value.gMemberID;
            if(userId != friendId_local){
                var country = value.city;
                if(country != ''){
                    country = country +', '+value.country;
                }else{
                    country = value.country;
                }
                var imgCheck = '<img src="assets/image/profile/contactProfile_invitationSent_x1.png" alt="" class="imgCheck" id="imgCheck'+userId+'">';
                if(value.imageAvatar == '' || value.imageAvatar == null){
                    imageAvatar = '<img src="assets/image/icons/defaultImg.gif" alt="" class="imgProfile addImg">';
                }
                idx = value.socialNetworkTypeID.length -1;
                if(value.socialNetworkTypeID[idx] == 1){
                    socialType = '<img src="assets/image/icons/sc_icon_72.png">';//supperchat
                }else if(value.socialNetworkTypeID[idx] == 2){
                    socialType = '<img src="assets/image/icons/sc_icon_72.png">';//facebook
                }else if(value.socialNetworkTypeID[idx] == 3){
                    socialType = '';//twitter
                }else if(value.socialNetworkTypeID[idx] == 4){
                    socialType = '<img src="assets/image/icons/sc_icon_72.png">';//gtalk
                }else if(value.socialNetworkTypeID[idx] == 5){
                    socialType = '';//yahoo
                }else if(value.socialNetworkTypeID[idx] == 8){
                    socialType = '';//aim
                }else if(value.socialNetworkTypeID[idx] == 11){
                    socialType = '';//skype
                }else if(value.socialNetworkTypeID[idx] == 12){
                    socialType = '';//icq
                }

                //isFriends = '<a href="javascript:void(0)" onclick="addContact(this)" data-userName="'+ displayName+'" data-userId="'+userId+'" id="id'+userId+'"><img src="assets/image/Sync/add_01.png"></a>';
                //
                //isFriends += '<a href="javascript:void(0)" class="de-active" onclick="subContact(this)" data-userName="'+ displayName+'" data-userId="'+userId+'" id="ch'+userId+'"><img src="assets/image/Sync/check_02.png"></a>';

                results +='<div class="friend-tr-block border-butt">';
                results +='<div class="fb-imageAvatar twt-feed">';
                //results += '<a href="javascript:void(0)" onclick="addContact(this)"  data-action="addContact" data-Url="'+value.ImageAvatar+'" data-userName="'+ displayName+'" data-userId="'+userId+'">';
                results += imageAvatar ;
                //results += '</a>';
                results += '<a href="javascript:void(0)" onclick="addContact(this)" data-action="subContact" data-userName="'+ displayName+'" data-userId="'+userId+'">';
                results += imgCheck;
                results += '</a>';
                results +='</div>';
                results +='<div class="fb-friends-name"><div>'+displayName+'</div><div class="location">'+country+'</div></div>';
                results += '<div class="contact-notification right">';
                results += '<div class="social-type-img"><div>'+socialType+'</div></div>';
                results += '</div>';
                //<div id="private-chat-notify_'+value.FriendID+'"></div>
                //results +='<div class="fb-addFriend">'+isFriends+'</div>';
                results +='</div>';

            }

        });
        var gmember = result.data.memberInfo.length - 1;
        $('#groupNum'+result.data.groupID).html('( '+gmember+' people )');
        $('#div-add-result'+friendId_local).html('<div class="add-contact-add"><label>Add</label></div>');
        $('.jqx-tabs-content-element.jqx-rc-b').css({'overflow':'hidden'});
        var height = $( "#div-box-left" ).height() -425;

        $('#'+divResult+''+result.data.groupID).html(results);
        var height = $("#div-box-left" ).height()-250;
        console.log(height);
        $('#'+divResult+''+result.data.groupID).slimscroll({
            position: 'right',
            height: height,
            size:'5px',
            alwaysVisible:false
        });
    }else{

    }

}

var func_viewNotification = function(result,divResult){
    var obj = JSON.parse(result);
    var usageData = JSON.parse(obj.Body.Data);
    var result = '';
    $.each(usageData.data,function(index,value){
        var imageAvatar = value.ImageAvatar != '' ? value.ImageAvatar:'assets/image/icons/defaultImg.gif';
        result +='<div class="div-noti-form" id="div-form-'+value.FriendID+'">';
        result +='<div class="div-noti-form-profile"><img src="'+imageAvatar+'" class="img-circle"></div>';
        result +='<div class="div-noti-form-name">';
        result +=value.DisplayName;
        result +='<br>Sent you a friend request';
        result +='</div>';
        result +='<div class="div-noti-form-conf">';
        result +='<div onclick="Func_Request(this)" data-act="Accept" data-friID="'+value.FriendID+'"><img src="/assets/image/Profile/check_01.png" class="img-circle conf" width="20" height="20"></div>';
        result +='<div class="check"  data-act="Cancel" onclick="Func_Request(this)" data-friID="'+value.FriendID+'"><img src="/assets/image/Profile/cancel_01.png" class="img-circle conf" width="20" height="20"></div>';
        result +='</div>';
        result +='</div>';
    });

    $('#'+divResult).html(result);

}


var Func_Request = function(valReques){
    var getId = valReques.getAttribute('data-friID');
    var getAct = valReques.getAttribute('data-act');
    if(getAct =="Cancel"){
        ignoreFriendRequest(getId);
    }else{
        acceptFriendRequest(getId);
    }
}

