<script>
    $(document).ready(function(){
        $('#results-div').html('');
        var objYahoo = JSON.parse(localStorage['objYahoo']);
        var found = 0;var result = '';
        $.each(objYahoo.data,function(index,value) {
            var displayName = value.UserID;
            var imageAvatar = '<img src="'+value.ImageAvatar+'" class="img-circle" width="40" height="40">';

            result +='<div class="friend-tr-block">';
            result +='<div class="fb-imageAvatar twt-feed">'+imageAvatar+'</div>';
            result +='<div class="fb-friends-name">'+displayName+'</div>';
            result +='<div class="fb-addFriend"><img src="assets/image/Sync/check_02.png"></div>';
            result +='</div>';
            found++;
        });
        if(found == 0) {
            $('#results-div').html("<div class='no-contact-result'>You don't have any friends in your contact list</div>");
        } else {
            $('#results-div').append(result);
            $('#header-title').html('Your Yahoo! messenger Contacts');
        }
    });

</script>