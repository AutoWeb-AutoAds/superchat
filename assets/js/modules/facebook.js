$(document).ready(function(){
    $('#facebook').on('click',function(){
        $('#header-title').html('Your Facebook Contacts');
        if(localStorage['facebookSigned'] == 2){
            geFacebookFriends();
        }else{
            facebookSigninSyncContact();
        }
    })
});
//Facebook jssdk for list friend
window.fbAsyncInit = function() {
    FB.init({
        appId      : faceBookAppID,
        status     : true,
        xfbml      : true,
        version: 'v1.0'
    });
};
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//----------------------------Function for Facebook apply here -------------------------------------------
function facebookSigninSyncContact() {
    FB.login(function(response) {
        if (response.authResponse) {
            FB.api('/me', function(response) {
                geFacebookFriends();//get friends from facebook
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'publish_actions'});
}

//Function For load FB API
function geFacebookFriends(){
    $('#loading-div').show();
    FB.api('/me?fields=friends.fields(gender,first_name,last_name,id,name,location,picture)', function(response) {
        var rsFB ='';
        $('#results-div').html('');
        $.each(response.friends.data,function(index,value) {
            var imageAvatar = '<img src="' +  value.picture.data.url  + '">';
            var id = value.id;
            var firstName = value.first_name;
            var lastName = value.last_name;
            var name = value.name;
            var picture = value.picture.data.url;
            var displayName = value.name;
            //console.log(value);
            var click="\"addSCFriendFromFacebook(\'" +id+ "\',\'" +firstName+ "\',\'" +lastName+ "\',\'" +picture+ "\',\'" +displayName+ "\')\"";

            rsFB += '<div class="friend-tr-block">' +
                    '<div class="fb-imageAvatar twt-feed">'+imageAvatar+'</div>' +
                    '<div class="fb-friends-name">'+name+'</div>' +
                    '<div class="fb-addFriend"><a href="javascript:void(0);" id="'+id+'"><img src="assets/image/Sync/add_01.png" onclick='+click+'></a></div>' +
                    '</div>';

        });
        $('#results-div').append(rsFB);
        $('#loading-div').hide();
        localStorage.setItem('facebookSigned',2);

    });
}


//Add facebook friend into Super Chat
function addSCFriendFromFacebook(userId,FirstName,LastName,ImgAvatar,displayName){
    //getPrivateNotification();
    var dataDev = {
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
                "AccessKey" :localStorage['access_key'],
                "SocialAccountTypeID" :"2",
                "ListSocialAccount" : [{"SocialAccountID":userId,"SocialFirstName":FirstName,"SocialLastName":LastName,"SocialAvatar":ImgAvatar,"DisplayName":displayName}]
            }
        }
    }
    socketIoCon.emit('addFriendSocials', JSON.stringify(dataDev));
    socketIoCon.removeAllListeners('addFriendSocials-result');
    socketIoCon.on('addFriendSocials-result', function(datas){
        var object1 = JSON.parse(datas);
        var ob1 = JSON.parse(object1.Body.Data);
        if(ob1.code == '1'){
            console.log('Success!');
            $('#'+userId).html('');
            $('#'+userId).append('<img src="assets/image/Sync/check_02.png">');

        }else{
            console.log('sync ready!');
        }
    });
}
