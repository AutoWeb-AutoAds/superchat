<div class="div-box-left" id="div-box-left">
    <div id="div-contact-scroll-left-file"></div>
</div>
<div class="div-box-right-file" id="div-box-right-file">
    <div class="div-list-type-file">
        <div class="body-icon-list"><img src="<?php echo base_url();?>assets/image/file/list.png" id="list-file" onclick="listFile()"></div>
        <div class="body-icon-list"><img src="<?php echo base_url();?>assets/image/file/thumbnail.png" id="thumbnail-file" onclick="thumbnails()"></div>
        <div class="body-icon-list"><img src="<?php echo base_url();?>assets/image/file/slide.png" id="slide-file" onclick="slideFile()"></div>
        <div class="sort-by" id="sort-by">
            <div class="dropdown">
                <div class="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
                    Sort by
                    <span class="caret"></span>
                </div>
                <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                    <li role="presentation"><a role="menuitem" tabindex="-1" onclick="funcOrderBy(this)" datas="date">Date</a></li>
                    <li role="presentation"><a role="menuitem" tabindex="-1" onclick="funcOrderBy(this)" datas="fileName">File Name</a></li>
                </ul>
            </div>

        </div>
        <div class="add-file">
            <form name="sendFile" id="sendFile" action="" method="post" enctype="multipart/form-data">
                <div class="attachment-file-icon"><input id="fileImport" name="fileImport" type="file" onchange="sendForFile()"></div>Add file
            </form>
        </div>
    </div>

    <div class="body-file" id="body-file"></div>
<!--    <div class="body-file" id="body-file-thumbnail"></div>-->
    <div class="file-footer" id="file-footer">
        <div class="body-footer">
            <div class="footer-list-icon"><img src="<?php echo base_url();?>assets/image/Profile/share_01.png"><div class="icon-file-name">Share</div> </div>
            <div class="footer-list-icon"><img src="<?php echo base_url();?>assets/image/Profile/find_01.png"><div class="icon-file-name">Find</div></div>
            <div class="footer-list-icon"><img src="<?php echo base_url();?>assets/image/Profile/save_01.png" id="saveFile"><div class="icon-file-name">Save</div></div>
            <div class="footer-list-icon"><img src="<?php echo base_url();?>assets/image/Profile/delete_01.png" data-toggle="modal" data-target="#myModal"><div class="icon-file-name">Delete</div></div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="my-modal-file">
    <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-body"><p>Are you sure! want delete this file?</p></div>
                <div class="modal-footer"><button type="button" class="btn btn-sm" data-dismiss="modal" id="btn-delete-file">Delete</button></div>
            </div>

        </div>
    </div>
</div>
<script>

    $(document).ready(function(e){
        var height = $(document).height()-80;
        $('#div-contact-scroll-left-file').slimscroll({
            position: 'right',
            height: height,
            size:'5px',
            alwaysVisible:false
        });
        //slim scroll for body file right
        $('#body-file').slimscroll({
            position: 'right',
            height: $("#div-contact-scroll-left-file" ).height()-153,
            size:'5px',
            width:'100%',
            alwaysVisible:false
        });
        //initialize file div right

        $('#div-box-right-file').height($("#div-contact-scroll-left-file" ).height()+1);
        //end
        $( "#sort-by-header" ).click(function() {
            $( "#sort-by-db").show();
            $( "#sort-by-header").hide();
            $('#sort-by-dropdown').slideDown();
        });

        $( "#sort-by-db" ).click(function() {
            $( "#sort-by-db").hide();
            $('#sort-by-dropdown').slideUp();
            $('#sort-by-header').show();
        });

        //load file in list style while loading page
          getFiles();
        //end

        //even click file list
        $('body').on('click','.body-list-line', function(){
            // remove the active class from all elements with active class
            $('.active').removeClass('active');
            // add active class to clicked element
            $(this).addClass('active');
            $('#file-footer').show();

        });
        //even click file thumbnail
        $('body').on('click','.thumbnail-list', function(){
            // remove the active class from all elements with active class
            $('.activeThumbnail').removeClass('activeThumbnail');
            // add active class to clicked element
            $(this).addClass('activeThumbnail');
            $('#file-footer').show();

        });
        //delete file
        $('#btn-delete-file').click(function(){
            deleteFile();

        });
        //save file
        $('#saveFile').click(function(){
            var sUrl = localStorage['url'];
            var anchorElem = document.createElement('a');
            anchorElem.setAttribute("href", sUrl);
            anchorElem.innerHTML = sUrl;
            document.body.appendChild(anchorElem);
        });

    });
    $( window ).resize(function() {
        var height = $(document).height()-80;
        $('#div-box-right-file').height($("#div-contact-scroll-left-file" ).height()+1);
    });



</script>