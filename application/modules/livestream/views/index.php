<div class="div-box-left" id="div-live-stream-box-left" xmlns="http://www.w3.org/1999/html">
    <div class="filter-social-container">
        <div class="filter-social-icon" data-toggle="tooltip" data-placement="bottom" title="Youtube"><img src="assets/image/icons/youtube.png" class="img-circle" id="btn-youtube-stream" data-txt="youtube" placeholder="Youtube" onclick="filterLiveStreaming(this)"></div>
        <div class="filter-social-icon" data-toggle="tooltip" data-placement="bottom" title="Vimeo"><img src="assets/image/icons/vimeo.png" class="img-circle" id="btn-vimeo-stream" data-txt="vimeo" placeholder="Vimeo" onclick="filterLiveStreaming(this)"></div>
        <div class="filter-social-icon" data-toggle="tooltip" data-placement="bottom" title="Aol.on"><img src="assets/image/icons/aol.png" class="img-circle" id="btn-aol-stream" data-txt="aol" placeholder="Aol.on" onclick="filterLiveStreaming(this)"></div>
        <div class="filter-social-icon" data-toggle="tooltip" data-placement="bottom" title="Twitch"><img src="assets/image/icons/twitch.png" class="img-circle" id="btn-twitch-stream" data-txt="twitch" placeholder="Twitch" onclick="filterLiveStreaming(this)"></div>
        <div class="filter-social-icon" data-toggle="tooltip" data-placement="bottom" title="Sound cloud"><img src="assets/image/icons/soundcloud.png" class="img-circle" id="btn-soundcloud-stream" data-txt="soundcloud" placeholder="Sound cloud" onclick="filterLiveStreaming(this)"></div>
        <div class="filter-social-icon" data-toggle="tooltip" data-placement="bottom" title="Itune"><img src="assets/image/icons/itunes.png" class="img-circle" id="btn-itune-stream" data-txt="itune" placeholder="Itune" onclick="filterLiveStreaming(this)"></div>
        <div class="filter-social-icon" data-toggle="tooltip" data-placement="bottom" title="Spotify"><img src="assets/image/icons/spotify.png" class="img-circle" id="btn-spotify-stream" data-txt="spotify" placeholder="Spotify" onclick="filterLiveStreaming(this)"></div>
    </div>
    <div id="search-videos-form">
        <div class="filter-social-container">
            <div class="media-label-title">Youtube</div>
            <div class="live-stream-search-block">
                <div class="input-container-live-stream">
                    <div class="float-left"><input type="text" class="input-text" id="youtube" onkeypress="handle(event,this)" autofocus="true"></div>
                    <div class="float-right" style="cursor: pointer"><img src="assets/image/Sync/magnifier_01.png" class="img-circle" width="20" height="20" id="btn-youtube" onclick="queryVideoByMedia(this)"></div>
                </div>
            </div>
        </div>
    </div>
    <div id="video-search-result"></div>
</div>


