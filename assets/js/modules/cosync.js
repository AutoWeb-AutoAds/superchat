function init() {
    var video = document.getElementById("video");
    video = document.getElementById("video");

    video.addEventListener("seeked", function () {

        console.log(video.currentTime);
    }, false);
    video.addEventListener("pause", function () {

        console.log(video.currentTime);
    }, false);
    video.addEventListener("play", function () {

        console.log(video.currentTime);
        //setTime(10);
    }, false);


    function setTime(tValue) {
        //  if no video is loaded, this throws an exception
        try {
            if (tValue == 0) {
                video.currentTime = tValue;
            }
            else {
                video.currentTime += tValue;
            }

        } catch (err) {
            // errMessage(err) // show exception
            errMessage("Video content might not be loaded");
        }
    }
}

var deletePlaylistPopUp = function(PlaylistID,PlaylistName){
    var deletePlaylistPopUp = basePath+'/livestream/deletePlaylist';
    newJqxWindow('div-delete-playlist','Delete playlist',300,500,deletePlaylistPopUp,PlaylistID,PlaylistName);
}

var editPlaylistPopUp = function(PlaylistID,PlaylistName){
    var editPlaylistPopUp = basePath+'/livestream/editPlaylist';
    newJqxWindow('div-edit-playlist','Edit playlist',300,500,editPlaylistPopUp,PlaylistID,PlaylistName);
}

var cosync = function(broadcastId,requestId,isPrivate,cosyncData,callback){
    var coData = {
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
                "broadcastId" : broadcastId,
                "requestId": requestId,
                "isPrivate": isPrivate,
                "cosyncData":cosyncData
            }
        }
    }
    socketIoCon.emit('cosync',JSON.stringify(coData));
    socketIoCon.removeAllListeners('cosync-result');
    socketIoCon.on('cosync-result',function(response){
        //console.log(response);
        if(callback){
            callback(response);
        }
    });
}

var func_fadeTaggle = function(result){
    $("#"+result).fadeToggle();

    $("#chat-setting-header").fadeToggle();
}

var func_searchFri = function(txt){
    var txtSearch = $('#'+txt).val();
    searchFriendToAddChat(txtSearch,function(result){
        func_viewFriendSearch(result,'results-div','all');
        $('#results-div').slimscroll({
            position: 'right',
            height: 450,
            size:'1px',
            alwaysVisible:false
        });
        $('#btn-invite').html('<span class="spButton">Invite</span> ');
    })
}

var acceptCoInvite = function(data){

    var GroupID = data.getAttribute('data-GroupID');
    var isPrivate = 1;
    if(GroupID != ''){
        isPrivate =0;
    }
    var DisplayName = data.getAttribute('data-Chanel');
    var ImageAvatar = data.getAttribute('data-ImageAvatar');
    var senderID = data.getAttribute('data-senderID');
    var ReceiverID = localStorage.getItem('user_id');
    var url =  data.getAttribute('data-url');
    var SocialMediaTypeID = data.getAttribute('data-SocialMediaTypeID');

    var cosyncData = cosyncDataAccept(ReceiverID,ReceiverID,GroupID,ImageAvatar,DisplayName,senderID);

    cosync(ReceiverID,'',isPrivate,cosyncData,function(){
        newJqxWindowVideo('dataId','SuperChat','100%','100%',url,'',SocialMediaTypeID,DisplayName);

    });

}

