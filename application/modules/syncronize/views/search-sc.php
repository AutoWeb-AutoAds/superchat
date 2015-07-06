<script src="<?php echo base_url();?>assets/js/modules/superchat.js"></script>
<script src="https://apis.google.com/js/api:client.js"></script>
<!--<script src="https://apis.google.com/js/platform.js" async defer></script>-->
<!--<script src="--><?php //echo base_url();?><!--assets/js/modules/hangout.js"></script>-->
<!--<script src="//plus.google.com/hangouts/_/api/v1/hangout.js"></script>-->

<div class="div-sync-box-center">
    <div class="input-container-synce">
        <div class="float-left"><input type="text" id="search-friend"></div>
        <div class="float-right" style="margin: 5px;cursor: pointer"><img src="<?php echo base_url();?>assets/image/Sync/magnifier_01.png" id="btn-search-socail"></div>
    </div>
</div>
<div class="div-sync-box-right">
    <div class="header-title">Your superchat contacts</div>
    <div id="loading-div"><img src="<?php echo base_url();?>assets/jqx-lib/css/images/loader.gif"></div>
    <div id="results-div"></div>
</div>
