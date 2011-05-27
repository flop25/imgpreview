<?php
/*
Plugin Name: Image Preview
Version: auto
Description: give an image preview when the mouve is over a thumbnail
Plugin URI: http://phpwebgallery.net/ext/extension_view.php?eid=
Author: Flop25
Author URI: http://www.planete-flop.fr/
*/

/** thumbnails.tpl **/
add_event_handler('loc_end_index_thumbnails', 'imgpreview_thumbnails');
function imgpreview_thumbnails($tpl_thumbnails_var)
{
	global $template;
	$template->set_prefilter('index_thumbnails', 'imgpreview_prefilter_thumbnails');
	$template->set_prefilter('stuffs', 'imgpreview_prefilter_thumbnails');
	/*
	$UrlJs = get_root_url().'plugins/imgpreview/js/imgpreview.js';
	$UrlCss = get_root_url().'plugins/imgpreview/css/imgpreview.css';
	$template->append(
	'head_elements',
	'<script type="text/javascript" src="'.$UrlJs.'"></script>'."\n".
	"\t".'<link rel="stylesheet" type="text/css" href="'.$UrlCss.'">'."\n"
	);
	$template->append(
	'footer_elements',
	'<script type="text/javascript" src="'.get_root_url().'plugins/imgpreview/js/init.js"></script>'."\n"
	);
	*/
	$dir=dirname(__FILE__).'/css_js.tpl';
	$template->set_filenames(array(
		'imgpreview_css_js' => realpath($dir),
	  )  );
	//die('_'.realpath($dir).'_');
	//$imgpreview_css_js = $template->parse('imgpreview_css_js', true);
	$template->assign_var_from_handle('IMGPREVIEW', 'imgpreview_css_js');

	//define('IMGPREVIEW',$imgpreview_css_js);
	//die(IMGPREVIEW);
	return $tpl_thumbnails_var;
}

function imgpreview_prefilter_thumbnails($content, &$smarty)
{
	global $template;
  $search = 'href="{$thumbnail.URL}"';
  
  $replacement = 'href="{$thumbnail.URL}" imgsrc="{$thumbnail.FILE_PATH}"';

  $content= str_replace($search, $replacement, $content);

	$content='{$IMGPREVIEW}'.$content;
	return $content;
}
?>