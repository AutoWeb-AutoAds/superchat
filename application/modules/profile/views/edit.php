<script>
   $(document).ready(function(){
       $('#btn-cancel-profile').on('click',function(){
           loadTabModule(basePath + '/profile/index',3);
       });
       $('#div-add-emails').click(function(){
           addMultiTextBox('#to-div-email','emailsArr[]','removeEmail','E-mail');
       });
       $('#div-add-numbers').click(function(){
           addMultiTextBox('#to-div-number','numbersArr[]','removeNumber','Phone number');
       });

       if(localStorage['myProfiles'] != '' || localStorage['myProfiles'] != null) {
           var myProfiles = JSON.parse(localStorage['myProfiles']);
           $('#firstName').val(myProfiles.FirstName);
           $('#lastName').val(myProfiles.LastName);
           $('#middleName').val(myProfiles.MiddleName);
           if(myProfiles.Gender == 'M'){
               $('#male').attr('checked','checked');
           }else{
               $('#female').attr('checked','checked');
           }
           $('#Birthday').jqxDateTimeInput({
               width:'170px',
               height:'25px',
               value:myProfiles.BirthDate
           });
           $('#PhoneNumber').val(myProfiles.PhoneNumber);
           $('#Country').val(myProfiles.Country);
           $('#CountryCode').val(myProfiles.CountryCode);
           $('#Mood').val(myProfiles.Mood);

           // ---------------------- Multi Phone number and emails --------------------------
           if(myProfiles.Emails != undefined) {
               var secondaryEmails = '';
               for(var i = 0; i <myProfiles.Emails.length;i++){
                   var splits = myProfiles.Emails[i].split('@');
                   var repFirst = splits[0].replace('.','_');
                   var repSec = splits[1].replace('.','_');
                   secondaryEmails +='<div id="div_'+repFirst+repSec+'">';
                   secondaryEmails +='<div class="float-left">'+myProfiles.Emails[i]+'</div>';
                   secondaryEmails +='<div class="float-right"><input type="checkbox" class="chkEmails" value="'+myProfiles.Emails[i]+'"></div>';
                   secondaryEmails +='<div class="clear-both"></div>';
                   secondaryEmails +='</div>';
               }
               secondaryEmails +='<div class="float-right"><img src="<?php echo base_url();?>assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" style="cursor: pointer" id="btn-delete-emails" title="delete"></div>';
               $('#div-secondary-email').append(secondaryEmails);

           }
           if(myProfiles.PhoneNumbers != undefined) {
               var secondaryNumbers = '';
               for(var j = 0 ; j <myProfiles.PhoneNumbers.length ; j++){
                   var numberSplit = myProfiles.PhoneNumbers[j].replace(/\s/g,'');
                   secondaryNumbers +='<div id="div_'+numberSplit+'">';
                   secondaryNumbers +='<div class="float-left">'+myProfiles.PhoneNumbers[j]+'</div>';
                   secondaryNumbers +='<div class="float-right"><input type="checkbox" class="chkNumbers" value="'+myProfiles.PhoneNumbers[j]+'"></div>';
                   secondaryNumbers +='<div class="clear-both"></div>';
                   secondaryNumbers +='</div>';
               }
               secondaryNumbers +='<div class="float-right"><img src="<?php echo base_url();?>assets/jqx-lib/css/images/icon-delete.png" width="16" height="16" style="cursor: pointer" id="btn-delete-numbers" title="delete"></div>';
               $('#div-secondary-number').append(secondaryNumbers);

           }

           //delete emails address
           $('#btn-delete-emails').on('click',function(){
               var listEmails = new Array();
               $($('.chkEmails:checked')).map(function(){
                   listEmails.push($(this).val());
                   var splits = $(this).val().split('@');
                   var strF = splits[0].replace('.','_');
                   var strS = splits[1].replace('.','_');
                   var res = strF+strS;console.log(res);
                   $('#div_'+res).fadeOut('slow');
               });
               deleteEmails(listEmails);
           });

           //delete phone number
           $('#btn-delete-numbers').on('click',function(){
               var listNumbers = new Array();
               $($('.chkNumbers:checked')).map(function(){
                   listNumbers.push($(this).val());
                   var numReplaces = $(this).val().replace(/\s/g,'');
                   $('#div_'+numReplaces).fadeOut('slow');
               });
               deletePhoneNumbers(listNumbers);
           });
       }

       // -------------------------- Update profile ----------------------------
       $('#btn-save-profile').on('click',function(){
           var firstName = $('#firstName').val();
           var lastName = $('#lastName').val();
           var middleName = $('#middleName').val();
           var birthday = $('#Birthday').val();
           var dob = birthday.split('/');
           dob = dob[2] + '-' + dob[1] + '-' + dob[0];
           var gender = $('input[name=gender]:checked').val();
           var phoneNumber = $('#PhoneNumber').val();
           var country = $('#Country').val();
           var countryCode = $('#CountryCode').val();

           //General profile info
           updateProfile(firstName,lastName,middleName,dob,gender,phoneNumber,country,countryCode);

           //Mood
           addMood($('#Mood').val());

            //add emails
           var listEmails = new Array();
           $('input[name="emailsArr[]"]').each(function() {
               listEmails.push($(this).val());
           });
           addEmails(listEmails);

           //add phone numbers
           var listPhoneNumbers = new Array();
           $('input[name="numbersArr[]"]').each(function() {
               listPhoneNumbers.push($(this).val());
           });
           addPhoneNumbers(listPhoneNumbers);

           //if save success, call this function to index page
           loadTabModule('<?php echo base_url();?>profile/index',3);
       });
       $('#div-scroll').slimscroll({
           position: 'right',
           height: '200',
           size:'20px',
           alwaysVisible: true
       });

   });
