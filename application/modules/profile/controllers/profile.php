<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once 'assets/aws_sdk/aws-autoloader.php';
use Aws\Common\Aws;

class Profile extends MX_Controller {
	public function index()
	{
		$this->load->view('index');
	}
	public function edit()
	{
		$this->load->view('edit');
	}
	public function updateImageAvatar()
	{
		$sessionToken = $this->input->post('SessionToken');
		$accessKeyId = $this->input->post('AccessKeyId');
		$secretAccessKey = $this->input->post('SecretAccessKey');
		$userId = $this->input->post('userId');
		$imageAvatar = $_FILES['imageAvatar']['name'];
		$sourceAvatar = $_FILES['imageAvatar']['tmp_name'];

		$ext = Myclass::getFileExtension($imageAvatar);
		$imageAvatar = sha1(time()).'.'.$ext;
		$config = array(
			'key'    =>$accessKeyId,
			'secret' =>$secretAccessKey,
			'token'  =>$sessionToken
		);
		//print_r($config);return;
		$aws = Aws::factory($config);
		$s3AWS = $aws->get('S3');
		$bucket = 'superchat-dev';

		try{
			//Create folder and Upload image into S3 Amazon by userId
			$result = $s3AWS->putObject(array(
				'Bucket'    	=>$bucket,
				'Key'    		=>$userId.'/'.$imageAvatar,
				'SourceFile'	=>$sourceAvatar,
				'Body'      	=>"",
				'ACL'       	=>'public-read'
			));
			if($result){
				echo '<img src="'.S3_AMAZONE_AWS_SUPERCHAT_DEV.'/'.$userId.'/'.$imageAvatar.'" width="110" height="110" class="img-circle" id="aws-img-avartar">';
			}
		}catch (Exeption $e){
			die($e->getMessage());
		}
	}

	public function updateImageCover()
	{
		$sessionToken = $this->input->post('SessionToken');
		$accessKeyId = $this->input->post('AccessKeyId');
		$secretAccessKey = $this->input->post('SecretAccessKey');
		$userId = $this->input->post('userId');
		$coverAvatar = $_FILES['CoverFile']['name'];
		$sourceCover = $_FILES['CoverFile']['tmp_name'];

		$ext = Myclass::getFileExtension($coverAvatar);
		$coverAvatar = sha1(time()).'.'.$ext;


		$config = array(
			'key'    =>$accessKeyId,
			'secret' =>$secretAccessKey,
			'token'  =>$sessionToken
		);
		//print_r($config);exit;
		$aws = Aws::factory($config);
		$s3AWS = $aws->get('S3');
		$bucket = 'superchat-dev';

		try{
			//Create folder and Upload image into S3 Amazon by userId
			$result = $s3AWS->putObject(array(
				'Bucket'    	=>$bucket,
				'Key'    		=>$userId.'/'.$coverAvatar,
				'SourceFile'	=>$sourceCover,
				'Body'      	=>"",
				'ACL'       	=>'public-read'
			));
			if($result){
				echo '<img src="'.S3_AMAZONE_AWS_SUPERCHAT_DEV.'/'.$userId.'/'.$coverAvatar.'" height="300" id="aws-img-cover">';
			}
		}catch (Exeption $e){
			die($e->getMessage());
		}

	}
}
