<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
//require_once 'assets/EpiTwitter/TwitterConfig.php';
//require_once 'assets/EpiTwitter/EpiCurl.php';
//require_once 'assets/EpiTwitter/EpiOAuth.php';
//require_once 'assets/EpiTwitter/EpiTwitter.php';
//require_once 'assets/EpiTwitter/EpiSequence.php';

class Login extends MX_Controller {


	public function index()
	{
		$accesskey =  $this->session->userdata('access_key');
		if($accesskey == '' ){
			$this->load->view('index');
		}else{
//			$this->load->view('applications');
			header('Location: '.base_url().'applications');
		}

	}

	public function login_join()
	{
		$this->load->view('login-join');
	}
	public function auth()
	{
		$accesskey =  $this->session->userdata('access_key');
		$userJoin = $this->input->get_post('userJoin');
		if($userJoin !='' || $userJoin != null){
			$user_action = 'Join';
			$array_items = array('email' => $userJoin,'user_action' =>$user_action);
			$this->session->set_userdata($array_items);
		}

		if($accesskey == '' ){
			$this->load->view('auth');
		}else{
//			$this->load->view('applications');
			header('Location: '.base_url().'applications');
		}

	}

	public function join()
	{
		$this->load->view('join');
	}
	public function AuthSession(){
		$str_input = '';
		$array_session =  array();
		$access_key = $this->input->get_post('access_key');
		$user_id = $this->input->get_post('user_id');
		$user_email =$this->input->get_post('user_email');
		$user_name =$this->input->get_post('user_name');
		$user_action =$this->input->get_post('user_action');

				if($access_key != ''){
			$array_session['access_key'] = $access_key;
		}

		if($user_email != '' ){
			$array_session['email'] = $user_email;
		}
		if($user_name != ''){
			$array_session['username' ] = $user_name;
		}
		if($user_action != ''){
			$array_session['user_action'] = $user_action;
		}
		if($user_id != '' ){
			$array_session['userID'] = $user_id;
		}

		if($user_action != ''){
			$this->session->set_userdata($array_session);
		}
		echo $access_key;
	}

	public function forgetpass()
	{
		$this->load->view('forgetpass');
	}
	public function Verify_Password()
	{
		$verify_password = $this->session->userdata('user_action');
		if($verify_password == 'resetPassword'){
			$this->load->view('verify_password');
		}else{
			$this->load->view('login-join');
		}

	}
	public function addNewPassword()
	{
		$verify_password = $this->session->userdata('user_action');
		if($verify_password == 'resetPassword'){
			$this->load->view('add_newpassword');
		}else{
			$this->load->view('login-join');
		}

	}

	function func_logout(){
		$logout = $this->input->get_post('logout');
		$this->session->sess_destroy();
		echo $logout;
	}

	public function Twitter(){

//		$this->load->library('EpiTwitter/EpiCurl');
//		$this->load->library('EpiTwitter/EpiOAuth');
//		$this->load->library('EpiTwitter/EpiTwitter');
//		$this->load->library('EpiTwitter/TwitterConfig');

		$this->load->view('twitter');

	}
}
