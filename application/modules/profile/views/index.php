<script>
    $(document).ready(function(){
        $('#div-profile-box-left').slimscroll({
            position: 'right',
            height: $(document).height()-60,
            size:'5px'
        });
        $('#div-profile-box-right').slimscroll({
            position: 'right',
            height: $(document).height()-250,
            size:'5px'
        });

        //image cover file
        $('#CoverFile').on('change',function(){
            getAWSToken(function(awsData){
                $('#frm-my-profile').ajaxForm({
                    url: basePath + '/profile/updateImageCover',
                    target:'#div-my-cover-img',
                    data:{AccessKeyId:awsData.data.AccessKeyId,SecretAccessKey:awsData.data.SecretAccessKey,SessionToken:awsData.data.SessionToken,userId:localStorage['user_id']},
                    success:function(response) {
                        var fileName = $('#aws-img-cover').attr('src').split('/');
                        var fileUrl = amazoneSuperchatDev+'/'+localStorage['user_id']+'/'+fileName[5];
                        updateImageCover(localStorage['access_key'],fileUrl,fileName[5]);
                    }
                }).submit();
            });
        });

        //image avartar
        $("#imageAvatar").on('change',function(){
            getAWSToken(function(awsData){
                $('#frm-my-profile').ajaxForm({
                    target:'#div-main-img-avartar',
                    url: basePath + '/profile/updateImageAvatar',
                    data:{AccessKeyId:awsData.data.AccessKeyId,SecretAccessKey:awsData.data.SecretAccessKey,SessionToken:awsData.data.SessionToken,userId:localStorage['user_id']},
                    success:function(response) {
                        var fileName = $('#aws-img-avartar').attr('src').split('/');
                        var fileUrl = amazoneSuperchatDev+'/'+localStorage['user_id']+'/'+fileName[5];
                        updateImageAvatar(localStorage['access_key'],fileUrl,fileName[5]);
                    }
                }).submit();
            });
        });

        loginStatus(function(){
            getProfile(function(result){
                var results = result.data;
                if(result.code == 1){
                    isConnection = 'connected';
                    var imgCover = result.data.ImageCover !='' ? '<img src="'+result.data.ImageCover+'" alt="">':'';
                    $('#div-my-cover-img').append(imgCover);
                    var mainImgAvartar = result.data.ImageAvatar != '' ? '<img src="'+result.data.ImageAvatar+'" class="img-circle" width="110" height="110">':'<img src="<?php echo base_url();?>assets/image/icons/defaultImg.gif" class="img-circle" width="110" height="110">';
                    $('#div-main-img-avartar').append(mainImgAvartar);
                    $('#div-display-name').append(result.data.DisplayName);
                    $('#div-m-online').append("Hey'y all I am on superchat now!");

                    //list of image avartar
                    var avartarFile = '';
                    for(var k = 1 ; k <result.data.AvatarFile.length; k++){
                        var fileUrl = '<img src="'+result.data.AvatarFile[k].FileUrl+'" class="img-circle" width="50" height="50" alt="">';
                        var resultAvartar = result.data.AvatarFile[k].FileUrl.split('/');
                        if(resultAvartar[5] != 'Array'){
                            avartarFile +='<div class="list-img-avartar">'+fileUrl+'</div>';
                        }
                    }
                    var activeAvartar = result.data.ImageAvatar != '' ? '<img src="'+result.data.ImageAvatar+'" class="img-circle" width="50" height="50">':'<img src="<?php echo base_url();?>assets/image/icons/defaultImg.gif" class="img-circle" width="50" height="50">';
                    var imgAvartarStr = '';
                    imgAvartarStr +='<div class="list-img-avartar">'+activeAvartar+'</div>';
                    imgAvartarStr +='<div class="list-img-avartar"><img src="<?php echo base_url();?>assets/image/icons/Addfile_icon.png" class="img-circle" width="50" height="50" style="cursor: pointer;" onclick="triggerClick(imageAvatar)"></div>';
                    avartarFile +=imgAvartarStr;
                    $('#div-list-img-avartar').append(avartarFile);

                    //list of image cover
                    var coverFile = '';
                    for(var c = 1 ; c <result.data.CoverFile.length ; c++){
                        var fileUrl = '<img src="'+result.data.CoverFile[c].FileUrl+'" class="img-circle" width="50" height="50" alt="">';
                        var resultCover = result.data.CoverFile[c].FileUrl.split('/');
                        if(resultCover[5] != 'Array'){
                            coverFile +='<div class="list-img-avartar">'+fileUrl+'</div>';
                        }
                    }
                    var secCover = result.data.ImageCover != '' ? '<div class="list-img-avartar"><img src="'+result.data.ImageCover+'" class="img-circle" width="50" height="50"></div>':'';
                    secCover +='<div class="list-img-avartar"><img src="<?php echo base_url();?>assets/image/icons/Addfile_icon.png" class="img-circle" width="50" height="50" style="cursor: pointer;" onclick="triggerClick(CoverFile)"></div>';
                    coverFile +=secCover;
                    $('#div-list-img-conver').append(coverFile);

                }
            },function(){

            },localStorage['user_id'],localStorage['access_key'])

        },isConnection);
    });

