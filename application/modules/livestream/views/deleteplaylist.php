<div class="main-body-pop-deletePlaylist" >

    <p>Do you want to delete playlist "<?php echo $playlistName?>" !</p>

</div>
<div class="pop-footer-div">
    <button type="button" class="btn btn-default btn-xs" id="btn-cancel-ply">Cancel</button>
    <button type="button" class="btn btn-default btn-xs" id="btn-delete-ply">Delete</button>
</div>

<script>
    $(document).ready(function(){

        var playlistId = '<?php echo $playlistId?>';
        $('#btn-delete-ply').click(function(){
            deletePlaylist(playlistId,function(result){
                if(result.code=='1'){

                    closeJqxWindowId('div-delete-playlist');
                    $('#fade_'+playlistId).fadeOut();
                }
            });
        });

        $('#btn-cancel-ply').click(function(){
            closeJqxWindowId('div-delete-playlist');
        });
    });
</script>