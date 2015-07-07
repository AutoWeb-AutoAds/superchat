var filterLiveStreaming = function(dataFilter){
    var textBoxID = dataFilter.getAttribute('data-txt');
    var placeHolder = dataFilter.getAttribute('placeholder');
    $('.input-text').attr('id',textBoxID);
    $('.img-circle').attr('id','btn-'+textBoxID);
    localStorage.setItem('live',textBoxID);
    $('.media-label-title').html(placeHolder);
    $('#'+textBoxID).select();
}

//search video by media type
var queryVideoByMedia = function(mediaData,evt){
    var mediaType ='';
    mediaType = !evt ? mediaData.getAttribute('id'):'btn-'+mediaData;
    if(mediaType == 'btn-youtube'){
        if($('#youtube').val() !=''){
            searchMedia($('#youtube').val(),basePath + "/livestream/youtube",function(response){
                hasSuccess(response,'youtube');
            });
        }
    }else if(mediaType=='btn-twitch'){
        if($('#twitch').val() !=''){
            searchMedia($('#twitch').val(),basePath + "/livestream/twitch",function(response){
                hasSuccess(response,'twitch');
            });
        }
    }else if(mediaType=='btn-vimeo'){
        if($('#vimeo').val() !=''){
            searchMedia($('#vimeo').val(),basePath + "/livestream/vimeo",function(response){
                hasSuccess(response,'vimeo');
            });
        }
    }else if(mediaType=='btn-soundcloud'){
        if($('#soundcloud').val() !=''){
            searchMedia($('#soundcloud').val(),basePath + "/livestream/soundcloud",function(response){
                hasSuccess(response,'soundcloud');
            });
        }
    }else if(mediaType=='btn-aol'){
        if($('#aol').val() !=''){
            searchMedia($('#aol').val(),basePath + "/livestream/aol",function(response){
                hasSuccess(response,'aol');
            });
        }
    }else if(mediaType=='btn-spotify'){
        if($('#spotify').val() !=''){
            searchMedia($('#spotify').val(),basePath + "/livestream/spotify",function(response){
                hasSuccess(response,'spotify');
            });
        }
    }else if(mediaType=='btn-itune'){
        if($('#itune').val() !=''){
            searchMedia($('#itune').val(),basePath + "/livestream/itune",function(response){
                hasSuccess(response,'itune');
            });
        }
    }
}



var searchMedia = function(query,url,successCallback){
    $.ajax({
        type:'POST',
        url: url,
        data:{query:query},
        beforeSend:beforeSendRequest('video-search-result'),
        success: successCallback
    });
}

var hasSuccess = function(response,status){
    var jsData = JSON.parse(response);
    var count = jsData.Body.Videos.count;
    var items = jsData.Body.Videos.items;
    var next = jsData.Body.Videos.page.next;
    var prev = jsData.Body.Videos.page.prev;
    var result = '',
        page = '',
        picture = '',
        name = '',
        id = '',
        mediaType = '';
    mediaType = mediaTypes('number',status);
    var liveStreaming = localStorage.getItem('live');
    liveStreaming = liveStreaming == null ? 'youtube':liveStreaming.toLowerCase();
    var listVideos = new Array;
    $.each(items, function (index, value) {
        if(status == 'twitch'){
            picture = value.preview.large;
            name = value.channel.display_name;
            id = value.channel.name;
        }else if(status == 'spotify'){
            picture = value.album.images[0].url;
            name = value.name;
            id = value.id;
        }else{
            picture = value.pictures.high.url;
            name = value.name;
            id = value.id;
        }
        result += '<div class="videos-container">';
        result += '<div class="video-thumb" onclick="getDetailInfo(\''+id+'\',\''+liveStreaming+'\')"><img src="'+picture+'"></div>';
        result += '<div class="video-thumb-name" onclick="getDetailInfo(\''+id+'\',\''+liveStreaming+'\')">'+name+'</div>';
        result +='<div class="video-thumb-favorite"><input type="checkbox" class="check-video-array" id="'+id+'" value="" video-channel="'+value.channel+'" video-thumbnail="'+picture+'" video-mediaType="'+mediaType+'" video-view-count="'+value.stats+'" video-duration="'+value.duration+'" video-title="'+name+'"></div>';
        result += '</div>';
    });

    $('#video-search-result').html(result);
    page += '<div class="next-previous-page">';
    page += '<div class="float-left page-hover" data-prev="'+prev+'">Prev</div>';
    page += '<div class="float-left page-hover" data-next="'+next+'">Next</div>';
    page += '<div class="float-right video-thumb-favorite"><img src="assets/image/icons/favorite-icon.png" class="img-circle" id="btn-mark-video-favorite" title="Favorite"></div>';
    page += '</div>';
    items.length>0 ? $('#video-search-result').append(page):'';

    //Mark video as favorite
    $('#btn-mark-video-favorite').on('click',function(){
        hasMarkFavorite();
    });

};

