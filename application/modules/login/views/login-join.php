<script src="<?php echo base_url();?>assets/js/modules/jquery-2.1.3.min.js"></script>
<link href="<?php echo base_url();?>assets/css/login-layout.css" rel="stylesheet" />
<script src="https://apis.google.com/js/api:client.js"></script>
<script>
    $(function(){
        $("a[rel='tab']").click(function(e){
            e.preventDefault();//prevent default action
            //get the link location that was clicked
            var pageurl = $(this).attr('href');
            //to get the ajax content and display in div with id 'getContent'
            $.ajax({
                url:pageurl+'?rel=tab',
                success: function(data){
                    $('#getContentOverfix').html(data);
                    // $('#logo-superchat-overfix').fadeOut(300);
                    //fade first page
                    $('#logo-superchat-overfix').animate({
                        opacity: '0',      // animate slideUp
                        margin: 'hide',
                        padding: 'hide',
                        height: 'show'        // animate fadeOut
                    }, 'slow', 'linear', function() {
                        $(this).remove();
                    });

                    // $("#logo-superchat-overfix").hide();
                }

            });

            //to change the browser URL to 'pageurl'
            //Ex: http://superchatweb.com/my_profile/chat
            if(pageurl!=window.location){
                window.history.pushState({path:pageurl},'',pageurl);
            }
            return false;
        });



    });
</script>
<div id="getContent">
    <div id="logo-superchat-overfix">
        <div id="logo-superchat-middlefix">
           <img src="<?php echo base_url()?>assets/image/logos/logo_SC_x2.png">
            <div id="text-superchat">superchat</div>
            <div id="text-login"><a href="<?php echo base_url();?>login/auth" rel="tab">Login</a></div>
            <div id="text-login"><a href="<?php echo base_url();?>login/join" rel="tab">Join</a></div>
        </div>
    </div>

</div>

<div id="getContentOverfix"></div>
