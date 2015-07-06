<div>Once you delete your conversations, it can not undo. Are you sure you want to delete your conversations?</div>
<div class="clear-both"></div>
<div class="float-right">
    <button style="cursor: pointer;" data-chatType="<?php echo $chatType;?>" data-friendID="<?php echo $friendId;?>" onclick="deleteHistory(this)">Delete Conversation</button>
</div>
<script>
    var deleteHistory = function(data){
        var chatType = data.getAttribute('data-chatType');
        var dataID = data.getAttribute('data-friendID');
        if(chatType == 'chat'){
            clearPrivateChat(dataID);
            closeJqxWindowId('div-delete-conversation');
        }else{
            clearChatInGroupChat(dataID);
            closeJqxWindowId('div-delete-conversation');
        }
    }
</script>