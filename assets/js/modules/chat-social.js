var filterSocial = function(result){
    var socialTypeID = result.getAttribute('data-social-type');
    console.log(socialTypeID);
    if(socialTypeID == 2) { //facebook

    }else if(socialTypeID == 4){ //gtalk
        checkGoogleSession(function(result){
            if(result.code == 0){
                //google login form goes here
                $.getScript("https://apis.google.com/js/api:client.js", function() {
                    loginGoogleAPI(function(objUser){
                        var token = objUser.B.access_token;
                        var email = objUser.getBasicProfile().getEmail();
                        console.log(token);
                        loginGoogle(email,token,function(){
                            listGoogleFriends();
                        });
                    },'chat-google');
                });
            }else{
                listGoogleFriends();
            }
        });
    }else if(socialTypeID == 5) { //Yahoo messenger
        checkYahooSession(function (result) {
            if (result.code == 0) {
                yahooPopUp();
            } else {
                listYahooFriends(function (yahooObj) {
                    var strYahoo = '';
                    console.log(yahooObj);
                    if(yahooObj.data.length){
                        $.each(yahooObj.data, function (index, value) {
                            var defaultImage = 'http://54.88.49.6/superchat-local/image/convert_image?UserID='+value.UserID+'&FileWidth=40&FileHeight=40';
                            var imageAvatar = value.ImageAvatar != '' ? value.ImageAvatar : defaultImage;
                            var socialAccountID = escapeRegExp(value.UserID);
                            var friendName = func_DefaultName(value.UserID, '', ',');
                            strYahoo += '<div class="chat-contact-block" onclick="func_getTabtitle(this)" data-func_type="chat" data-title="'+friendName+'" data-SIPUser="" data-friendID="'+socialAccountID+'" data-sourceFriendID="'+value.UserID+'" data-socialAccountTypeID="5">';
                            strYahoo += '<div class="contact-img"><img src="'+imageAvatar+'" class="img-circle" width="40" height="40"></div>';
                            strYahoo += '<div class="contact-name-info">';
                            strYahoo += '<div class="contact-name">'+friendName+'</div>';
                            strYahoo += '<div class="contact-location"></div>';
                            strYahoo += '</div>';
                            strYahoo += '<div class="contact-notification">';
                            strYahoo += '<div class="social-type-img"><div><img src="assets/image/icons/yahoo-messenger.png"></div><div id="private-chat-notify_'+socialAccountID+'"></div></div>';
                            strYahoo += '</div>';
                            strYahoo += '<div class="contact-chatted-time" id="private-chat-time_'+socialAccountID+'"></div>';
                            strYahoo += '</div>';
                        });
                        $('#div-contact-scroll-left').html(strYahoo);
                    }

                }, 'div-contact-scroll-left');

            }
        });
    }else if(socialTypeID == 8){ //AIM
        checkAIMSession(function(result){
            if(result.code == 0){
                aimPopUp();
            }else{
                listAIMFriends(function(aimObj){
                    console.log(aimObj);
                    var strAim = '';
                    if(aimObj.data.length){
                        $.each(aimObj.data,function(index,value){
                            var imageAvatar = 'http://54.88.49.6/superchat-local/image/convert_image?UserID='+value.UserID+'&FileWidth=40&FileHeight=40';
                            var socialAccountID = escapeRegExp(value.UserID);
                            var friendName = value.DisplayName =='' ? func_DefaultName(value.UserID,'',','):func_DefaultName(value.DisplayName,'',',');
                            strAim += '<div class="chat-contact-block" onclick="func_getTabtitle(this)" data-func_type="chat" data-title="'+friendName+'" data-SIPUser="" data-friendID="'+socialAccountID+'" data-sourceFriendID="'+value.UserID+'" data-socialAccountTypeID="8">';
                            strAim += '<div class="contact-img"><img src="'+imageAvatar+'" class="img-circle" width="40" height="40"></div>';
                            strAim += '<div class="contact-name-info">';
                            strAim += '<div class="contact-name">'+friendName+'</div>';
                            strAim += '<div class="contact-location"></div>';
                            strAim += '</div>';
                            strAim += '<div class="contact-notification">';
                            strAim += '<div class="social-type-img"><div><img src="assets/image/icons/aim.png"></div><div id="private-chat-notify_'+socialAccountID+'"></div></div>';
                            strAim += '</div>';
                            strAim += '<div class="contact-chatted-time" id="private-chat-time_'+socialAccountID+'"></div>';
                            strAim += '</div>';
                        });
                        $('#div-contact-scroll-left').html(strAim);
                    }
                },'div-contact-scroll-left');
            }
        });

    }else if(socialTypeID == 12){ //ICQ
        checkICQSession(function(result){
            if(result.code == 0){
                icqPopUp();
            }else{
                listICQFriends(function(icqObj){
                    var strICQ = '';
                    console.log(icqObj);
                    if(icqObj.data.length){
                        $.each(icqObj.data,function(index,value){
                            var imageAvatar = 'http://54.88.49.6/superchat-local/image/convert_image?UserID='+value.UserID+'&FileWidth=40&FileHeight=40';
                            var socialAccountID = escapeRegExp(value.UserID);
                            var friendName = func_DefaultName(value.DisplayName,'',',');
                            strICQ += '<div class="chat-contact-block" onclick="func_getTabtitle(this)" data-func_type="chat" data-title="'+friendName+'" data-SIPUser="" data-friendID="'+socialAccountID+'" data-sourceFriendID="'+value.UserID+'" data-socialAccountTypeID="12">';
                            strICQ += '<div class="contact-img"><img src="'+imageAvatar+'" class="img-circle" width="40" height="40"></div>';
                            strICQ += '<div class="contact-name-info">';
                            strICQ += '<div class="contact-name">'+friendName+'</div>';
                            strICQ += '<div class="contact-location"></div>';
                            strICQ += '</div>';
                            strICQ += '<div class="contact-notification">';
                            strICQ += '<div class="social-type-img"><div><img src="assets/image/icons/icq.png"></div><div id="private-chat-notify_'+socialAccountID+'"></div></div>';
                            strICQ += '</div>';
                            strICQ += '<div class="contact-chatted-time" id="private-chat-time_'+socialAccountID+'"></div>';
                            strICQ += '</div>';
                        });
                        $('#div-contact-scroll-left').html(strICQ);
                    }

                },'div-contact-scroll-left');
            }
        });
    }else{
        getFriendBySocialType(1,0,"","",function(result){
            func_viewContact(result,'div-contact-scroll-left',function(){
                getGroupChat("","" ,function(results){
                    func_viewGetGroupChat(results,'div-contact-scroll-left',function(){
                        viewChatNotifications();
                    });
                });
            });
        },'div-contact-scroll-left');
    }
}

