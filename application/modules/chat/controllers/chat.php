<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once 'assets/aws_sdk/aws-autoloader.php';
use Aws\Common\Aws;

class Chat extends MX_Controller {
	public function index()
	{
		$this->load->view('index');
	}
	public function chats()
	{
		$data['userTitle'] = $this->input->post('userTitle');
		$data['chatType'] = $this->input->post('chatType');
		$data['socialTypeID'] = $this->input->post('socialTypeID');
		$data['SIPUser'] = $this->input->post('SIPUser');
		$data['friendId'] = $this->input->post('friendId');
		$this->load->view('chats',$data);
	}
	public function home()
	{
		$this->load->view('home');
	}
	public function saveFileSended()
	{
		$friendId =  $this->input->post('friendId');
		$sessionToken = $this->input->post('SessionToken');
		$accessKeyId = $this->input->post('AccessKeyId');
		$secretAccessKey = $this->input->post('SecretAccessKey');
		$userId = $this->input->post('userId');
		$imageAvatar = $_FILES['file_'.$friendId]['name'];
		$sourceAvatar = $_FILES['file_'.$friendId]['tmp_name'];

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
	public function sendSMS()
	{
		$data['friendId'] = $this->input->post('friendId');
		$data['chatType'] = $this->input->post('chatType');
		$this->load->view('sms',$data);
	}
	public function deleteConversation(){
		$data['friendId'] = $this->input->post('friendId');
		$data['chatType'] = $this->input->post('chatType');
		$this->load->view('delete-conversation',$data);
	}
	public function viewProfile()
	{
		$data['friendId'] = $this->input->post('friendId');
		$data['chatType'] = $this->input->post('chatType');
		$data['SIPUser'] = $this->input->post('SIPUser');
		$this->load->view('view-profile', $data);
	}
	public function blockContact(){
		$data['friendId'] = $this->input->post('friendId');
		$this->load->view('block-contact',$data);
	}
	public  function addContactToGroupChat(){
		$data['userTitle'] = $this->input->post('title');
		$data['friendId'] = $this->input->post('friendId');
		$this->load->view('addContactToGroupChat',$data);
	}
	public function backgroundGallery(){
		$data['friendId'] = $this->input->post('friendId');
		$data['chatType'] = $this->input->post('chatType');
		$this->load->view('background-gallery',$data);
	}
	public function saveChatBackground()
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
				echo '<img src="'.S3_AMAZONE_AWS_SUPERCHAT_DEV.'/'.$userId.'/'.$coverAvatar.'" width="300" height="200" id="aws-img-cover">';
			}
		}catch (Exeption $e){
			die($e->getMessage());
		}

	}
	public function yahooLogin(){
		$this->load->view('yahoo-login');
	}
	public function ICQLogin(){
		$this->load->view('icq-login');
	}
	public function AIMLogin(){
		$this->load->view('aim-login');
	}
}
