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
    <br />
    {'imgp_showtitle'|@translate}<input type="checkbox" name="show-title" {$SHOW_TITTLE}><br />
    {'imgp_opacity'|@translate}<input type="checkbox" name="opacity" {$OPACITY}><br />
    <br />
    {'imgp_preloadImages'|@translate}<input type="checkbox" name="preloadImages" {$preloadImages}><br />
    <br />
    <input name="envoi_config" type="hidden" value="imgpreview" />
    <input type="hidden" name="pwg_token" value="{$PWG_TOKEN}">
    <input type="submit" name="option_imgp" id="button" value="{'imgp_send'|@translate}" />
  </form>
</fieldset>

<fieldset>
<div style="text-align:left">
  {'imgp_howitworks'|@translate}
</div>
</fieldset>
