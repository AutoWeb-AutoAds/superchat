<script>
    $(function(){
        $("#CoverFile").on('change',function(){
            getAWSToken(function(awsData){
                $('#frm-download-more').ajaxForm({
                    url: basePath + '/chat/saveChatBackground',
                    target:'#chat-bg-gallery',
                    data:{AccessKeyId:awsData.data.AccessKeyId,SecretAccessKey:awsData.data.SecretAccessKey,SessionToken:awsData.data.SessionToken,userId:localStorage['user_id']},
                    success:function(response) {
                        if(response){
//                            console.log(response);
                            var toID = $('#toID').val();
                            var isGroup = $('#isGroup').val();
                            var fileName = $('#aws-img-cover').attr('src').split('/');
                            var mimeType = fileName[5].split('.');
                            var backgroundOption = amazoneSuperchatDev+'/'+localStorage['user_id']+'/'+fileName[5];
                            saveChatBackground(toID,'gallery',backgroundOption,1,fileName,'10',mimeType[1],'',isGroup);
                        }
                    }
                }).submit();
            });
        });
    });
</script>

<div class="gallery-container">
    <div class="text-darkgray">Select a picture to make your background</div>
    <div id="chat-bg-gallery"></div>
</div>
<div class="download-more">
    <form id="frm-download-more" action="" enctype="multipart/form-data" method="post">
        <input type="file" id="CoverFile" name="CoverFile" style="display: none;">
        <input type="hidden" id="toID" value="<?php echo $friendId;?>">
        <input type="hidden" id="isGroup" value="<?php echo $chatType == 'chat' ? 0:1;?>">
        <div id="download-more" onclick="triggerClick('#CoverFile')">Download more...</div>
    </form>
</div>