<div class="main-chat-body" id="main-chat-body_<?php echo $friendId;?>">
    <div class="chat-settings">
        <div style="display:inline-block;width: 100%;position: relative">
            <div class="chat-settings-pic"><div class="chat-video-call-img" id="btn-video-call_<?php echo $friendId;?>"></div></div>
            <div class="chat-settings-pic"><div class="chat-audio-call-img" id="btn-audio-call_<?php echo $friendId;?>"></div></div>
            <div class="chat-settings-pic"><div class="chat-sms-img" id="btn-sms_<?php echo $friendId;?>"></div></div>
            <div class="chat-settings-pic"><div class="chat-email-img" id="btn-email_<?php echo $friendId;?>"></div></div>
            <div class="chat-settings-pic">

                <div class="chat-more-options-img" id="chat-more-options-img_<?php echo $friendId;?>"></div>
                <div class="setting-noti-main" id="setting-noti-main_<?php echo $friendId;?>">
                    <div class="more-setting-circle" id="more-setting-circle_<?php echo $friendId;?>"></div>
                    <div class="chat-setting-header"></div>
                    <div class="chat-setting-body">
                        <div class="chat-more-setting-label" data-background-chat="gallery" data-chatType="<?php echo $chatType;?>" data-friendID="<?php echo $friendId;?>" onclick="popChatBackground(this)">Chang Background</div>
                        <div class="chat-more-setting-label" onclick="deleteConversation(this);" data-chatType="<?php echo $chatType;?>" data-friendID="<?php echo $friendId;?>">Delete Conversation</div>
                        <?php
                        if($SIPUser != ""){ ?>
                            <div class="chat-more-setting-label" onclick="popSendSMS(this)" data-chatType="<?php echo $chatType;?>" data-friendID="<?php echo $friendId;?>">SMS</div>
                            <div class="chat-more-setting-label" onclick="popBlockContact(this)" data-chatType="<?php echo $chatType;?>" data-friendID="<?php echo $friendId;?>">Block Contact</div>
                            <div class="chat-more-setting-label" onclick="viewProfile(this)" data-SIP="<?php echo $SIPUser;?>" data-friendID="<?php echo $friendId;?>">View Profile</div>
                        <?php
                        }
                        ?>
                    </div>
                </div>
            </div>

            <div class="chat-settings-pic add-contact-icon" onclick="func_showGroupUI(this)" id="groupId<?php echo $friendId;?>" data-addG="add_<?php echo $friendId;?>"></div>
            <div class="chat-settings-pic" id="chat-radius-background_<?php echo $friendId;?>" style="display: none;">&nbsp;</div>
        </div>

    </div>
    <div class="chat-container" id="msgResult_<?php echo $friendId;?>"></div>
    <!-- Chat notification left panel-->
    <div class="notificationContainer" id="notification-container-left<?php echo $friendId;?>">
        <div class="notificationTitle" id="notificationTitle<?php echo $friendId;?>">
            <div class="float-left">Stickers</div>
            <div class="float-right" id="emojis"></div>
        </div>
        <div id="notificationsBody<?php echo $friendId;?>" class="notificationsBody">
            <?php
            $img_dir = "./assets/image/sticker/ant/";
            function createDir($path,$chatType)
            {
                if ($handle = opendir($path))
                {
                    echo "<ul id='ul-sticer'>";

                    while (false !== ($file = readdir($handle)))
                    {
                        if (is_dir($path.$file) && $file != '.' && $file !='..')
                            printSubDir($file, $path,$chatType);
                        else if ($file != '.' && $file !='..')
                            $queue[] = $file;
                    }

                    printQueue($queue, $path,$chatType);
                    echo "</ul>";
                }
            }

            function printQueue($queue, $path,$chatType)
            {
                foreach ($queue as $file)
                {
                    printFile($file, $path,$chatType);
                }
            }

            function printFile($file, $path,$chatType)
            {
                echo "<li><a href='".$path.$file."' id='".$file."' data-chatType='".$chatType."' data-filename='".$file."' onclick='func_sentSticker(this)'><img src='".$path.$file."'></a></li>";
            }

            function printSubDir($dir, $path,$chatType)
            {
                echo "<li><span class=\"toggle\">$dir</span>";
                createDir($path.$dir."/",$chatType);
                echo "</li>";
            }
            createDir($img_dir,$chatType);