var GroupChat = {data:[]};
var checkp = 0;
var addContact = function(userId){
    var friendId = localStorage.getItem('friendId');
    var tabIndex = localStorage.getItem('tabIndex');

    var eventAct = userId.getAttribute("data-action");
    var addId = userId.getAttribute("data-userId");
    var addName = userId.getAttribute("data-userName");
    var statusId = false;

    if(eventAct == "addContact"){
        //if you add fri into list chat to create group chat
        if(GroupChat.data.length == 0){

            var friendList = [{"title":addName,"friendId":addId}];
            var ArrfriendId =[{"addId":JSON.stringify(friendList)}];
            GroupChat.data[GroupChat.data.length]= ArrfriendId;

        }else{
            for(checkp =0; checkp < GroupChat.data.length; checkp++){
                $.each(GroupChat.data[checkp],function(index, value){
                    if(value.friendId == friendId){
                        var jsObj = JSON.parse(value.addId);
                        jsObj[jsObj.length] = {"title":addName,"friendId":addId};
                        GroupChat.data[checkp][0].addId = JSON.stringify(jsObj);
                        statusId =true;
                    }
                });
            }
            if(statusId == false){

                var friendList = [{"title":addName,"friendId":addId}];
                var ArrfriendId =[{"addId":JSON.stringify(friendList)}];
                GroupChat.data[GroupChat.data.length]= ArrfriendId;
            }
        }
        var addImgUrl = userId.getAttribute("data-Url");

        if(addImgUrl == '' || addImgUrl == null){
            addImgUrl = 'assets/image/icons/defaultImg.gif';
        }
        //console.log(addImgUrl);
        $('#add-result'+friendId).append('<img src="' + addImgUrl+ '" alt="" id="img'+addId+'" class="img-circle addImg">');
        //console.log(GroupChat);
    }else{
        //console.log(GroupChat.data.length);
        //if you remove fri into list chat to create group chat
        for(checkp =0; checkp < GroupChat.data.length; checkp++){

            $.each(GroupChat.data[checkp],function(index, value){
                var jsObj = JSON.parse(value.addId);
                var idx =0;
                //console.log(jsObj);
                $.each(jsObj,function(indexs,values){
                    //console.log(indexs+'-'+idx);
                    if(idx == indexs){
                        if(values.friendId == addId){
                            jsObj.splice(idx ,1);
                            $('#img'+addId).remove();
                            //console.log('remove friend ID : '+ values.friendId + '= '+ addId + idx);
                            GroupChat.data[checkp][0].addId = JSON.stringify(jsObj);
                            //$('#add-result'+friendId).html('');
                            //console.log(GroupChat);
                            return false;
                        }
                    }

                    idx++;
                });
            });
        }
    }
    $('#imgCheck'+addId).fadeToggle('fast');
}

var func_createGroups = function(){

    var cosData = '';
    var addMember = new Array();
    var SenderID = localStorage.getItem('user_id');
    var SocialMediaTypeID = '1';
    var Displayname = '';
    var url='';

    if(GroupChat.data.length>0){
        for(checkp =0; checkp < GroupChat.data.length; checkp++){
            $.each(GroupChat.data[checkp],function(index, value){
                    var jsObj = JSON.parse(value.addId);

                    $.each(jsObj, function(index , values){

                        addMember.push(values.friendId);
                    });

            });

        }
    }
    //if media is not twitch we use Video tag
    if(document.getElementById("video")){
        url = document.getElementById("video").getAttribute("src");
        var mediaType = document.getElementById("video").getAttribute("data-mediaType");
        Displayname = document.getElementById("video").getAttribute("data-name");
        SocialMediaTypeID = mediaTypes('number',mediaType);
    }
//if media is twitch we use ObjeSWF to play
    if(document.getElementsByTagName('object').length>0){
        var dataObj = document.getElementsByTagName('object');
        var twitchUrl =  $('[name=flashvars]').val();
        console.log(document.getElementsByTagName('object'));
        var ArrayUrl = twitchUrl.split('&');
        ArrayUrl = ArrayUrl[2].split('=');
        Displayname = ArrayUrl[1];
        SocialMediaTypeID = 7;
        url = dataObj[0].data;
    }


    if(addMember.length > 1){

        console.log('Group');
        //func_createGroupChat(1,"","",addMember,function(reslut){
        //
        //    var userData = reslut.data;
        //    var val_groupID = userData.groupID;
        //    var val_groupName = userData.groupName;
        //    var val_owerID = userData.ownerID;
        //
        //    cosync(val_groupID,'',0,cosyncData);
        //
        //    $('.jqx-icon-close').trigger( "click" );
        //});
        cosData = cosyncData(SenderID,'55927923c69152240fc684f1',Displayname,url,1);
        cosync('55927923c69152240fc684f1','',0,cosData);
    }else{

        cosData = cosyncData(SenderID,'',Displayname,url,SocialMediaTypeID);
        cosync(addMember[0],'',1,cosData)
    }
}

var cosyncData = function(SenderID,GroupID,DisplayName,url,SocialMediaTypeID){
    var cosyncData = {
        cosyncData: {
            AvatarFile: [

            ],
            SenderID: SenderID , GroupID: GroupID,
            DisplayName: DisplayName,
            Video: [
                {
                    quality: '',
                    url: ''
                },
                {
                    quality: '',
                    url: ""
                },
                {
                    quality: '',
                    url: url
                }
            ],
            SocialMediaTypeID: SocialMediaTypeID
        }
    }
    return cosyncData;
}

var cosyncDataAccept = function(ReceiverID,broadcastId,GroupID,ImageAvatar,DisplayName,SenderID) {
    var cosyncData = {
        "cosyncData":{
            "isPrivate":1,
            "SocialMediaTypeID":-1,
            "ReceiverID": ReceiverID,
            "broadcastId": broadcastId,
            "GroupID": GroupID,
            "ImageAvatar":ImageAvatar,
            "DisplayName": DisplayName,
            "SenderID":SenderID
        }
    }
    return cosyncData;
}

