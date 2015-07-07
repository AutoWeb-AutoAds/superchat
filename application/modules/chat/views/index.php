<div class="div-box-left" id="div-box-left">
    <div class="filter-social-container">
        <div class="filter-social-icon" data-toggle="tooltip" data-placement="bottom" title="Superchat"><img src="assets/image/icons/sc_icon_72.png" class="img-circle" id="chat-sc" data-social-type="1" onclick="filterSocial(this)"></div>
        <div class="filter-social-icon" data-toggle="tooltip" data-placement="bottom" title="Facebook"><img src="assets/image/icons/fb.png" class="img-circle" id="chat-facebook" data-social-type="2" onclick="filterSocial(this)"></div>
        <div class="filter-social-icon" data-toggle="tooltip" data-placement="bottom" title="Google talk"><img src="assets/image/icons/g-pluse.png" class="img-circle" id="chat-google" data-social-type="4"></div>
        <div class="filter-social-icon" data-toggle="tooltip" data-placement="bottom" title="Yahoo Messenger!"><img src="assets/image/icons/yahoo-messenger.png" class="img-circle" id="chat-yahoo" data-social-type="5" onclick="filterSocial(this)"></div>
        <div class="filter-social-icon" data-toggle="tooltip" data-placement="bottom" title="ICQ"><img src="assets/image/icons/icq.png" class="img-circle" id="chat-icq" data-social-type="12" onclick="filterSocial(this)"></div>
        <div class="filter-social-icon" data-toggle="tooltip" data-placement="bottom" title="AIM"><img src="assets/image/icons/aim.png" class="img-circle" id="chat-aim" data-social-type="8" onclick="filterSocial(this)"></div>
    </div>
    <div id="div-contact-scroll-left"></div>
</div>
<div id="ContentPanel" class="div-box-center"></div>

<style>
    #body_container_0{
        overflow: hidden;
    }
</style>
<script>
    $(document).ready(function(){
        //bootstrap tooltip
        $('[data-toggle="tooltip"]').tooltip();

        var height = $(document).height()-105;
        $('#div-contact-scroll-left').slimscroll({height: height, size:'5px', alwaysVisible:false});
        $('#div-contact-scroll-right').slimscroll({height: height, size:'5px', alwaysVisible:false});
        $('.div-box-center').height($("#div-box-left" ).height());

        // ----------------------- init tabs panel to content layout ---------------------
        $("#ContentPanel").append('<div id="jqxTabs"><ul><li>Home</li></ul><div></div></div>');
        $("#jqxTabs").jqxTabs({ theme:jqxTheme, height: '100%', width: '100%', showCloseButtons:true});
        $('#jqxTabs').jqxTabs('hideCloseButtonAt',0);

        //get contacts goes here
        loginStatus(function(){
            getFriendBySocialType(1,0,"","",function(result){
                func_viewContact(result,'div-contact-scroll-left',function(){
                    getGroupChat("","" ,function(results){
                        func_viewGetGroupChat(results,'div-contact-scroll-left',function(){
                            viewChatNotifications();
                        });
                    });
                });
                func_addTab('','','','loadingTab','','','');
                isConnection = 'connected';
            },'div-contact-scroll-left');

        },isConnection);

        //login with google account
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
    });

    /*-----------------function get tabtitle--------------*/
    var func_getTabtitle = function(accID){
        var tabTitle = accID.getAttribute('data-title');
        var socialTypeID = accID.getAttribute('data-socialAccountTypeID');
        var friendID = accID.getAttribute('data-friendID');
        var sourceFriendID = accID.getAttribute('data-sourceFriendID');
        var chatType = accID.getAttribute('data-func_type');
        var SIPUser = accID.getAttribute('data-sipuser');
        func_addTab(tabTitle,friendID,sourceFriendID,'',chatType,SIPUser,socialTypeID);
        getUnreadChatNotification(friendID,socialTypeID,tabTitle);
    }


</script>