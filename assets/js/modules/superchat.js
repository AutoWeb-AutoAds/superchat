$(document).ready(function(e){
    var height = $(document).height() - 112;
    $('#results-div').slimscroll({
        height:height,
        alwaysVisible: false
    });
    $('.div-sync-box-center').height($( "#results-div" ).height()+32);


    $('#btn-search-socail').on('click',function(){
        var friends = $('#search-friend').val();
        searchSuperChat(friends);
    });
    $('#search-friend').keydown(function(e){
       if(e.keyCode == 13){
           $("#btn-search-socail").trigger('click');
       }
    });
});
var searchSuperChat = function(friends,func_callback)
{
    $('#loading-div').show();
    var searchSC = {
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
                "AccessKey": localStorage['access_key'],
                "UserName": friends,
                "KeyNearBy": "FALSE",
                "KeyGender": "N",
                "SearchOption": 2,
                "MaxDistance": "",
                "Limit": "",
                "Offset": "",
                "ListAge": [{"From": 18, "To": 150}]
            }
        }
    }

    socketIoCon.emit('searchUser', JSON.stringify(searchSC));
    socketIoCon.removeAllListeners('searchUser-result');
    socketIoCon.on('searchUser-result', function (datas) {
        var object = JSON.parse(datas);
        var ob = JSON.parse(object.Body.Data);
        var numAddAll = 0;
        var results = '';
        $('#results-div').html('');
        if(ob.code == '1'){
            if(func_callback){
                func_callback(ob);
            }else{
                var userIdArray = new Array();
                var isFriends = '';
                $.each(ob.data, function (index, value) {
                    var displayName = value.DisplayName;
                    var imageAvatar = '<img src="' + value.ImageAvatar + '" alt="">';
                    var userId = value.UserID;
                    var connectionStatus = value.ConnectionStatus;
                    var country = value.Country;
                    if(value.ImageAvatar == '' || value.ImageAvatar == null){
                        imageAvatar = '<img src="http://54.88.49.6/superchat-local/image/convert_image?UserID='+userId+'&FileWidth=25&FileHeight=25">';
                    }
                    if(connectionStatus == 0){
                        isFriends = '<a href="javascript:void(0)" onclick="addSCUser(this)" id="'+userId+'"><img src="assets/image/Sync/add_01.png"></a>';
                        numAddAll+=1;
                        userIdArray.push(userId);
                    }else{
                        isFriends = '<a href="javascript:void(0)" class="pointer-event-none"><img src="assets/image/Sync/check_02.png"></a>';
                    }
                    results +='<div class="friend-tr-block">';
                    results +='<div class="fb-imageAvatar twt-feed">'+imageAvatar+'</div>';
                    results +='<div class="fb-friends-name"><div>'+displayName+'</div><div class="location">'+country+'</div></div>';
                    results +='<div class="fb-addFriend">'+isFriends+'</div>';
                    results +='</div>';


                });
                $('#results-div').append(results);
                if(numAddAll > 0){
                    $('#div-add-all').show();
                    //Add multi users at once time
                    $('#btn-add-all').on('click',function(e){
                        e.preventDefault();
                        addSCUsers(userIdArray);
                    });
                }else{
                    $('#div-add-all').hide();
                }
            }

        }else{
            $("#results-div").html('<div id="search-not-found">Search not found, please try again!</div>');
            $('#div-add-all').hide();
        }
        $('#loading-div').hide();
    });
}

//add user one by one
var addSCUser = function(attr)
{
    var userId = attr.getAttribute('id');
    var addFriendData = {
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
                "UserID" : userId,
                "AccessKey" : localStorage['access_key']
            }
        }
    }
    socketIoCon.emit('addFriend', JSON.stringify(addFriendData));
    socketIoCon.removeAllListeners('addFriend-result');
    socketIoCon.on('addFriend-result', function (datas) {
        var object = JSON.parse(datas);
        var ob = JSON.parse(object.Body.Data);
        if(ob.code == 1){
            console.log('Success!');
            $('#'+userId).html('');
            $('#'+userId).append('<img src="assets/image/Sync/check_02.png">');
        }
    });
}
//add multi users at once time
var addSCUsers = function(userId)
{
    var addFriendsData = {
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
                "UserIDs" : userId,
                "AccessKey" : localStorage['access_key']
            }
        }
    }
    socketIoCon.emit('addFriends', JSON.stringify(addFriendsData));
    socketIoCon.removeAllListeners('addFriends-result');
    socketIoCon.on('addFriends-result', function (datas) {
        var objects = JSON.parse(datas);
        var obs = JSON.parse(objects.Body.Data);
        if(obs.code == 1){
            console.log('Success!');
            $('#'+userId).html('');
            $('#'+userId).append('<img src="assets/image/Sync/check_02.png">');
        }
    });
}