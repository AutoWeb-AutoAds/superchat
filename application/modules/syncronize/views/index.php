<div class="div-box-left">
    <div id="div-sync-scroll-left">
        <div class="chat-contact-block">
            <div class="float-left padding-top-8">Add contact</div>
            <div class="float-right sync-add-contact-img"></div>
        </div>
        <div class="border-fat"></div>
        <div id="div-sync-options">
            <div class="chat-contact-block" id="div-all-contacts">
                <div class="float-left sync-all-contacts-img"></div>
                <div class="float-left sync-option-title">All contacts</div>
            </div>
            <div class="border-thin"></div>
            <div class="chat-contact-block" id="div-add-contact-by-search">
                <div class="float-left sync-contacts-from-net-img"></div>
                <div class="float-left sync-option-title">Add contact by search</div>
            </div>
            <div class="chat-contact-block" id="div-sync-contact-from-networks">
                <div class="float-left"><img src="<?php echo base_url()?>assets/image/icons/Network_icon.png" class="img-circle" width="35" height="35"></div>
                <div class="float-left sync-option-title">Sync contacts from networks</div>
            </div>
            <div class="no-contact-container">
                <div class="no-contact-yet"><img src="../../assets/image/icons/No-ConnectYet.png" width="100" height="100"></div>
                <div class="no-contact-yet">No contacts yet...</div>
                <div class="no-contact-darkgray">You can add contact by searching Superchat unsername or sync from networks</div>
            </div>
        </div>
        <div id="div-sync-results"></div>
    </div>
</div>
<div class="div-wraper-container">
    <div id="div-sync-contact"></div>
    <div id="div-search-sc"></div>
</div>

<script>
    $(document).ready(function(){
        loginStatus(function(){
            isConnection = 'connected';
        },isConnection);

        var height = $(document).height() - 60;
        $('#div-sync-scroll-left').slimscroll({
            position: 'right',
            height: height,
            size:'5px',
            alwaysVisible:false
        });
        $('#div-sync-contact-from-networks').on('click',function(){
            $('#div-search-sc').html('');
            loadPage(basePath + '/syncronize/synContact','div-sync-contact');
        });
        $('#div-add-contact-by-search').on('click',function(){
            $('#div-sync-contact').html('');
            loadPage(basePath + '/syncronize/searchSuperChat','div-search-sc');
        });

    });

</script>


