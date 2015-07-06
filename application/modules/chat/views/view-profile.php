<div id="contacts-background"></div>
<div style="top:45%;position: absolute;width: 100%">
    <div style="width: 20%;display: inline-block">
        <div style="text-align: center;position: absolute;top: -33%;padding: 0 10px">
            <div id="image-avartar"></div>
            <div id="display-name"></div>
        </div>
    </div>
    <div class="float-right" style="width: 20%">
        <div class="view-contact-right"><a href="javascript:void(0)">Profile</a></div>
        <div class="view-contact-right"><a href="javascript:void(0)">Media</a></div>
        <div class="view-contact-right"><a href="javascript:void(0)">History</a></div>
    </div>
    <div style="width:40%" class="float-right">
<!--        <div class="view-contact-right"><a href="javascript:void(0)">Send a Message</a></div>-->
    </div>
    <div style="border-bottom: 3px solid darkgray;padding-top:30px"></div>
    <div id="div-scroll-contact-profile">
        <div class="profile-label-block">
            <div class="contact-header">Profile</div>
            <div class="clear-both"></div>
            <div class="border-bottom">
                <div class="float-left profile-text">Screen name</div>
                <div class="float-right" id="screen-name"></div>
            </div>
            <div class="border-bottom">
                <div class="float-left profile-text">First name</div>
                <div class="float-right" id="first-name"></div>
            </div>
            <div class="border-bottom">
                <div class="float-left profile-text">Last name</div>
                <div class="float-right" id="last-name"></div>
            </div>
            <div class="border-bottom">
                <div class="float-left profile-text">Gender</div>
                <div class="float-right" id="gender"></div>
            </div>
            <div class="border-bottom">
                <div class="float-left profile-text">Birthday</div>
                <div class="float-right" id="birthday"></div>
            </div>
            <div class="border-bottom">
                <div class="float-left profile-text">Country</div>
                <div class="float-right" id="country"></div>
            </div>
        </div>
    </div>
</div>
<script>
    $(function(){
        var SIPUser = '<?php echo $SIPUser;?>';
        $('#div-scroll-contact-profile').slimscroll({
            position: 'right',
            height: '280',
            size:'10px',
            alwaysVisible: true
        });

        getProfileBySIP(SIPUser,function(contacts){
                var contactBackground = contacts.data.ImageCover !='' ? '<img src="'+contacts.data.ImageCover+'" height="200px" width="788">':'';
                var imageAvartar = contacts.data.ImageAvatar !='' ? '<img src="'+contacts.data.ImageAvatar+'" class="img-circle" width="110" height="110">':'<img src="assets/image/icons/defaultImg.gif" class="img-circle" width="110" height="110">';
                $('#contacts-background').append(contactBackground);
                $('#image-avartar').append(imageAvartar);
                $('#display-name').append(contacts.data.DisplayName);
                $('#screen-name').append(contacts.data.DisplayName);
                $('#first-name').append(contacts.data.FirstName);
                $('#last-name').append(contacts.data.LastName);
                $('#gender').append(contacts.data.Gender);
                $('#birthday').append(contacts.data.BirthDate);
                $('#country').append(contacts.data.Country);
        });
    });
</script>
<style>

</style>