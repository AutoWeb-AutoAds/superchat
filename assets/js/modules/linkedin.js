/**
 * Created by Sundara on 3/30/2015.
 */
function liAuth(){
    //
    IN.User.authorize(function(){
        callback();
    });
    //IN.UI.Authorize().place();
}
// Setup an event listener to make an API call once auth is complete
function onLinkedInLoad() {
    IN.Event.on(IN, "auth", getProfileData);
}

// Handle the successful return from the API call
function onSuccess(data) {
    console.log(data);
}

// Handle an error response from the API call
function onError(error) {
    console.log(error);
}

// Use the API call wrapper to request the member's basic profile data
function getProfileData() {
    IN.API.Profile("me").fields("firstName" , "lastName", "industry", "location:(name)", "picture-url", "headline", "summary", "num-connections", "public-profile-url", "distance", "positions", "email-address", "educations", "date-of-birth").result(onSuccess).error(onError);
}


$('#linkedIn').click(function(){
    liAuth();
});