//            createDir($img_dir1);

            ?>

        </div>
        <div class="notificationFooter" id="notificationFooter<?php echo $friendId;?>"></div>
    </div>

    <div class="background-input-chat" id="background-input-chat_<?php echo $friendId;?>">
        <form name="sendFileForm" id="sendFileForm_<?php echo $friendId;?>" action="" method="post" enctype="multipart/form-data">
            <div class="input-header" id="notification-left<?php echo $friendId;?>">
                <div class="smile-icon" id="smile<?php echo $friendId;?>"></div>
            </div>
            <div class="textarea-chat">
                <input type="text" id="message_<?php echo $friendId;?>" name="message_<?php echo $friendId;?>" autofocus="on" autocomplete="off">
            </div>
            <div class="end-input">
                <div class="attachment-file-icon" id="attachment-file-icon_<?php echo $friendId;?>">
                    <input type="file" id="file_<?php echo $friendId;?>" name="file_<?php echo $friendId;?>" data-socialTypeID="<?php echo $socialTypeID;?>" data-chatType="<?php echo $chatType;?>" data-friendID="<?php echo $friendId;?>" onchange="sendFile(this)">
                </div>
            </div>
            <div class="send-msg-icon" id="btn-send_<?php echo $friendId;?>" data-chatType="<?php echo $chatType;?>" data-socialTypeID="<?php echo $socialTypeID;?>" data-friendID="<?php echo $friendId;?>" onclick="sendTextChat(this)"></div>
        </form>

    </div>

</div>
<div class="div-box-right add_<?php echo $friendId;?>" id="chat-box-right">
    <div class="chat-contact-block">
        <div class="float-left padding-top-8">Add contact</div>
        <div class="float-right" onclick="func_ShowForm(this)" data-act="LoadGMember" data-result="get-friend-result-<?php echo $friendId;?>"><img src="<?php echo base_url()?>assets/image/icons/Addfile_icon.png" class="img-circle" width="32" height="32"></div>
    </div>

    <!--form search-->
    <div class="get-friend-result" id="get-friend-result-<?php echo $friendId;?>">
        <div class="chat-contact-block border-butt">
            <div class="float-left ">
                <input type="text" id="search-friend<?php echo $friendId;?>" autofocus="true" autocomplete="off" placeholder="Search">
            </div>
            <div class="float-right " style="margin: 5px;cursor: pointer"><img src="<?php echo base_url();?>assets/image/Sync/magnifier_01.png" data-friendID="<?php echo $friendId;?>" onclick="searchContact(this)"></div>
        </div>
        <div class="chat-contact-block add-result" id="add-result<?php echo $friendId;?>">

        </div>
        <div id="div-contact-scroll-right">
            <div class="" id="results-div<?php echo $friendId;?>"></div>
        </div>
        <div class="chat-contact-block get-friend-result" id="div-add-result<?php echo $friendId;?>" data-chatType="<?php echo $chatType;?>" onclick="func_createGroup(this)" data-userId="<?php echo $friendId;?>">

        </div>
    </div>

    <?php

    if($chatType == "GroupChat"){
        echo "<div class='chat-contact-block div-groupmember'>";
        echo "<div class='float-left padding-top-8'>Group Member <span id='groupNum".$friendId."'></span></div>";
        echo "<div class='float-right' onclick='func_ShowForm(this)' data-act='LoadGMember' data-result='results-div-Group".$friendId."'>";
        echo "<img src='".base_url()."assets/image/icons/Addfile_icon.png' class='img-circle' width='32' height='32'></div>";
        echo "</div>";
        echo "<div id=\"div-contact-scroll-right\">";
        echo "<div  id='results-div-Group".$friendId."' ></div>";
        echo "</div>";
    }
    ?>
</div>