</script>
<div class="div-box-left">
    <div id="div-profile-box-left">
        <div class="gong-hey-container">
            <div class="no-contact-yet"><img src="../../assets/image/icons/Oooop_icon.png" width="100" height="100"></div>
            <div class="gong-hey-header">Gong Hey!</div>
            <div class="no-contact-darkgray">Now let's setup your profile</div>
        </div>
    </div>
</div>

<div class="div-wraper-container" id="div-wraper-container">
    <div id="div-my-cover-img"></div>
    <div id="div-main-avartar-container">
        <div id="div-main-img-avartar"></div>
        <div id="div-display-name"></div>
        <div id="div-m-online"></div>
    </div>
    <form action="" method="post" enctype="multipart/form-data" id="frm-my-profile">
        <input type="file" id="imageAvatar" name="imageAvatar" style="display: none;">
        <input type="file" id="CoverFile" name="CoverFile" style="display: none">
        <div style="padding-top:120px;" id="div-profile-box-right">
            <div class="border-thin"></div>
            <div class="your-profile-block">
                <div class="profile-label-header">Profile Picture</div>
                <div class="profile-border"></div>
                <div class="profile-text">Chose your Profile Picture or add a new one</div>
                <div id="div-list-img-avartar"></div>
                <div class="clear-both"></div>
                <div class="profile-border"></div>
            </div>
            <div class="your-profile-block">
                <div class="profile-label-header">Profile Background</div>
                <div class="profile-border"></div>
                <div class="profile-text">Chose your Profile Background or add a new one</div>
                <div id="div-list-img-conver"></div>
                <div class="clear-both"></div>
                <div class="profile-border"></div>
            </div>
            <div class="your-profile-block">
                <div class="profile-label-header">Overlay Color</div>
                <div class="profile-border"></div>
                <div class="profile-text">Chose the mood of your profile</div>
                <div class="your-profile-block">Light</div>
                <div class="your-profile-block"><img src="<?php echo base_url();?>assets/image/icons/Light_color.png" width="70" height="30"></div>
                <div class="your-profile-block"><input type="radio" name="choseMood" value="light" checked></div>
                <div class="clear-both"></div>
                <div class="your-profile-block">Dark</div>
                <div class="your-profile-block"><img src="<?php echo base_url();?>assets/image/icons/Dark_color.png" width="70" height="30"></div>
                <div class="your-profile-block"><input type="radio" name="choseMood" value="dark"></div>
                <div class="clear-both"></div>
                <div class="profile-border"></div>
            </div>
            <div class="clear-both"></div>
        </div>
    </form>
</div>