var getDetailInfo = function(id,cmd){
    if(cmd == 'youtube'){
        (function(){
            loadYoutube();
        }).call(this);
        YoutubeVideo(id, function(video){
            //console.log(video);
            var url = video.getSource("video/mp4", "medium");
            var title = video.title;
            var videoID = video.video_id;
            var mediaType = mediaTypes('number',cmd);
            viewVideo(url.original_url,video.iurlmq,cmd,title,videoID,mediaType);
        });
    }else{
        $.ajax({
            type: 'POST',
            url: basePath + "/livestream/" + cmd + "Detail",
            data: {query: id},
            beforeSend: beforeSendRequest('div-player-stream-result'),
            success: function(response){
                if(cmd == 'twitch'){
                    streamTwitch(id);
                }else{
                    streamPlayer(response,cmd);
                }
            }
        });
    }
}

var streamPlayer = function(response,type){
    var jsData = JSON.parse(response);
    var lengthItem = jsData.Body.Videos.items.length -1;
    var liveStreaming = localStorage.getItem('live');
    var url = '',poster = '';
    var displayName = '',videoID = '';
    var mediaType = mediaTypes('number',type);
    console.log(jsData);
    if(liveStreaming == 'spotify'){
        url = jsData.Body.Videos.items.preview_url;
        poster = jsData.Body.Videos.items.album.images[0].url;
        displayName = jsData.Body.Videos.items.name;
        videoID = jsData.Body.Videos.items.id;
    }else{
        if(lengthItem >= 0){
            if(liveStreaming =='itune') {
                console.log(liveStreaming);
                url = jsData.Body.Videos.items[lengthItem].previewUrl;
                poster = jsData.Body.Videos.items[lengthItem].artworkUrl100;
                displayName =jsData.Body.Videos.items[lengthItem].trackName;
                videoID = jsData.Body.Videos.items[lengthItem].trackId;
            }else{
                var lengthvideos = jsData.Body.Videos.items[lengthItem].videos.length -1;
                if(lengthvideos >=0){
                    url = jsData.Body.Videos.items[lengthItem].videos[lengthvideos].url;
                    poster = jsData.Body.Videos.items[lengthItem].pictures.high.url;
                    displayName = jsData.Body.Videos.items[lengthItem].name;
                    videoID = jsData.Body.Videos.items[lengthItem].id;
                }
            }
        }else{
            $('#div-player-stream-result').html('<div class="div-null-data">Data can\'t stream </div>');
        }
    }
    //play video goes here
    viewVideo(url,poster,type,displayName,videoID,mediaType);
}

var viewVideo = function(url,poster,type,displayName,videoID,mediaType){
    console.log(displayName+'-'+videoID+'-'+mediaType);
    // call function ACTION_LOAD_MEDIA
    var cosyncData = cosyncDataActionLoad(displayName,ownerID,videoID,mediaType);
    //cosync()
    console.log(GroupChat);
    var result ='';
    result += '<div class="playerStreaming" id="playerStreaming">';
    result += '<video id="video" controls height="455" width="900" data-mediaType="'+type+'" data-name="'+displayName+'" preload="none" mediagroup="myVideoGroup"  src="'+url+'" poster="'+poster+'" autoplay></video>';
    result += '</div>';
    $('#div-container-box').html('<div id="div-player-stream-result">'+result+'</div>');
    init();
}



// ******************************** Youtube API goes here ************************
var loadYoutube = function(){
    window.YoutubeVideo = function(video_id, callback) {
        $.ajax({
            url: basePath + "/livestream/youtubeDetail",
            type: "POST",
            data: {video_id:video_id},
            beforeSend:beforeSendRequest('div-player-stream-result'),
            success:function(response){
                youTubeVideoDetail(response,callback);
            }
        });
    };
    window.YoutubeVideo.decodeQueryString = function(queryString) {
        var key, keyValPair, keyValPairs, r, val, _i, _len;
        r = {};
        keyValPairs = queryString.split("&");
        for (_i = 0, _len = keyValPairs.length; _i < _len; _i++) {
            keyValPair = keyValPairs[_i];
            key = decodeURIComponent(keyValPair.split("=")[0]);
            val = decodeURIComponent(keyValPair.split("=")[1] || "");
            r[key] = val;
        }
        return r;
    };
    window.YoutubeVideo.decodeStreamMap = function(url_encoded_fmt_stream_map) {
        var quality, sources, stream, type, urlEncodedStream, _i, _len, _ref;
        sources = {};
        _ref = url_encoded_fmt_stream_map.split(",");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            urlEncodedStream = _ref[_i];
            stream = YoutubeVideo.decodeQueryString(urlEncodedStream);
            type = stream.type.split(";")[0];
            quality = stream.quality.split(",")[0];
            stream.original_url = stream.url;
            stream.url = "" + stream.url + "&signature=" + stream.sig;
            sources["" + type + " " + quality] = stream;
        }
        return sources;
    };
}

