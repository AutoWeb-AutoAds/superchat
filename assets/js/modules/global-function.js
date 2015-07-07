var loadPage = function(url,divResult){
	$('#'+divResult).html('');
	$.ajax({
		type:"post",
		url:url,
		data:{},
		beforeSend:beforeSendRequest(divResult),
		success:function(respons){
			$('#'+divResult).html(respons);
		},
		error:function(){
			alert('Oops there were something went wrong. Please contact administrator!')
		}
	});
}

var tabAjaxDataLoading = function(url, divJqxTab, title, index,friendId,chatType,SIPUser,socialTypeID){
	$.ajax({
		type: 'post',
		url: url,
		data:{"friendId":friendId,"chatType":chatType,"SIPUser":SIPUser,"socialTypeID":socialTypeID},
		beforeSend: function(){},
		//On success - adding the new tab with the loaded content
		success: function (data) {
			$("#"+divJqxTab).jqxTabs('setContentAt',index,data);
			if(chatType =='GroupChat'){
				var id = friendId;
				var lw = $('.add_'+id).width();
				var w = $('#main-chat-body_'+id).width();
				if(w != null){
					if(w >800){
						$('#main-chat-body_'+id).width(w-lw-2);
					}
					$('.add_'+id).fadeIn();
				}
			}
		},
        error: function (errs) {
			console.log('Oop! there were something went wrong! page not found!');
        }
    });
}

var createJqxWindowId = function(id){
	if($('#'+id).length>0){
		$('#'+id).jqxWindow('destroy');
	}
	$('body').append('<div id="'+id+'"><div style="background: none !important;font-weight: bold;">Loading</div><div><div style="margin: 0 auto;text-align:center;padding:3px;"><img src="assets/image/icons/loading.gif"></div></div></div>');
}

var closeJqxWindowId = function(id){
	if($('#'+id).length!=0){
		$('#'+id).jqxWindow('destroy');
	}
}

var newJqxWindow = function(prefix, windowTitle, windowWidth, windowHeight, url,chatType,SIPUser){
	createJqxWindowId(prefix);
	$('#'+prefix).jqxWindow({ theme: jqxTheme, width: windowWidth, height: windowHeight,resizable: false, isModal: true, modalOpacity: 0.3,modalZIndex: 99999,
		initContent: function(){
			$('#'+prefix).jqxWindow('setTitle',windowTitle);
			$.ajax({
				type: 'post',
				url: url,
				data:{"friendId":localStorage.getItem('friendId'),"chatType":chatType,"SIPUser":SIPUser},
				success: function (data) {
					$('#'+prefix).jqxWindow('setContent',data);
				},
				error:function(){
					alert('The page you are accessing was not found. Please contact administrator to resolve this problem!')
				}
			});
			//if user click close action
			$('#'+prefix).on('close',function(){
				closeJqxWindowId(prefix);
			});
		}
	});
}

var newJqxWindowVideo = function(prefix, windowTitle, windowWidth, windowHeight, url,poster,SocialMediaTypeID,DisplayName){
	createJqxWindowId(prefix);
	$('#'+prefix).jqxWindow({ theme: jqxTheme, width: windowWidth, height: windowHeight,resizable: true, isModal: false, modalOpacity: 0.3,modalZIndex: 99999,
		initContent: function(){
			$('#'+prefix).jqxWindow('setTitle',windowTitle);

			var result ='';

			if(SocialMediaTypeID == 7){
				$('#'+prefix).jqxWindow('setContent','<div id="div-result-twitch">'+streamTwitch(DisplayName,'div-result-twitch')+'</div>');

			}else{
				result += '<div class="playerStreamings pop" id="playerStreaming">';
				result += '<video id="video" controls  width="100%"  data-name="Youtube" preload="none" mediagroup="myVideoGroup"  src="'+url+'" poster="'+poster+'" autoplay></video>';
				result += '</div>';
				$('#'+prefix).jqxWindow('setContent',result);
			}
			//if user click close action

			$('#'+prefix).on('close',function(){
				closeJqxWindowId(prefix);
			});
		}
	});
}

var saveTabModule = function(tabIndex) {
	$.jqx.cookie.cookie('tabModuleId',tabIndex);
}

var loadTabModule = function(URL,tabIndex) {
	$.ajax({
		type:"post",
		url:URL,
		data:{},
		success:function(response){
			$('#body_container_'+tabIndex).html(response);
		},
		error:function(errors){
			alert('Page not found!');
		}
	});
}

