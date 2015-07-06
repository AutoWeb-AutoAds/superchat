<!DOCTYPE html>
<html lang="en">
<head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="Borama Web Developer Team">
        <meta name="keyword" content="Borama Consulting">
        <link rel="icon" href="<?php echo base_url();?>assets/image/icons/superchat.ico" type="image/x-icon" />
        <title><?php echo SYSTEM_TITLE;?></title>
        <link href="<?php echo base_url();?>assets/css/login-layout.css" rel="stylesheet" />

        <script src="<?php echo base_url();?>assets/js/modules/jquery-2.1.3.min.js"></script>
        <script src="<?php echo base_url();?>assets/js/modules/config.js"></script>
        <script src="<?php echo base_url();?>assets/js/socket-client/socket.io.js"></script>

        <script>
                var socketIoCon = io.connect(developmentIPAddress);
                $(function(){
                $("a[rel='tab']").click(function(e){
                        e.preventDefault();//prevent default action
                        //get the link location that was clicked
                        var pageurl = $(this).attr('href');
                        //to get the ajax content and display in div with id 'getContent'
                        $.ajax({
                                url:pageurl+'?rel=tab',
                                success: function(data){
                                        $('#getContent').html(data);

                                        //fade first page
                                        $('#logo-superchat-clearfix').animate({
                                                opacity: '0',      // animate slideUp
                                                margin: 'hide',
                                                padding: 'hide',
                                                height: 'show'        // animate fadeOut
                                        }, 'slow', 'linear', function() {
                                                $(this).remove();
                                        });

                                        $("#logo-superchat-overfix").fadeIn(1500).dequeue();


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


</head>
<body>

        <div id="getContent"></div>
        <div id="logo-superchat-clearfix">
                <div id="logo-superchat">
                       <a href="<?php echo base_url()?>login/login_join" rel="tab"><img src="<?php echo base_url()?>assets/image/logos/logo_SC_x2.png"></a>
                        <div id="text-superchat">superchat</div>
                        <?php
                        $ses = $this->session->userdata('access_key');
                        echo $ses;
                        ?>
                </div>
        </div>




</body>

</html>

