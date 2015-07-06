<?php

include 'EpiTwitter/EpiCurl.php';
include 'EpiTwitter/EpiOAuth.php';
include 'EpiTwitter/EpiTwitter.php';
include 'EpiTwitter/TwitterConfig.php';

//include("db.php");


$Twitter = new EpiTwitter($consumer_key, $consumer_secret);

if(isset($_GET['oauth_token']) || (isset($_SESSION['oauth_token']) && isset($_SESSION['oauth_token_secret'])))
{

// user accepted access

	if(empty($_SESSION['oauth_token']) && empty($_SESSION['oauth_token_secret']) )
	{

		$Twitter->setToken($_GET['oauth_token']);
		$token = $Twitter->getAccessToken();
		$_SESSION['oauth_token']=$token->oauth_token;
		$_SESSION['oauth_token_secret']= $token->oauth_token_secret;
		$Twitter->setToken($token->oauth_token, $token->oauth_token_secret);

	}
	else
	{
		$Twitter->setToken($_SESSION['oauth_token'],$_SESSION['oauth_token_secret']);
	}
	$userData= $Twitter->get_accountVerify_credentials();
	$userTwitter = $Twitter->getAccessToken();


	//echo "---------------------------------------------------------------------------------------------------";
	//echo '<pre>';
	//var_dump($token);
	//echo '<pre/>';

	//echo "-------------------------------------------------------------------------------------------------------------------------------------------------------------------------";
	//var_dump ($userData->response);


	//var_dump($token->oauth_token);
	//$TwitterCurl = substr($TwitterCurl.indexOf("{",$TwitterCurl.length-1) );
	//$stIndex = stripos($TwitterCurl,"{");
	//$lsIndex = strpos($TwitterCurl,"{");
	//echo "Start : ".$stIndex." End : ".$lsIndex."<br>";
	//$TwitterCurl = substr($stIndex,$lsIndex);


	//echo "-------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>";


	$TwitterUsername=$userData->screen_name;
	$TwitterFullname=$userData->name;

	$_SESSION['TwitterUsername']=$TwitterUsername;
	$_SESSION['TwitterFullname']=$TwitterFullname;
	$oauth_token=$_SESSION['oauth_token'];
	$oauth_token_secret=$_SESSION['oauth_token_secret'];

	//echo "Your Twitter Name is : ".$userData->response[name];
	//echo "<br>Your Twitter ID is : ".$token->user_id;
	//echo "<br>Your Twitter screen_name is : ".$userData->response[screen_name];
	//echo "<br>Your Twitter Profile is: <img src='".$userData->response[profile_image_url_https]."'>";
	//echo "<br>Your Twitter oauth_token is : ".$token->oauth_token;
	//echo "<br>Your Twitter oauth_token_secret is : ".$token->oauth_token_secret;
	//echo "<br>Your Twitter screen_name is : ".$token->screen_name;
	?>

	<script>


		function passvalue()
		{

			var token='<?php echo $token->oauth_token ?>';
			var stoket = '<?php echo $token->oauth_token_secret ?>';

			if (window.opener != null && !window.opener.closed) {
				//var txtName = window.opener.document.getElementById("username");
				//txtName.value = token;
				//window.opener.sup();
				window.opener.loginTwitter (token,stoket);
			}
			window.close();

//window.opener.location.reload(true);
//window.location.href = 'http://super.autoads4u.com/login/TwitterLog';


//window.parent.document.getElementById("username").value="hello";//TextBox1 is in parent page

		}
		passvalue();
	</script>


<?php
}
?>