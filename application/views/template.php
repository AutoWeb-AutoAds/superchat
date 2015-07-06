<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="Borama Web Developer Team">
	<meta name="keyword" content="Borama Consulting">
	<link rel="icon" href="<?php echo base_url();?>assets/image/icons/superchat.ico" type="image/x-icon" />
	<title><?php echo SYSTEM_TITLE;?></title>
	<link href="<?php echo base_url();?>assets/css/global.css" rel="stylesheet" />
	<script src="<?php echo base_url();?>assets/js/modules/jquery-2.1.3.min.js"></script>
	<script src="<?php echo base_url();?>assets/js/socket-client/socket.io.js"></script>
	<script src="<?php echo base_url();?>assets/js/modules/config.js"></script>
	<script src="<?php echo base_url();?>assets/js/modules/AutoConfig.js"></script>
	<script src="<?php echo base_url();?>assets/js/modules/global-function.js"></script>
	<script src="<?php echo base_url();?>assets/js/modules/chat-notifications.js"></script>


</head>
<body>
<script type="text/javascript">
	getPrivateNotification();
</script>
<div class="layout-wrapper">
    <?php
    $ses = $this->session->userdata('email');

    $this->load->view('header');
    $this->load->view($main_content);
    ?>

</div>
<script src="<?php echo base_url();?>assets/js/bootstrap/bootstrap.js"></script>
<script src="<?php echo base_url();?>assets/js/bootstrap/bootstrap-dialog.js"></script>
<!--include slimScroll-->
<script src="<?php echo base_url();?>assets/slimScroll/jquery.slimscroll.js"></script>
<script src="<?php echo base_url();?>assets/slimScroll/prettify.js"></script>
<link href="<?php echo base_url();?>assets/slimScroll/prettify.css" rel="stylesheet" />
<script src="<?php echo base_url();?>assets/jqx-lib/js/jqx-all.js"></script>
<script src="<?php echo base_url();?>assets/jqx-lib/js/jqxcore.js"></script>

<script src="<?php echo base_url();?>assets/js/modules/jquery.form.js"></script>

<!--Show alert message in the browser title bar-->
<script src="<?php echo base_url();?>assets/js/modules/jquery.titlealert.js"></script>

<script src="<?php echo base_url();?>assets/js/modules/chat.js"></script>
<script src="<?php echo base_url();?>assets/js/modules/file.js"></script>
<script src="<?php echo base_url();?>assets/js/modules/profile.js"></script>
<script src="<?php echo base_url();?>assets/js/modules/getContact.js"></script>
<script src="<?php echo base_url();?>assets/js/modules/chat-setting.js"></script>
<script src="<?php echo base_url();?>assets/js/modules/chat-social.js"></script>
<script src="<?php echo base_url();?>assets/js/modules/yahoo.js"></script>
<script src="<?php echo base_url();?>assets/js/modules/icq-funct.js"></script>
<script src="<?php echo base_url();?>assets/js/modules/aim-aol.js"></script>
<script src="<?php echo base_url();?>assets/js/modules/g-plus.js"></script>
<script src="<?php echo base_url();?>assets/js/modules/live-stream.js"></script>
<script src="<?php echo base_url();?>assets/js/modules/cosync.js"></script>
</body>
</html>