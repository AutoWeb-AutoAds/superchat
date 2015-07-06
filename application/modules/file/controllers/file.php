<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once 'assets/aws_sdk/aws-autoloader.php';
use Aws\Common\Aws;
class File extends MX_Controller {
	public function index()
	{
		$this->load->view('index');
	}

	public function saveFileSended()
	{
		$sessionToken = $this->input->post('SessionToken');
		$accessKeyId = $this->input->post('AccessKeyId');
		$secretAccessKey = $this->input->post('SecretAccessKey');
		$userId = $this->input->post('userId');
		$imageAvatar = $_FILES['fileImport']['name'];
		$sourceAvatar = $_FILES['fileImport']['tmp_name'];

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
				echo $imageAvatar;
			}
		}catch (Exeption $e){
			die($e->getMessage());
		}
	}

	public  function thumbnailFile(){
		$this->load->view('thumbnail-file');
	}

	public function listFile(){
		$this->load->view('list-file');
	}

	public function slideFile(){
		$this->load->view('slide-file');
	}
}