</script>

<div id="div-scroll">
    <div class="profile-label-block">
        <div class="my-img-position">
            <div class="devided-label-left">First name</div>
            <div class="devided-label-right"><input type="text" id="firstName" class="input-text"></div>
        </div>
        <div class="my-img-position">
            <div class="devided-label-left">Last name</div>
            <div class="devided-label-right"><input type="text" id="lastName" class="input-text"></div>
        </div>
        <div class="my-img-position">
            <div class="devided-label-left">Middle name</div>
            <div class="devided-label-right"><input type="text" id="middleName" class="input-text"></div>
        </div>
        <div class="my-img-position">
            <div class="devided-label-left">Gender</div>
            <div class="devided-label-right">
                <label><input type="radio" name="gender" id="male" value="M">Male</label>
                <label><input type="radio" name="gender" id="female" value="F">Female</label>
            </div>
        </div>
        <div class="clear-both" style="margin-bottom:5px">&nbsp;</div>
        <div class="my-img-position">
            <div style="float:left;width: 10%">
                <div><img src="<?php echo base_url();?>assets/image/Profile/check_01.png" width="35" height="35" style="cursor: pointer" id="btn-save-profile"></div>
                <div class="profile-text">Save</div>
            </div>
            <div style="float:left;width: 10%">
                <div><img src="<?php echo base_url();?>assets/image/Profile/cancel_01.png" width="35" height="35" style="cursor: pointer" id="btn-cancel-profile"></div>
                <div class="profile-text">Cancel</div>
            </div>
        </div>
    </div>
    <div class="profile-label-block">
        <div class="my-img-position">
            <div class="devided-label-left">Birthday</div>
            <div class="devided-label-right" id="Birthday"></div>
        </div>
        <div class="my-img-position">
            <div class="devided-label-left">Phone</div>
            <div class="devided-label-right"><input type="text" id="PhoneNumber" class="input-text" readonly></div>
        </div>
        <div class="my-img-position">
            <div class="devided-label-left">Country</div>
            <div class="devided-label-right"><input type="text" id="Country" class="input-text"></div>
        </div>
        <div class="my-img-position">
            <div class="devided-label-left">Country Code</div>
            <div class="devided-label-right"><input type="text" id="CountryCode" class="input-text"></div>
        </div>
    </div>
    <div class="profile-label-block">
        <div class="my-img-position">
            <div class="devided-label-left width-10-percentage">Mood</div>
            <div class="devided-label-right"><textarea id="Mood" style="width: 250px;height:60px;"></textarea></div>
        </div>
        <div class="my-img-position">
            <div class="devided-label-left width-10-percentage">Email</div>
            <div class="devided-label-right">
                <div id="div-secondary-email"></div>
                <div class="link-text"><a href="javascript:void(0)" id="div-add-emails">add email+</a></div>
                <div id="to-div-email"></div>
            </div>
        </div>
        <div class="my-img-position">
            <div class="devided-label-left width-10-percentage">Phone</div>
            <div class="devided-label-right">
                <div id="div-secondary-number"></div>
                <div class="link-text"><a href="javascript:void(0)" id="div-add-numbers">add number+</a></div>
                <div id="to-div-number"></div>
            </div>
        </div>
    </div>
</div>
<style>
    .jqx-calendar
    {
        border: 1px solid #5BBB9E !important;
    }
</style>
