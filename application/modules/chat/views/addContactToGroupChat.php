<script src="<?php echo base_url();?>assets/js/modules/superchat.js"></script>
<link href="<?php echo base_url();?>assets/css/synce.css" rel="stylesheet" />
<div id="addContactToGroupChat">
    <div class="add-cont-group">
        <div class="search-friend">
            <div class="synce-search-friend" id="synce-search-friend">
                <div class="input-container-synce">
                    <div class="float-left"><input type="text" id="search-friend" value="" class="input-text"></div>
                    <div class="float-left" style="margin: 5px 10px;cursor: pointer"><img src="<?php echo base_url();?>assets/image/Sync/magnifier_01.png" id="btn-Friend-toChat"></div>
                </div>
            </div>
            <div class="synce-search-friend" id="synce-search-friend">
                <div class="input-container-synce">
                    <div class="add-contact-add"><button id="addFriToGroup">Add Friend to Chat</button></div>
                </div>
            </div>
        </div>

        <div class=" float-left" id="search-friend-result">
            <div id="loading-div"><img src="<?php echo base_url();?>assets/jqx-lib/css/images/loader.gif"></div>
            <div class="" id="results-div"></div>
        </div>


    </div>

</div>

<script>
    $(document).ready(function(){

        $('#results-div').slimscroll({
            position: 'right',
            height: '350',
            width:'450',
            size:'8px',
            alwaysVisible: false
        });

        $('#btn-Friend-toChat').on('click',function(e){
            var txtSearch = $('#search-friend').val();
            searchFriendToAddChat(txtSearch,function(result){
                func_viewFriendSearch(result,'results-div');

            });

        });



    });

    var friendId = localStorage.getItem('friendId');
    var addTitle = new Array('<?php echo $userTitle;?>');
    var addMember = new Array(friendId);
    var addContact = function(userId){
        var addId = userId.getAttribute("data-userId");
        var addName = userId.getAttribute("data-userName");
        if(friendId != addId){
            addMember.push(addId);
            addTitle.push(addName);
            console.log(addMember);
            $('#id'+addId).fadeToggle(300,'swing',function(){
                $('#ch'+addId).show();
            });
        }

    }
    var subContact = function(userId){
        var addId = userId.getAttribute("data-userId");
        var addName = userId.getAttribute("data-userName");
        addMember = $.grep(addMember,function(elememnt, index){
            return elememnt !=addId;
        });
        addTitle = $.grep(addTitle,function(element,index){
            return element !=addName;
        });
        console.log(addMember);
        $('#ch'+addId).fadeToggle(300,'swing',function(){
            $('#id'+addId).show();
        });
    }
    $('#addFriToGroup').on('click',function(){
        var GroupName = "";
        if(addMember.length > 1){
            jQuery.each( addTitle, function( i, val ) {
                if(GroupName !=""){
                    GroupName += ","+val;
                }else{
                    GroupName += val;
                }
            });

                func_createGroupChat(1,GroupName,"",addMember,function(reslut){
                    console.log(reslut);
                    var userData = reslut.data;
                    var val_groupID = userData.groupID;
                    var val_groupName = userData.groupName;
                    var val_owerID = userData.ownerID;

                    var tabIndex = $.jqx.cookie.cookie('tabIndex');
                    var title = $('#jqxTabs').jqxTabs('getTitleAt',tabIndex);
                    var selectedTabIndex = ($('#jqxTabs').jqxTabs('selectedItem'));
                    var length = $('#jqxTabs').jqxTabs('length');

                    var selectItem = '/chat/chats/';
                    tabAjaxDataLoading(selectItem, 'jqxTabs', val_groupName, '', parseInt(length),val_groupID);
                    $('#jqxTabs').jqxTabs('addLast',val_groupName);//Add tab title
                    $('.jqx-icon-close').trigger( "click" );
                });
        }else{
            console.log(addMember);
        }
    });


</script>