var getAWSToken = function(callback) {
	var getAWSToken = {
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
				"UserID":localStorage['user_id'],
				"AccessKey" : localStorage['access_key']
			}
		}
	}
	socketIoCon.emit('getAWSToken', JSON.stringify(getAWSToken));
	socketIoCon.removeAllListeners('getAWSToken-result');
	socketIoCon.on('getAWSToken-result', function(result) {
		var output = JSON.parse(result);
		var usageData = JSON.parse(output.Body.Data);
		if(usageData.code == 1) {
			callback(usageData);
		}
	});
}

var loginStatus = function(callbackFunction,isConnect,callbackMoreFunc){
	if(isConnect == 'connected'){
		callbackFunction();
		if(callbackMoreFunc){
			callbackMoreFunc();
		}
	}else{
		socketIoCon.removeAllListeners('login-result');
		socketIoCon.on('login-result', function(result) {
			var jsObj = JSON.parse(result);
			var jsBody = JSON.parse(jsObj.Body.Data);
			if (jsBody.code == 1) {
				if(callbackFunction){
					callbackFunction();
					getFriendRequests();
				}
				if(callbackMoreFunc){
					callbackMoreFunc();
				}
			}
		});
	}
}

var getProfile = function(callback,getFriendSocial,userId,accessKey) {
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
				"UserID":userId,
				"SocialAccountTypeID":"",
				"SocialAccountID":"",
				"AccessKey" : accessKey
			}
		}
	}
	socketIoCon.emit('getProfile', JSON.stringify(profileData));
	socketIoCon.removeAllListeners('getProfile-result');
	socketIoCon.on('getProfile-result', function (resulth) {
		var json = JSON.parse(resulth);
		if(getFriendSocial) {
			getFriendSocial();
		}
		callback(JSON.parse(json.Body.Data));
	});
}

var getFriendBySocialType = function(socialAccountTypeID,allConnection,limit,offset,callbackFunc,divLoading) {
	beforeSendRequest(divLoading);
	var getFriends = {
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
				"SocialAccountTypeID" : socialAccountTypeID,
				"AllConnection" : allConnection,
				"Limit" : limit,
				"Offset" : offset
			}
		}
	}
	socketIoCon.emit('getFriend', JSON.stringify(getFriends));
	socketIoCon.removeAllListeners('getFriend-result');
	socketIoCon.on('getFriend-result', function (datas) {
		var json = JSON.parse(datas);
		callbackFunc(JSON.parse(json.Body.Data));
	});
}

var getProfileBySIP = function(SIP,callbackFunc){
	var dataSIP = {
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
				"SIP" : SIP
			}
		}
	}
	socketIoCon.emit('getProfileBySIP', JSON.stringify(dataSIP));
	socketIoCon.removeAllListeners('getProfileBySIP-result');
	socketIoCon.on('getProfileBySIP-result', function (resulth) {
		var json = JSON.parse(resulth);
		callbackFunc(JSON.parse(json.Body.Data));
	});
}

var escapeRegExp = function(string) {
	return string.replace(/([@.*+?^=!:${}()|\[\]\/\\])/g, '_');
}

var beforeSendRequest = function(divLoading){
	$('#'+divLoading).html('<div style="top:50%;position: absolute;left:50%"><img src="assets/image/icons/loading.gif"></div>');
}

var mediaTypes = function(returnType,mediaType){

	if(mediaType == ''){
		mediaType = 'youtube';
	}
	if(returnType != 'string'){

		switch (mediaType){
			case "youtube":
				mediaType=1;
				break;
			case "vimeo":
				mediaType=2;
				break;
			case "aol":
				mediaType=3;
				break;
			case "spotify":
				mediaType=4;
				break;
			case "itune":
				mediaType=5;
				break;
			case "soundcloud":
				mediaType=6;
				break;
			case "twitch":
				mediaType=7;
				break;

		}
	}else{
		switch (mediaType) {
			case 1:
				mediaType = "youtube";
				break;
			case 2:
				mediaType = "vimeo";
				break;
			case 3:
				mediaType = "aol";
				break;
			case 4:
				mediaType = "spotify";
				break;
			case 5:
				mediaType = "itune";
				break;
			case 6:
				mediaType = "soundcloud";
				break;
			case 7:
				mediaType = "twitch";
				break;
		}
	}
	return mediaType;
}


