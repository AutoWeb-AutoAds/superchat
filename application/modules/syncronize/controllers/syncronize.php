<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Syncronize extends MX_Controller {
	public function index(){
		$this->load->view('index');
	}
	public function synContact(){
		$this->load->view('sync-contact');
	}
	public function searchSuperChat(){
		$this->load->view('search-sc');
	}
	public function yahoo_login(){
		$this->load->view('yahoo/yahoo_login');
	}
	public function yahoo_friend(){
		$this->load->view('yahoo/yahoo_friend');
	}
	public function aim_login(){
		$this->load->view('aim/aim_login');
	}
	public function aim_friend(){
		$this->load->view('aim/aim_friend');
	}
	public function icq_login(){
		$this->load->view('icq/icq_login');
	}
	public function icq_friend(){
		$this->load->view('icq/icq_friend');
	}
}
