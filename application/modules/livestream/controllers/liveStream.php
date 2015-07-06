<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Livestream extends MX_Controller {
	public function index(){
		$this->load->view('index');
	}
	public function youtube(){
		$curl = curl_init();
		$query = $this->input->post('query');
		$query = str_replace(" ","%",$query);
		$url= DEVELOPMENT_IPADDRESS."/youtube/videos?query=".$query;
		curl_setopt ($curl, CURLOPT_URL, $url);
		curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		echo curl_exec($curl);
	}
	public function youtubeDetail(){
		$curl = curl_init();
		$query = $this->input->post('video_id');
		$url= "http://www.youtube.com/get_video_info?video_id=".$query."&el=detailpage&asv=3&hl=en_US&sts=16136&fmt=''";
		curl_setopt ($curl, CURLOPT_URL, $url);
		curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		echo curl_exec($curl);
	}

	public function youtubePopular(){
		$curl = curl_init();
		$url= DEVELOPMENT_IPADDRESS."/youtube/videos/popular";
		curl_setopt ($curl, CURLOPT_URL, $url);
		curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		echo curl_exec($curl);
	}

	public function vimeo(){
		$curl = curl_init();
		$query = $this->input->post('query');
		$query = str_replace(" ","%",$query);
		$url= DEVELOPMENT_IPADDRESS."/vimeo/videos?query=".$query;
		curl_setopt ($curl, CURLOPT_URL, $url);
		curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		echo curl_exec($curl);
	}
	public  function  vimeoDetail(){
		$curl = curl_init();
		$query = $this->input->post('query');
		$url= DEVELOPMENT_IPADDRESS."/vimeo/video/".$query;
		curl_setopt ($curl, CURLOPT_URL, $url);
		curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		echo curl_exec($curl);
	}
	public function vimeoPopular(){
		$curl = curl_init();
		$url= DEVELOPMENT_IPADDRESS."/vimeo/videos/popular";
		curl_setopt ($curl, CURLOPT_URL, $url);
		curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		echo curl_exec($curl);
	}

	public function aol(){
		$curl = curl_init();
		$query = $this->input->post('query');
		$query = str_replace(" ","%",$query);
		$url= DEVELOPMENT_IPADDRESS."/aolon/videos?query=".$query;
		curl_setopt ($curl, CURLOPT_URL,$url);
		curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		echo curl_exec($curl);
	}
	public function aolDetail(){
		$curl = curl_init();
		$query = $this->input->post('query');
		$url= DEVELOPMENT_IPADDRESS."/aolon/video/".$query;
		curl_setopt ($curl, CURLOPT_URL,$url);
		curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		echo curl_exec($curl);
	}
	public function aolPopular(){
		$curl = curl_init();
		$url= DEVELOPMENT_IPADDRESS."/aolon/videos/popular";
		curl_setopt ($curl, CURLOPT_URL, $url);
		curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		echo curl_exec($curl);
	}
	public function soundcloud(){
		$curl = curl_init();
		$query = $this->input->post('query');
		$query = str_replace(" ","%",$query);
		$url= DEVELOPMENT_IPADDRESS."/soundcloud/videos?query=".$query;
		curl_setopt ($curl, CURLOPT_URL, $url);
		curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		echo curl_exec($curl);
	}
	public function soundcloudDetail(){
		$curl = curl_init();
		$query = $this->input->post('query');
		$url= DEVELOPMENT_IPADDRESS."/soundcloud/video/".$query;
		curl_setopt ($curl, CURLOPT_URL, $url);
		curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		echo curl_exec($curl);
	}

	public function spotify(){
		$curl = curl_init();
		$query = $this->input->post('query');
		$query = str_replace(" ","%",$query);
		$url= DEVELOPMENT_IPADDRESS."/spotify/videos?query=".$query;
		curl_setopt ($curl, CURLOPT_URL, $url);
		curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		echo curl_exec($curl);
	}
	public function spotifyDetail(){
		$curl = curl_init();
		$query = $this->input->post('query');
		$url= DEVELOPMENT_IPADDRESS."/spotify/video/".$query;
		curl_setopt ($curl, CURLOPT_URL, $url);
		curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		echo curl_exec($curl);
	}

	public function itune(){
		$curl = curl_init();
		$query = $this->input->post('query');
		$query = str_replace(" ","%",$query);
		$url= DEVELOPMENT_IPADDRESS."/itunes/".$query;
		curl_setopt ($curl, CURLOPT_URL,$url);
		curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		echo curl_exec($curl);
	}
	public function ituneDetail(){
		$curl = curl_init();
		$query = $this->input->post('query');
		$url= DEVELOPMENT_IPADDRESS."/itunes/preview/".$query;
		curl_setopt ($curl, CURLOPT_URL,$url);
		curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		echo curl_exec($curl);
	}
	public function twitch(){
		$curl = curl_init();
		$query = $this->input->post('query');
		$query = str_replace(" ","%",$query);
		$url= DEVELOPMENT_IPADDRESS."/twitch/streams?query=".$query;
		curl_setopt ($curl, CURLOPT_URL,$url);
		curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		echo curl_exec($curl);
		return false;
	}
	public function twitchDetail(){
		$curl = curl_init();
		$query = $this->input->post('query');
		$url= DEVELOPMENT_IPADDRESS."/twitch/streaming/".$query;
		curl_setopt ($curl, CURLOPT_URL,$url);
		curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		echo curl_exec($curl);
	}

	public function deletePlaylist(){

		$data['playlistId']=$this->input->post('chatType');
		$data['playlistName']=$this->input->post('SIPUser');
		$this->load->view('deleteplaylist',$data);
	}

	public function editPlaylist(){

		$data['playlistId']=$this->input->post('chatType');
		$data['playlistName']=$this->input->post('SIPUser');
		$this->load->view('editplaylist',$data);
	}
}
