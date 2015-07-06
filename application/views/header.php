<script>
    $(document).ready(function(){
        $("#messageNotification").jqxNotification({
            width: 270, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 16000, template: ""
        });

        var tabModuleId = $.jqx.cookie.cookie('tabModuleId');
        if(undefined == tabModuleId) tabModuleId = 0;
        $('#jqxTabsModules').jqxTabs({animationType: 'fade','selectedItem':tabModuleId });

        var loadDefaultModule = '<?php echo base_url();?>chat/index';
        var loadExistedTab;
        if(tabModuleId == 1) {
            loadExistedTab = '<?php echo base_url();?>file/index';
            $('#label-header-left').html(fileLbl);
        }else if(tabModuleId == 2) {
            loadExistedTab = '<?php echo base_url();?>syncronize/index';
            $('#label-header-left').html(contactLbl);
        }else if(tabModuleId == 3){
            loadExistedTab = '<?php echo base_url();?>profile/index';
            $('#label-header-left').html(profileLbl);
        }else if(tabModuleId == 4){
            loadExistedTab = '<?php echo base_url();?>livestream/index';
            $('#label-header-left').html(liveStreamLbl);
        }else if(tabModuleId == 5){
            loadExistedTab = '<?php echo base_url();?>whiteboard/index';
            $('#label-header-left').html(whiteBoardLbl);
        }

        if(tabModuleId != 0){
            loadTabModule(loadExistedTab,tabModuleId);
        }else{
            loadTabModule(loadDefaultModule,0);
            $('#label-header-left').html(chatLbl);
        }

        //On select tab module
        $('#jqxTabsModules').on('selected',function(event){
            var pageIndex = event.args.item;
            var pageUrl;
            if(pageIndex == 1){
                pageUrl = '<?php echo base_url();?>file/index';
                $('#label-header-left').html(fileLbl);

            } else if(pageIndex == 2) {
                pageUrl = '<?php echo base_url();?>syncronize/index';
                $('#label-header-left').html(contactLbl);
            } else if(pageIndex == 3) {
                pageUrl = '<?php echo base_url();?>profile/index';
                $('#label-header-left').html(profileLbl);
            }else if(pageIndex == 4) {
                pageUrl = '<?php echo base_url();?>livestream/index';
                $('#label-header-left').html(liveStreamLbl);
            }else if(pageIndex == 5){
                pageUrl = '<?php echo base_url();?>whiteboard/index';
                $('#label-header-left').html(whiteBoardLbl);
            } else {
                pageUrl = loadDefaultModule;
                $('#label-header-left').html(chatLbl);
            }

            loadTabModule(pageUrl,pageIndex);

            //Call save tab module in order to insert tabID into cookie
            saveTabModule(pageIndex);
        });

        $("#logout").click(function() {
            localStorage.clear();
           $.ajax({
               url: 'login/func_logout',
               type: 'POST',
               data:{logout:'logout'},
               success: function(result){
                   location.href='<?php echo base_url();?>';
               }
           });
        });

        //Notification bell
        $("#notification-bell").click(function() {
            $('#notification-bell').hide();
            $('#main-div').fadeIn();
        });

        $("#circle-click").click(function() {
            $('#notification-bell').fadeIn();
            $('#main-div').hide();
        });

        //Slim scroll for notification
        $('#div-header-notifications').slimscroll({
            height: 240,
            size:'5px',
            alwaysVisible:true
        });


        //bootstrap tooltip
        $('[data-toggle="tooltip"]').tooltip();
    });


</script>
<div class="layout-wrapper" id="layout-wrapper">
    <div id="label-header-right">
        <div class="notification-bell"><img src="<?php echo base_url();?>assets/image/icons/Nofitication_active.png" id="notification-bell"></div>
        <div class="main-div" id="main-div">
            <div class="header-click"><div class="circle-click" id="circle-click"></div> </div>
            <div class="body-back-div">
                <div id="logout" class="notification-label logout"><label>Logout</label></div>
                <div id="div-header-notifications">
                    <div id="div-notification-result"></div>
                </div>

            </div>
        </div>
    </div>

    <div id="label-header-left"></div>
    <div id="jqxTabsModules">
        <ul id="ul-module">
            <li data-toggle="tooltip" data-placement="bottom" title="Chat"><img width="32" height="32" src="<?php echo base_url();?>assets/image/Sync/menu_chats_01.png" id="chat"></li>
            <li data-toggle="tooltip" data-placement="bottom" title="File"><img width="32" height="32" src="<?php echo base_url();?>assets/image/Sync/menu_media_01.png" id="file"></li>
            <li data-toggle="tooltip" data-placement="bottom" title="Syn Contact"><img width="32" height="32" src="<?php echo base_url();?>assets/image/Sync/menu_contacts_01.png" id="sync"></li>
            <li data-toggle="tooltip" data-placement="bottom" title="Profile"><img width="32" height="32" src="<?php echo base_url();?>assets/image/Sync/menu_profile_01.png" id="profile"></li>
            <li data-toggle="tooltip" data-placement="bottom" title="Live Stream"><img width="32" height="32" src="<?php echo base_url();?>assets/image/Sync/liveStream_icon_01.png" id="live-stream"></li>
            <li data-toggle="tooltip" data-placement="bottom" title="White board"><img width="32" height="32" src="<?php echo base_url();?>assets/image/icons/whiteboard.png" id="white-board"></li>
        </ul>

        <div id="body_container_0"></div>
        <div id="body_container_1"></div>
        <div id="body_container_2"></div>
        <div id="body_container_3"></div>
        <div id="body_container_4"></div>
        <div id="body_container_5"></div>
    </div>

    <div>
        <div id="altNoti">
            <div id="messageNotification">
                <div id="msg_notifi"></div>
            </div>
        </div>
    </div>
</div>