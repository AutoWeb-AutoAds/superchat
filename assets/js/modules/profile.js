var updateImageAvatar = function(accessKey,imageAvatarPath,fileName) {
    var dataAvatar = {
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
                "AccessKey" : accessKey,
                "UserID": "",
                "ImageAvatar" : imageAvatarPath,
                "FileName" : fileName,
                "FileSize" : "100"
            }
        }
    }

    socketIoCon.emit('updateImageAvatar', JSON.stringify(dataAvatar));
    socketIoCon.removeAllListeners('updateImageAvatar-result');
    socketIoCon.on('updateImageAvatar-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            console.log('Success');
        }
    });
}

var updateImageCover = function(accessKey,fileUrl,fileName) {
    var dataCover = {
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
                "AccessKey" : accessKey,
                "UserID": "",
                "ImageCover" : fileUrl,
                "FileName" : fileName,
                "FileSize" : "100"
            }
        }
    }

    socketIoCon.emit('updateImageCover', JSON.stringify(dataCover));
    socketIoCon.removeAllListeners('updateImageCover-result');
    socketIoCon.on('updateImageCover-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            console.log('Success');
        }
    });
}

var updateProfile = function(firstName,lastName,middleName,birthDate,gender,phoneNumber,Country,CountryCode){
    var profileData = {
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
                "UserName" : "",
                "DisplayName" : "",
                "FirstName" : firstName,
                "LastName" : lastName,
                "MiddleName" : middleName,
                "Gender" : gender,
                "Email" : "",
                "BirthDate" : birthDate,
                "Phone" : phoneNumber,
                "Country" : Country,
                "CountryCode" : CountryCode,
                "FavoriteApplication"  : ""
            }
        }
    }

    socketIoCon.emit('updateProfile', JSON.stringify(profileData));
    socketIoCon.removeAllListeners('updateProfile-result');
    socketIoCon.on('updateProfile-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            console.log('Success');
        }
    });

}

var addMood = function(mood) {
    var moodeData = {
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
                "Mood" : mood
            }
        }
    }
    socketIoCon.emit('addMood', JSON.stringify(moodeData));
    socketIoCon.removeAllListeners('addMood-result');
    socketIoCon.on('addMood-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            console.log('Success');
        }
    });
}

var addEmails = function(listEmails){
    var dataEmails = {
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
                "ListEmail" : listEmails
            }
        }
    }
    socketIoCon.emit('addEmail', JSON.stringify(dataEmails));
    socketIoCon.removeAllListeners('addEmail-result');
    socketIoCon.on('addEmail-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            console.log('Success');
        }
    });

}

var addPhoneNumbers = function(listPhoneNumbers){
    var phoneData = {
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
                "ListPhoneNumber" : listPhoneNumbers
            }
        }
    }
    socketIoCon.emit('addPhoneNumber', JSON.stringify(phoneData));
    socketIoCon.removeAllListeners('addPhoneNumber-result');
    socketIoCon.on('addPhoneNumber-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            console.log('Success');
        }
    });
}

var deletePhoneNumbers = function(listPhoneNumber){
    var phoneDelete = {
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
                "ListPhoneNumber" : listPhoneNumber
            }
        }
    }
    socketIoCon.emit('deletePhoneNumber', JSON.stringify(phoneDelete));
    socketIoCon.removeAllListeners('deletePhoneNumber-result');
    socketIoCon.on('deletePhoneNumber-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            console.log('Success');
        }
    });
}

var deleteEmails = function(listEmails){
    var emailDelete = {
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
                "ListEmail" : listEmails
            }
        }
    }
    socketIoCon.emit('deleteEmail', JSON.stringify(emailDelete));
    socketIoCon.removeAllListeners('deleteEmail-result');
    socketIoCon.on('deleteEmail-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code == 1){
            console.log('Success');
        }
    });
}

var triggerClick = function(id){
    $(id).trigger('click');
}

var addMultiTextBox = function(toTargetDiv,elementName,selector,placeHolder){
    var data = '';
    data +='<div>';
    data +='<input type="text" name="'+elementName+'" placeholder="'+placeHolder+'" class="input-text">';
    data +='<a href="javascript:void(0)" class="'+selector+'" style="text-decoration:none">x</a>';
    data +='</div>';
    data +='<div class="clear-both"></div>';
    $(toTargetDiv).append(data);

    $('.'+selector).on('click',function(e){
        e.preventDefault();
        $(this).parent().remove();
    });
}

var viewProfile = function(data){
    var chatType = data.getAttribute('data-chatType');
    var divUrl = basePath + '/chat/viewProfile';
    var friendID = data.getAttribute('data-friendID');
    var SIPUser = data.getAttribute('data-SIP');
    newJqxWindow('div-view-user-profile','Profile',900,800,divUrl,chatType,SIPUser);
}