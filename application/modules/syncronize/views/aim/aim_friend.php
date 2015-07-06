<script>
    $(document).ready(function(){
        $('#results-div').html('');
        var objAIM = JSON.parse(localStorage['objAIM']);
        var found = 0;
        var aimResult = '';
        $.each(objAIM.data,function(index,value) {
            var displayName = value.DisplayName != '' ? value.DisplayName:value.UserID;
            var imageAvatar = '<img src="<?php echo base_url();?>assets/image/icons/defaultImg.gif">';
            aimResult +='<div class="friend-tr-block">';
            aimResult +='<div class="fb-imageAvatar twt-feed">'+imageAvatar+'</div>';
            aimResult +='<div class="fb-friends-name">'+displayName+'</div>';
            aimResult +='<div class="fb-addFriend"><img src="assets/image/Sync/check_02.png"></div>';
            aimResult +='</div>';
            found++;
        });
        if(found == 0) {
            $('#results-div').html("<div id='search-not-found'>You don't have any friends in your contact list</div>");
        } else {
            $('#results-div').append(aimResult);
            $('#header-title').html('Your AIM Contacts');
        }
    });
</script>