var youTubeVideoDetail = function(video_info,callback){
    var video;
    video = YoutubeVideo.decodeQueryString(video_info);
    if (video.status === "fail") {
        return callback(video);
    }
    video.sources = YoutubeVideo.decodeStreamMap(video.url_encoded_fmt_stream_map);
    video.getSource = function(type, quality) {
        var exact, key, lowest, source, _ref;
        lowest = null;
        exact = null;
        _ref = this.sources;
        for (key in _ref) {
            source = _ref[key];
            if (source.type.match(type)) {
                if (source.quality.match(quality)) {
                    exact = source;
                } else {
                    lowest = source;
                }
            }
        }
        return exact || lowest;
    };
    return callback(video);
}

// ****************************** Twitch API goes here *******************************
var streamTwitch = function(channel,divResult){

    // call function ACTION_LOAD_MEDIA
    //ownerID
    $.getScript("//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js", function() {
        var pathID= 'div-player-stream-result';
        window.onPlayerEvent = function (data) {
            data.forEach(function(event) {
                //console.log(event.event);
                if (event.event == 'playerInit') {
                    var player = $("#div-player-stream-result")[0];
                    if(divResult){
                        player = $("#"+divResult)[0];
                        pathID =divResult;
                    }
                    player.playVideo();
                }
            });
        }

        if(divResult){
            pathID =divResult;
            swfobject.embedSWF("//www-cdn.jtvnw.net/swflibs/TwitchPlayer.swf",pathID, "100%", "99%", "11", null,
                {"eventsCallback":"onPlayerEvent", "embed":1, "channel":channel, "auto_play":"true","start_volume":"50"},
                {"allowScriptAccess":"always","allowFullScreen":"true"}
            )
        }else{
            swfobject.embedSWF("//www-cdn.jtvnw.net/swflibs/TwitchPlayer.swf",pathID, "900", "453", "11", null,
                {"eventsCallback":"onPlayerEvent", "embed":1, "channel":channel, "auto_play":"true","start_volume":"50"},
                {"allowScriptAccess":"always","allowFullScreen":"true"}
            )
        }

    });
}

var hasMarkFavorite = function(){
    var lengths = $('.check-video-array:checked').length;
    if(lengths){
        var listVideo = new Array;
        $('.check-video-array:checked').each(function (index,value) {
            var data = {
                "VideoID": value.getAttribute('id'),
                "MediaType": value.getAttribute('video-mediaType'),
                "VideoViewCount":value.getAttribute('video-view-count'),
                "Duration" :value.getAttribute('video-duration'),
                "VideoTitle":value.getAttribute('video-title'),
                "VideoThumbnail":value.getAttribute('video-thumbnail'),
                "Channel":value.getAttribute('video-channel')
            }
            listVideo.push(data);
        });
        $.each(listVideo,function(index,val){
            markVideoAsFavorite(val,function(data){
                if(data.code == 1){
                    console.log(data);
                }else{
                    $('#msg_notifi').html(data.message.description);
                    $("#messageNotification").jqxNotification("open");
                    console.log(data);
                }
            });
        });
    }
}

var hasRemoveFavoriteVideo = function(videoID,mediaType){
    removeVideoFromFavorite(videoID,mediaType,function(result){
        console.log(result);
        if(result.code == 1){
            $('#'+videoID).fadeOut('slow');
        }
    });
}

var isCollapse = function(data){
    var id = data.getAttribute('id');
    $("#collapse"+id).collapse('toggle');
}

var handle = function(e,getId) {
    if (e.keyCode === 13) {
        var btnLive = localStorage.getItem('live');
        if (btnLive == null) {
            btnLive = 'youtube';
        }
        queryVideoByMedia(btnLive,'enter');
    }
}
var handleSearch = function(e,data) {
    if (e.keyCode === 13) {
        var  txts =data.getAttribute('data-search');
        console.log(txts);
        beforeSendRequest('results-div');
        func_searchFri(txts);
    }
}

var getPopularVideo = function(url,result,callback){
    $.ajax({
        type:'POST',
        url: url,
        data:{},
        beforeSend:beforeSendRequest(result),
        success: callback
    });
}

var hasPopularVideo = function(urlVideo,mediaType){
    var mediaImg = '';
    if(mediaType == 'youtube'){
        mediaImg = '<img src="assets/image/icons/youtube.png" class="img-circle" title="Youtube">';
    }else if(mediaType == 'vimeo'){
        mediaImg = '<img src="assets/image/icons/vimeo.png" class="img-circle" title="Vimeo">';
    }else{
        mediaImg = '<img src="assets/image/icons/aol.png" class="img-circle" title="Aol.on">';
    }
    getPopularVideo(basePath + '/' +urlVideo,'popular-video-result',function(response){
        var js = JSON.parse(response);
        var items = js.Body.Videos.items;
        var result = '';
        $.each(items,function(index,value){
            result +='<div class="head-of-list-playlist">';
            result +='<div class="video-thumb-playlist"><img src="'+value.pictures.small.url+'" width="'+value.width+'" height="'+value.height+'"></div>';
            result +='<div class="video-title-playlist" onclick="getDetailInfo(\''+value.id+'\',\''+mediaType+'\')">'+value.name+'</div>';
            result +='<div class="media-icons">'+mediaImg+'</div>';
            result +='</div>';
        });
        $('#popular-video-result').html(result);
    });
}