<div class="div-box-center">
    <div class="div-streaming-header">
        <div class="chat-settings-pic">
            <div class="chat-more-options-img" onclick="func_fadeTaggle('chat-setting-body-stream')"><div class="chat-setting-header chat-stream-header" id="chat-setting-header"></div></div>
            <div class="chat-setting-body-stream" id="chat-setting-body-stream">

                <div class="live-stream-search-block">
                    <div class="input-container-live-stream">
                        <div class="float-left"><input type="text" class="input-text" id="search-friend" data-search="search-friend" onkeypress="handleSearch(event,this)" autofocus="true"></div>
                        <div class="float-right" style="cursor: pointer"><img src="assets/image/Sync/magnifier_01.png" class="img-circle" width="20" height="20" id="btn-youtube" onclick="func_searchFri('search-friend')"></div>
                    </div>
                </div>
                <div id="results-div"></div>
                <div class="live-stream-search-block" id="btn-invite" onclick="func_createGroups()"></div>

            </div>
        </div>
        <div class="chat-settings-pic">
            <div class="chat-more-options-img" onclick="fun_test()"><div class="chat-setting-header chat-stream-header" id="chat-setting-header"></div></div>
        </div>
    </div>
    <div id="div-container-box">
        <div class="div-player-stream-result" id="div-player-stream-result"></div>
    </div>

    <div class="main-activity">
        <div class="default-div-playlist">
            <div class="title-playlist">My playlist</div>

            <div class="bacgk-add-playlist">
                <div class="add-playlist-input" id="add-playlist-input"><input type="text" class="input-text" id="playlist-text" placeholder="type playlist name" data-toggle="tooltip"></div>
                <div class="btn-add-playlist"><button type="button" id="btn-add-playlist" class="btn btn-info btn-circle">Add</button></div>
            </div>

            <div class="body-of-playlist" id="body-of-playlist"></div>
        </div>
        <div class="default-div-playlist">
            <div class="title-playlist">My favorite</div>
            <div class="body-of-favorite" id="body-of-favorite"></div>
        </div>
        <div class="default-div-playlist">
            <div class="title-playlist">Popular</div>
            <div class="body-of-popular" id="body-of-popular">
                <div class="popular-body-container">
                    <div class="popular-body-img"><img src="assets/image/icons/youtube.png" class="img-circle" onclick="hasPopularVideo('livestream/youtubePopular','youtube')"></div>
                    <div class="popular-body-img"><img src="assets/image/icons/vimeo.png" class="img-circle" onclick="hasPopularVideo('livestream/vimeoPopular','vimeo')"></div>
                    <div class="popular-body-img"><img src="assets/image/icons/aol.png" class="img-circle" onclick="hasPopularVideo('livestream/aolPopular','aol')"></div>
                </div>
                <div id="popular-video-result"></div>
            </div>
        </div>

    </div>

