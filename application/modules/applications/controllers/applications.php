<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Applications extends MX_Controller {
	public function index()
	{
		$data['main_content'] = 'index';
		$accesskey =  $this->session->userdata('access_key');
		if($accesskey == '' ){
			redirect('/login/auth/', 'refresh');
		}else{
			$this->load->view('template',$data);
		}


	}

}