var cosyncDataCancel = function(){

}

var cosyncDataOpen = function(){

}
var cosyncDataClose = function(){

}

var cosyncDataActionLoad = function(){

}

var cosyncDataActionResume = function(){

}

var cosyncDataActionPush = function(){

}

var cosyncDataActionSeek = function(){

}

var cosyncDataActionShare = function(){

}


var createPlaylist = function(PlaylistName,callback){

    var createPlaylist ={
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
                "AccessKey" : localStorage['access_key'],
                "PlaylistName" : PlaylistName
            }
        }
    }

    socketIoCon.emit('createPlaylist', JSON.stringify(createPlaylist));
    socketIoCon.removeAllListeners('createPlaylist-result');
    socketIoCon.on('createPlaylist-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
            if(callback){
                callback(obj);
            }
    });

};

var getPlaylist = function(callback){
    var getPlaylist = {
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
            "AccessKey" : localStorage['access_key'],
                "Limit":"",
                "Offset":""
            }
        }
    }

    socketIoCon.emit('getPlaylist', JSON.stringify(getPlaylist));
    socketIoCon.removeAllListeners('getPlaylist-result');
    socketIoCon.on('getPlaylist-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);

            if(callback){
                callback(obj);
            }

    });
}

var deletePlaylist = function(ListPlaylistID,callback){
    var deletePlaylist = {
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
                "AccessKey" : localStorage['access_key'],
                "ListPlaylistID" : [ListPlaylistID]
            }
        }
    }

    socketIoCon.emit('deletePlaylist', JSON.stringify(deletePlaylist));
    socketIoCon.removeAllListeners('deletePlaylist-result');
    socketIoCon.on('deletePlaylist-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(callback){
            callback(obj);
        }
    });
}

var changePlaylistName = function(PlaylistID,NewPlaylistName,callback){
    var changePlaylistName = {
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
                "AccessKey" : localStorage['access_key'],
                "PlaylistID" : PlaylistID,
                "NewPlaylistName" : NewPlaylistName
            }
        }
    }

    socketIoCon.emit('changePlaylistName', JSON.stringify(changePlaylistName));
    socketIoCon.removeAllListeners('changePlaylistName-result');
    socketIoCon.on('changePlaylistName-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(callback){
            callback(obj);
        }
    });
}

var pushVideoToPlaylist = function(PlaylistID,VideoID,MediaType,VideoTitle,VideoThumbnail,callback){

    var pushVTP = {
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
                "AccessKey" : localStorage['access_key'],
                "PlaylistID" : PlaylistID,
                "ListVideo" : [{
                    "VideoID": VideoID,
                    "MediaType":MediaType ,
                    "VideoViewCount":"",
                    "IsFavorite" :"",
                    "Duration" :"",
                    "VideoTitle":VideoTitle,
                    "VideoThumbnail":VideoThumbnail,
                    "Channel":""
                }]
            }
        }
    }

    socketIoCon.emit('pushVideoToPlaylist', JSON.stringify(pushVTP));
    socketIoCon.removeAllListeners('pushVideoToPlaylist-result');
    socketIoCon.on('pushVideoToPlaylist-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(callback){
            callback(obj);
        }
    });
}
var listFavoriteVideos = function(callback){
    var favoriteVideo = {
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

    socketIoCon.emit('listFavoriteVideo', JSON.stringify(favoriteVideo));
    socketIoCon.removeAllListeners('listFavoriteVideo-result');
    socketIoCon.on('listFavoriteVideo-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        callback(obj);
    });
}

var markVideoAsFavorite = function(listVideo,callback){
    var markVideo = {
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
                "ListVideo" : [listVideo]
            }
        }
    }

    socketIoCon.emit('markVideoAsFavorite', JSON.stringify(markVideo));
    socketIoCon.removeAllListeners('markVideoAsFavorite-result');
    socketIoCon.on('markVideoAsFavorite-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(callback){
            callback(obj);
        }
    });
}

var removeVideoFromFavorite = function(videoID,mediaType,callback){
    var removeVideo = {
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
                "VideoID" : videoID,
                "MediaType" : mediaType
            }
        }
    }
    socketIoCon.emit('removeVideoFromFavorite', JSON.stringify(removeVideo));
    socketIoCon.removeAllListeners('removeVideoFromFavorite-result');
    socketIoCon.on('removeVideoFromFavorite-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(callback){
            callback(obj);
        }
    });
}
