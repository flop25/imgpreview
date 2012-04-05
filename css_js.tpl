{combine_script id='jquery.imgpreview' load='header' require='jquery' path='plugins/imgpreview/js/imgpreview.js'}

{footer_script require='jquery.imgpreview'}
{if isset($imgpreview)}
{literal}
jQuery('.thumbnails a, #thumbnails a').imgPreview({
    containerID: 'tooltip',
		srcAttr: 'imgsrc',
		considerBorders:'true',
    // When container is shown:
    onShow: function(link){
      {/literal}{if $imgpreview.title=="true"}{literal}
      jQuery('<span>' + jQuery(link).attr("data-tittle") + '</span>').appendTo(this);
      
      {/literal}{/if}{if $imgpreview.opacity=="true"}{literal}
      jQuery(link).stop().animate({opacity:0.4});
      // Reset image:
      jQuery('img', this).stop().css({opacity:0});
      {/literal}{/if}{literal}
    },
    onLoad: function(){
      {/literal}{if $imgpreview.opacity=="true"}{literal}
      jQuery(this).animate({opacity:1}, 300);
      {/literal}{/if}{literal}
    },
    // When container hides: 
    onHide: function(link){
      {/literal}{if $imgpreview.title=="true"}{literal}
      jQuery('span', this).remove();
      {/literal}{/if}{if $imgpreview.opacity=="true"}{literal}
      jQuery(link).stop().animate({opacity:1});
      {/literal}{/if}{literal}
    }
});

{/literal}
{/if}
{/footer_script}

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

