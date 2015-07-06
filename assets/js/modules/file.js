/**
 * Created by Sundara on 5/14/2015.
 */

var funcGetListFile = function(callbackFunc,OrderBy) {
    var getFile ={
        "Header": {
            "From": "",
            "To": "",
            "DateTime": "",
            "PartnerID": "",
            "DeviceType": "",
            "DeviceOS": "",
            "FromIP": "",
            "Region": "enUS"
        },
        "Body": {
            "ID": "",
            "ObjectType": "1000",
            "Action": "100",
            "Data": {
                "AccessKey" : localStorage['access_key'],
                "OrderBy":OrderBy,
                "Limit" : "",
                "Offset" : ""
            }
        }
    }

    socketIoCon.emit('getListFile', JSON.stringify(getFile));
    socketIoCon.removeAllListeners('getListFile-result');
    socketIoCon.on('getListFile-result', function (datas) {
        var json = JSON.parse(datas);
        if(callbackFunc){
            callbackFunc(JSON.parse(json.Body.Data));
        }
    });
}

var deleteFile = function(){
    var dataDeletedFile = {
        "Header": {
            "From": "",
            "To": "",
            "DateTime": "",
            "PartnerID": "",
            "DeviceType": "",
            "DeviceOS": "",
            "FromIP": "",
            "Region": "enUS"
        },
        "Body": {
            "ID": "",
            "ObjectType": "1000",
            "Action": "100",
            "Data": {
                "AccessKey" :localStorage['access_key'],
                "FileID" : localStorage['file-deleted']
            }
        }
    }
    socketIoCon.emit('deleteFile', JSON.stringify(dataDeletedFile));
    socketIoCon.removeAllListeners('deleteFile-result');
    socketIoCon.on('deleteFile-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code== 1){
            $('#'+localStorage['file-deleted']).fadeOut();
        }else{
            console.log('fail');
        }
    });
}

var importFile = function(fileName,fileSize,fileExt){

    var dataImportFile ={
        "Header": {
            "From": "",
            "To": "",
            "DateTime": "",
            "PartnerID": "",
            "DeviceType": "",
            "DeviceOS": "",
            "FromIP": "",
            "Region": "enUS"
        },
        "Body": {
            "ID": "",
            "ObjectType": "1000",
            "Action": "100",
            "Data": {
                "AccessKey" : localStorage['access_key'],
                "ListFile" : [{"FileName":fileName,"FileSize":fileSize,"MimeType":fileExt,"FileOption":""}]
            }
        }
    }
    socketIoCon.emit('importFile', JSON.stringify(dataImportFile));
    socketIoCon.removeAllListeners('importFile-result');
    socketIoCon.on('importFile-result', function (datas) {
        var json = JSON.parse(datas);
        var obj = JSON.parse(json.Body.Data);
        if(obj.code== 1){
            funcGetListFile();
        }else{
            console.log('fail import');
            console.log(obj);
        }
    });
}

var getFiles = function(){
    loginStatus(function(){
        getFriendBySocialType(1,0,"","",function(result){
            func_viewContact(result,'div-contact-scroll-left-file');
        },'');
    },isConnection, function () {
        funcGetListFile(function(listData) {
            var result= '';
            isConnection = 'connected';
            $.each(listData.data, function (index, value) {

                if(value.FileName.length>70){
                    var fileNameFirst = value.FileName.substring(0,10);
                    var fileNameEnd   = value.FileName.slice(-7);
                    var fileNameSub = fileNameFirst+'...'+fileNameEnd;
                }else{
                    var fileNameSub = value.FileName;
                }

                result+='<div class="body-list-line" id="'+value.FileID+'" url="'+value.FilePath+'" onclick="fileClick(this)">'+
                '<div class="file-name-div">'+fileNameSub+'</div>'+
                '<div class="file-date-div">'+value.SentDate+'</div>'+
                '<div class="file-size-div">'+value.FileSize+'MB</div>'+
                '</div>';
            });
            $('#body-file').append(result);
        });
    });
}

var getFilesForThumbnail = function(){
    loginStatus(function(){
        getFriendBySocialType(1,0,"","",function(result){
            func_viewContact(result,'div-contact-scroll-left-file');
        },'');
    },isConnection, function () {
        funcGetListFile(function(listData) {
            var result= '';
            isConnection = 'connected';
            $.each(listData.data, function (index, value) {

                var images = '<img src="'+value.FilePath+'">';
                var file = '<img src="assets/image/icons/folder.png">';
                if(value.FileName.length>20){
                    var fileNameFirst = value.FileName.substring(0,10);
                    var fileNameEnd   = value.FileName.slice(-7);
                    var fileNameSub = fileNameFirst+'...'+fileNameEnd;
                }else{
                    var fileNameSub = value.FileName;
                }
                if(value.MimeType == 'jpg' || value.MimeType == 'png' || value.MimeType == 'PNG' || value.MimeType == 'jpeg'){

                    var imagesOrFile = images;
                }else{
                    var imagesOrFile = file;
                }

                result+='<div class="thumbnail-list" id="'+value.FileID+'" onclick="fileClick(this)">' +
                '<div class="thumbnail-body">'+imagesOrFile+'</div>' +
                '<div class="thumbnail-title" title="'+value.FileName+'">'+fileNameSub+'</div>' +
                '</div>';
            });
            $('#body-file').append(result);
        });
    });
}
var fileClick = function(data){
    var deleted=(data.getAttribute('id'));
    var url = data.getAttribute('url');
    localStorage.setItem('file-deleted',deleted);
    localStorage.setItem('url','<a href="'+url+'"></a>');
}

//upload file
var sendForFile = function(){
    getAWSToken(function(usageData){
        var AccessKeyId = usageData.data.AccessKeyId;
        var SecretAccessKey = usageData.data.SecretAccessKey;
        var SessionToken = usageData.data.SessionToken;
        var userId = localStorage['user_id'];
        $('#sendFile').ajaxForm({
            url:basePath + '/file/saveFileSended',
            data:{AccessKeyId:AccessKeyId,SecretAccessKey:SecretAccessKey,SessionToken:SessionToken,userId:userId},
            success:function(response) {
                if(response){

                    var file = $('#fileImport')[0].files[0];
                    var fileName = file.name;
                    var fileSize = 2;
                    var fileExtension = file.type;
                    var file_ext = file.name.split('.').pop();
                    importFile(fileName,fileSize,file_ext);

                }
            }
        }).submit();
    })
}


var funcOrderBy = function (data){
    var orderBy = data.getAttribute('datas');
    $( "#sort-by-db").hide();
    $('#sort-by-dropdown').slideUp();
    $('#sort-by-header').show();
    funcGetListFile(function(listData) {
        $('#body-file').html('');
        var result= '';
        $.each(listData.data, function (index, value) {

            result+='<div class="body-list-line" id="'+value.FileID+'" url="'+value.FilePath+'" onclick="deleteFileClick(this)">'+
            '<div class="file-name-div">'+value.FileName+'</div>'+
            '<div class="file-date-div">'+value.SentDate+'</div>'+
            '<div class="file-size-div">'+value.FileSize+'MB</div>'+
            '</div>';
        });
        $('#body-file').append(result);
    },orderBy);
}
var listFile = function(){
    $('#file-footer').hide();
    loadPage(basePath+'/file/listFile','body-file');
}
var thumbnails = function(){
    $('#file-footer').hide();
    loadPage(basePath+'/file/thumbnailFile','body-file');
}
var slideFile = function(){
    $('#file-footer').hide();
    loadPage(basePath+'/file/slideFile','body-file');
}