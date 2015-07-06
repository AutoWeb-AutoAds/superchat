<div id="send-chat-to-phone">
        <div class="float-left"><input type="text" class="input-send-sms-text" id="country-code_<?php echo $friendId;?>" placeholder="Country Code +855" style="width: 320px" maxlength="4"></div>
        <div class="float-left"><input type="text" class="input-send-sms-text" id="phone-number_<?php echo $friendId;?>" placeholder="Enter number 15763638" style="width: 320px" maxlength="12"></div>
        <div class="clear-both"></div>
        <div class="float-left"><textarea placeholder="Type message here..." style="height:80px;width: 320px;" class="input-send-sms-text" id="send-content_<?php echo $friendId;?>"></textarea></div>
        <div class="clear-both"></div>
        <div class="div-btn-signin float-left" id="btn-send-sms_<?php echo $friendId;?>">Send</div>
        <div class="clear-both"></div>
        <div class="send-sms-success" id="send-message-status_<?php echo $friendId;?>"></div>
</div>

<script>

    $(document).ready(function(){
        var friendId = '<?php echo $friendId;?>';
        $('#btn-send-sms_'+friendId).on('click',function(e){
            e.preventDefault();
            var phone = $('#phone-number_'+friendId).val();
            if(phone.charAt(0)==0){
                phone = phone.substring(1);
            }
            var countryCode = $('#country-code_'+friendId).val();
            var content = $('#send-content_'+friendId).val();
            if(countryCode != ''){
                $('#country-code_'+friendId).removeClass('input-errors');
            }else{
                $('#country-code_'+friendId).addClass('input-errors');
                $('#country-code_'+friendId).focus();
                return false;
            }
            if(phone != ''){
                $('#phone-number_'+friendId).removeClass('input-errors');
            }else{
                $('#phone-number_'+friendId).addClass('input-errors');
                $('#phone-number_'+friendId).focus();
                return false;
            }
            if(content != ''){
                $('#send-content_'+friendId).removeClass('input-errors');
            }else{
                $('#send-content_'+friendId).addClass('input-errors');
                $('#send-content_'+friendId).focus();
                return false;
            }

            var destinationNumber = countryCode+phone;
            sendSMS(content,destinationNumber,countryCode);
        });

        $('#send-content_'+friendId).keydown(function(e){
            if(e.keyCode == 13){
                $('#btn-send-sms_'+friendId).trigger('click');
            }
        });
    });
</script>