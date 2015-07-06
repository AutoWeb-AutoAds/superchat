<html>
<head>
    <title>Superchat</title>
</head>
<body>
<?php


require_once 'EpiTwitter/TwitterConfig.php';
require_once 'EpiTwitter/EpiCurl.php';
require_once 'EpiTwitter/EpiOAuth.php';
require_once 'EpiTwitter/EpiTwitter.php';
require_once 'EpiTwitter/EpiSequence.php';
$twitterObj = new EpiTwitter($consumer_key, $consumer_secret);

$TwitterLoginUrl=$twitterObj->getAuthorizationUrl();
echo $TwitterLoginUrl;


header("Location: ".$TwitterLoginUrl);

?>
</body>
</html>