<script>
    $(document).ready(function(e){
        $('#emojis').emojiarea();



        var friendId = '<?php echo $friendId;?>';
        var itemResult = $("#msgResult_"+friendId);
        var height = $( "#div-box-left" ).height() -120;
        var scrollToHeight = itemResult.prop('scrollHeight') + 'px';
        itemResult.slimscroll({scrollTo : scrollToHeight, height:height, position: 'right', start: 'bottom'});

        // ---------enter key --------
        $('input#message_'+friendId).keydown(function(e){
            var locFriendId = localStorage['friendId'];
            if(locFriendId == friendId){
                if(e.keyCode == '13'){
                    e.preventDefault();
                    $('#btn-send_'+friendId).trigger('click');
                }
            }else{
                console.log(locFriendId + '___' + friendId);
            }
        });


        //Chat notification sticker
        $("#notification-left"+friendId).click(function() {
            $("#notification-container-left"+friendId).fadeToggle(300,'swing',function(){
                $("#notification-container-right"+friendId).fadeOut();
            });
            return false;
        });
        $(document).click(function() {
            $("#notification-container-left"+friendId).hide();
            $("#notification-header").hide();
        });
        //Popup Click
        $("#notification-container-left"+friendId).click(function() {
            return false;
        });

        $('#chat-more-options-img_'+friendId).click(function () {
            $('#chat-more-options-img_'+friendId).hide();
            $('#setting-noti-main_'+friendId).show();
        });

        $('#more-setting-circle_'+friendId).click(function () {
            $('#chat-more-options-img_'+friendId).show();
            $('#setting-noti-main_'+friendId).hide();
        });
    });



    var GroupChat = {data:[]};
    var checkp = 0;
    var addContact = function(userId){
        var friendId = localStorage.getItem('friendId');
        var tabIndex = localStorage.getItem('tabIndex');
        var tabtile = localStorage.getItem('tabtile');
        var jstabtile = JSON.parse(tabtile);
        var def_title = jstabtile.data[tabIndex -1].title;
        var eventAct = userId.getAttribute("data-action");
        var addId = userId.getAttribute("data-userId");
        var addName = userId.getAttribute("data-userName");
        var statusId = false;

        if(eventAct == "addContact"){
            //if you add fri into list chat to create group chat
            if(GroupChat.data.length == 0){

                var friendList = [{"title":def_title,"friendId":friendId},{"title":addName,"friendId":addId}];
                var ArrfriendId =[{"addId":JSON.stringify(friendList),friendId:friendId}];
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

                    var friendList = [{"title":def_title,"friendId":friendId},{"title":addName,"friendId":addId}];
                    var ArrfriendId =[{"addId":JSON.stringify(friendList),friendId:friendId}];
                    GroupChat.data[GroupChat.data.length]= ArrfriendId;
                }
            }
            var addImgUrl = userId.getAttribute("data-Url");

            if(addImgUrl == '' || addImgUrl == null){
                addImgUrl = 'assets/image/icons/defaultImg.gif';
            }
            console.log(addImgUrl);
            $('#add-result'+friendId).append('<img src="' + addImgUrl+ '" alt="" id="img'+addId+'" class="img-circle addImg">');
            console.log(GroupChat);
        }else{
            console.log(GroupChat.data.length);
            //if you remove fri into list chat to create group chat
            for(checkp =0; checkp < GroupChat.data.length; checkp++){

                $.each(GroupChat.data[checkp],function(index, value){
                    if(value.friendId == friendId){
                        var jsObj = JSON.parse(value.addId);
                        var idx =0;
                        console.log(jsObj);
                        $.each(jsObj,function(indexs,values){
                            console.log(indexs+'-'+idx);
                            if(idx == indexs){
                                if(values.friendId == addId){
                                    jsObj.splice(idx ,1);
                                    $('#img'+addId).remove();
                                    console.log('remove friend ID : '+ values.friendId + '= '+ addId + idx);
                                    GroupChat.data[checkp][0].addId = JSON.stringify(jsObj);
                                    //$('#add-result'+friendId).html('');
                                    console.log(GroupChat);
                                    return false;
                                }
                            }

                            idx++;
                        });

                    }
                });
            }
        }
        $('#imgCheck'+addId).fadeToggle('fast');
    }

    var func_createGroup = function(userId){

        var addUserId =  userId.getAttribute('data-userId');
        var friendId = localStorage.getItem('friendId');
        var dt_chatType = userId.getAttribute('data-chatType');
        var GroupName = "<?php
            $username = $this->session->userdata('username');
            echo $username;
            ?>";
        var addMember = new Array();
//        console.log(GroupName);
        if(GroupChat.data.length>0){
            for(checkp =0; checkp < GroupChat.data.length; checkp++){
                $.each(GroupChat.data[checkp],function(index, value){
                    if(value.friendId == friendId){
                        var jsObj = JSON.parse(value.addId);
                        console.log(jsObj);
                        $.each(jsObj, function(index , values){
                            if(GroupName == ""){
                                GroupName =values.title;
                            }else{
                                GroupName += ','+values.title;
                            }
                            addMember.push(values.friendId);
                        });
                    }
                });

            }
        }
        if(addMember.length > 1){

            if(dt_chatType =='GroupChat'){

                var groupMembers = addMember.slice(1,addMember.length);

                addContactToGroupChat(friendId,groupMembers);
                $('.jqx-icon-close').trigger( "click" );
            }else{
//                func_createGroupChat(1,"","",addMember,function(reslut){
//
//                    var userData = reslut.data;
//                    var val_groupID = userData.groupID;
//                    var val_groupName = userData.groupName;
//                    var val_owerID = userData.ownerID;
//
//
//                });

                console.log(addMember);
            }

        }else{
//            console.log(addMember);
        }
    }
    func_TabClick();
    func_TabRemove();
</script>


<style>
    .jqx-tabs-content-element.jqx-rc-b{overflow: hidden;}
</style>

