if(!socketIoCon){
    var socketIoCon =  '';
}
var isConnection = "connecting";
if(!socketIoCon){
    var socketIoLog =  null;
}
function socketIOConnnections(){
    return socketIoCon = io.connect(developmentIPAddress);
}

function loginAccessKey(accessKey){
    var loginArr = {
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
                "UserName": '',
                "Password": '',
                "AccessKey": accessKey,
                "Email": "",
                "UserID": "",
                "SocialAccountID": "",
                "Token": "",
                "Stoken": "",
                "SocialNetworkType": 1,
                "DeviceType": "android or ios",
                "DeviceID": ""
            }
        }
    }
    return loginArr;
}
function getPrivateNotification (){

    socketIOConnnections();
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
    var loginData = loginAccessKey(localStorage['access_key']);
    socketIoCon.emit('login', JSON.stringify(loginData));
    socketIoCon.removeAllListeners('login-result');
    socketIoCon.on('login-result', function (result) {
        var object = JSON.parse(result);
        var ob = JSON.parse(object.Body.Data);
        if (ob.code == '1') {
        }
    });

};