</div>
<script>
loginStatus(function(){
    isConnection = 'connected';
    beforeSendRequest('body-of-playlist');
    getPlaylist(function (datas) {
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
                         mediaType = mediaTypes('string',valueOf.MediaType);

                            result+='<div class="head-of-list-playlist">';
                            result+='<div class="video-thumb-playlist" onclick="getDetailInfo(\''+valueOf.VideoID+'\',\''+mediaType+'\')">'+imageThum+'</div>';
                            result+='<div class="video-title-playlist" onclick="getDetailInfo(\''+valueOf.VideoID+'\',\''+mediaType+'\')">'+valueOf.VideoTitle+'</div>';
                            result+='</div>';
                    });

                result+='</div></div>';

        });
        $('#body-of-playlist').html(result);

    });

},isConnection,function(){
    beforeSendRequest('body-of-favorite');
    listFavoriteVideos(function(result){
//        console.log(result);
        var mediaType = '',favoriteResult = '',iconMedia = '';
        $.each(result.data,function(index,value){
            var mediaImg = value.VideoThumbnail!= '' ? '<img src="'+value.VideoThumbnail+'">':'';
            if(value.MediaType == '1'){
                mediaType ='youtube';
                iconMedia = '<img src="assets/image/icons/youtube.png" class="img-circle" title="Youtube">';
            }if(value.MediaType == '2'){
                mediaType ='vimeo';
                iconMedia = '<img src="assets/image/icons/vimeo.png" class="img-circle" title="Vimeo">';
            }if(value.MediaType == '3'){
                mediaType ='aol';
                iconMedia = '<img src="assets/image/icons/aol.png" class="img-circle" title="Aol.on">';
            }if(value.MediaType == '4'){
                mediaType ='spotify';
                iconMedia = '<img src="assets/image/icons/spotify.png" class="img-circle" title="Spotify">';
            }if(value.MediaType == '5'){
                mediaType ='itune';
                iconMedia = '<img src="assets/image/icons/itunes.png" class="img-circle" title="Itune">';
            }if(value.MediaType == '6'){
                mediaType ='soundcloud';
                iconMedia = '<img src="assets/image/icons/soundcloud.png" class="img-circle" title="Sound Cloud">';
            }if(value.MediaType == '7'){
                mediaType ='twitch';
                iconMedia = '<img src="assets/image/icons/vimeo.png" class="img-circle" title="Twitch">';
            }
            favoriteResult +='<div class="head-of-list-playlist" id="'+value.VideoID+'">';
            favoriteResult +='<div class="video-thumb-playlist" onclick="getDetailInfo(\''+value.VideoID+'\',\''+mediaType+'\')">'+mediaImg+'</div>';
            favoriteResult +='<div class="video-title-playlist" onclick="getDetailInfo(\''+value.VideoID+'\',\''+mediaType+'\')">'+value.VideoTitle+'</div>';
            favoriteResult +='<div class="media-icons">'+iconMedia+'</div>';
            favoriteResult +='<div class="remove-icon" onclick="hasRemoveFavoriteVideo(\''+value.VideoID+'\',\''+value.MediaType+'\')"><img src="assets/image/icons/close-icon.png" class="img-circle"></div>';
            favoriteResult +='</div>';
        });
        $('#body-of-favorite').html(favoriteResult);
    });
});
$(function(){
    $('#video-search-result').slimscroll({height: $(document).height()-165, size:'5px'});
    $('.div-box-center').height($("#div-live-stream-box-left" ).height());
    //bootstrape tooltip
    $('[data-toggle="tooltip"]').tooltip();
    //slim scroll for activity
    $('#body-of-playlist').slimscroll({height:'310', size:'3px'});
    $('#body-of-favorite').slimscroll({height:'310', size:'3px'});
    $('#body-of-popular').slimscroll({height:'310', size:'3px'});


    var btnLive = localStorage.getItem('live');
    if(btnLive == null){
        btnLive = 'youtube';
    }
    if(btnLive != 'youtube'){
        var placeHolder = document.getElementById("btn-"+btnLive+"-stream").getAttribute("placeholder");
        $('.input-text').attr('id',btnLive);
        $('.img-circle').attr('id','btn-'+btnLive);
        $('.media-label-title').html(placeHolder);
    }

    // button add playlist
    $('#btn-add-playlist').click(function(){
        var PlaylistName = $('#playlist-text').val();
        createPlaylist(PlaylistName,function(dataOf){
//            $("#pop-edit-playlist-name").tooltip('destroy');
            if(dataOf.code =='1'){
                getPlaylist(function (datas) {
                    $('#body-of-playlist').html('');
                    var result = '';
                    var mediaType ='';
                    var imageThum = '';
                    beforeSendRequest('body-of-playlist');
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

                            mediaType = mediaTypes('string',valueOf.MediaType);
                            result+='<div class="head-of-list-playlist">';
                            result+='<div class="video-thumb-playlist" onclick="getDetailInfo(\''+valueOf.VideoID+'\',\''+mediaType+'\')">'+imageThum+'</div>';
                            result+='<div class="video-title-playlist" onclick="getDetailInfo(\''+valueOf.VideoID+'\',\''+mediaType+'\')">'+valueOf.VideoTitle+'</div>';
                            result+='</div>';
                        });

                        result+='</div></div>';

                    });
                    $('#body-of-playlist').html(result);

                });

            }else if(PlaylistName == ''){
                $("#playlist-text").tooltip('destroy');
                $("#playlist-text").tooltip({placement: 'bottom',title: 'Please fill the playlist name!'}).tooltip('show');
            }else if(dataOf.code=='0'){
                $("#playlist-text").tooltip('destroy');
                $("#playlist-text").tooltip({placement: 'bottom',title: 'Please try another one!'}).tooltip('show');
            }
        });
    });

    //popular video
    getPopularVideo('livestream/youtubePopular','popular-video-result',function(response){
        var js = JSON.parse(response);
        var items = js.Body.Videos.items;
        var result = '',mediaType = 'youtube';
        $.each(items,function(index,value){
            result +='<div class="head-of-list-playlist">';
            result +='<div class="video-thumb-playlist"><img src="'+value.pictures.small.url+'"></div>';
            result +='<div class="video-title-playlist" onclick="getDetailInfo(\''+value.id+'\',\''+mediaType+'\')">'+value.name+'</div>';
            result +='<div class="media-icons"><img src="assets/image/icons/youtube.png" class="img-circle" title="Youtube"></div>';
            result +='</div>';
        });
        $('#popular-video-result').html(result);
    });
});

    var fun_test = function(){
        var url = '';
        if(document.getElementById("video")){
            url = document.getElementById("video").getAttribute("src");
            console.log(url);
        }

       if(document.getElementsByTagName('object')){
           var twitchUrl =  $('[name=flashvars]').val();

           var ArrayUrl = twitchUrl.split('&');
           ArrayUrl = ArrayUrl[2].split('=');
           console.log(document.getElementsByTagName('object'));
           console.log(ArrayUrl);
       }



    }
</script>