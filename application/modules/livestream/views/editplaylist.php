
<div class="main-body-pop-deletePlaylist" >

    <div class="bacgk-add-playlist">
        <div class="add-playlist-input"><input type="text" value="<?php echo $playlistName;?>" class="input-text" id="pop-edit-playlist-name" placeholder="type playlist name" data-toggle="tooltip"></div>
    </div>

</div>
<div class="pop-footer-div">
    <button type="button" class="btn btn-default btn-xs" id="btn-cancel-edit-ply">Cancel</button>
    <button type="button" class="btn btn-default btn-xs" id="btn-edit-ply">Edit</button>
</div>

<script>
    $(document).ready(function(){

        var playlistId = '<?php echo $playlistId?>';
        $('#btn-edit-ply').click(function(){
            var newPlaylistName = $('#pop-edit-playlist-name').val();
            changePlaylistName(playlistId,newPlaylistName,function(result){
                if(result.code=='1'){

                    closeJqxWindowId('div-edit-playlist');
                    getPlaylist(function (datas) {
                        $('#body-of-playlist').html('');
                        var result = '';
                        var mediaType ='';
                        var imageThum = '';
                        $.each(datas.data, function (index, value) {

                            result+='<div class="main-title-collapse" id="fade_'+value.PlaylistID+'">';
                            result+='<div id="'+value.PlaylistID+'" class="title-collapse" onclick="isCollapse(this)">'+value.PlaylistName+'</div>';
                            result+='<div class="div-delete-playlist">';
                            result+='<div class="icon-delete-playlist" onclick="deletePlaylistPopUp(\''+value.PlaylistID+'\',\''+value.PlaylistName+'\');"></div>';
                            result+='<div class="icon-edit-playlist" onclick="editPlaylistPopUp(\''+value.PlaylistID+'\',\''+value.PlaylistName+'\')"></div>';
                            result+='</div></div>';
                            result+='<div class="collapse" id="collapse'+value.PlaylistID+'">' ;
                            result+='<div class="block-video">';
                            $.each(value.ListVideo, function (indexOf, valueOf) {
                                imageThum ='<img src="'+valueOf.VideoThumbnail+'">';

                                if(valueOf.MediaType== '1'){
                                    mediaType ='youtube';
                                }if(valueOf.MediaType== '2'){
                                    mediaType ='vimeo';
                                }if(valueOf.MediaType== '3'){
                                    mediaType ='aol';
                                }if(valueOf.MediaType== '4'){
                                    mediaType ='twitch';
                                }if(valueOf.MediaType== '5'){
                                    mediaType ='soundcloud';
                                }if(valueOf.MediaType== '6'){
                                    mediaType ='itune';
                                }if(valueOf.MediaType== '7'){
                                    mediaType ='spotify';
                                }
                                result+='<div class="head-of-list-playlist">';
                                result+='<div class="video-thumb-playlist" onclick="getDetailInfo(\''+valueOf.VideoID+'\',\''+mediaType+'\')">'+imageThum+'</div>';
                                result+='<div class="video-title-playlist" onclick="getDetailInfo(\''+valueOf.VideoID+'\',\''+mediaType+'\')">'+valueOf.VideoTitle+'</div>';
                                result+='</div>';
                            });

                            result+='</div></div>';

                        });
                        $('#body-of-playlist').append(result);

                    });
                }else if(newPlaylistName == ''){
                    $("#pop-edit-playlist-name").tooltip('destroy');
                    $("#pop-edit-playlist-name").tooltip({placement: 'bottom',title: 'Please fill the playlist name!'}).tooltip('show');
                }else if(result.code=='0'){
                    console.log(result);
                    $("#pop-edit-playlist-name").tooltip('destroy');
                    $("#pop-edit-playlist-name").tooltip({placement: 'bottom',title: 'Please try another one!'}).tooltip('show');
                }
            });
        });

        $('#btn-cancel-edit-ply').click(function(){
            closeJqxWindowId('div-edit-playlist');
        });
    });
</script>