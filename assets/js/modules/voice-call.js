$(document).ready(function(){
    $('#voice-call-icon').on('click',function(){
        voiceCall();
    });
});
var voiceCall = function(){
    var friendToBeVoiceCall = localStorage['friendId'];
    //console.log(friendToBeVoiceCall);
}