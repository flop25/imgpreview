{combine_script id='jquery.imgpreview' load='header' require='jquery' path='plugins/imgpreview/js/imgpreview.js'}
{combine_script id='imgpreview.init' load='footer' require='jquery.imgpreview' path='plugins/imgpreview/js/init.js'}
{combine_css path="plugins/imgpreview/css/imgpreview.css"}
{if isset($imgpreview)}
{html_head}
{literal}
<style>
#tooltip img {
{/literal}
	max-height: {$imgpreview.height}px;
	max-width: {$imgpreview.width}px;
{literal}
}
</style>
{/literal}{/html_head}
{/if}

