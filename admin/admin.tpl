<div class="titrePage">
  <h2>Image Preview</h2>
</div>
<fieldset>
  <form action="" method="post" name="option_plugin">
    {'imgp_max_width'|@translate}
    <input name="max-width" type="text" size="5" {$MAX_W} />
    px<br />
    {'imgp_max_height'|@translate}
    <input name="max-height" type="text" size="5" {$MAX_H} />
    px<br />
    <input name="envoi_config" type="hidden" value="imgpreview" />
    <input type="hidden" name="pwg_token" value="{$PWG_TOKEN}">
    <input type="submit" name="option_imgp" id="button" value="{'imgp_send'|@translate}" />
  </form>
</fieldset>
<hr />
<div style="text-align:left">
  {'imgp_howitworks'|@translate}
</div>