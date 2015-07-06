<script>
    $(document).ready(function(){
        $('#results-div').html('');
        var objICQ = JSON.parse(localStorage['objICQ']);
        var found = 0;
        var icqResult = '';
        $.each(objICQ.data,function(index,value) {
            var displayName = value.DisplayName;
            var imageAvatar = '<img src="<?php echo base_url();?>assets/image/icons/defaultImg.gif">';
            icqResult +='<div class="friend-tr-block">';
            icqResult +='<div class="fb-imageAvatar twt-feed">'+imageAvatar+'</div>';
            icqResult +='<div class="fb-friends-name">'+displayName+'</div>';
            icqResult +='<div class="fb-addFriend"><img src="assets/image/Sync/check_02.png"></div>';
            icqResult +='</div>';
            found++;
        });
        if(found == 0) {
            $('#results-div').html("<div id='search-not-found'>You don't have any friends in your contact list</div>");
        } else {
            $('#results-div').append(icqResult);
            $('#header-title').html('Your ICQ Contacts');
        }
    });
</script>