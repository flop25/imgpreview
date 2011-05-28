<?php
/*
Plugin Name: Image Preview
Version: auto
Description: give an image preview when the mouve is over a thumbnail
Plugin URI: http://phpwebgallery.net/ext/extension_view.php?eid=551
Author: Flop25
Author URI: http://www.planete-flop.fr/
*/
if (!defined('PHPWG_ROOT_PATH')) die('Hacking attempt!');
define('IMGP_DIR' , basename(dirname(__FILE__)));
define('IMGP_PATH' , PHPWG_PLUGINS_PATH . IMGP_DIR . '/');
add_event_handler('get_admin_plugin_menu_links', 'imgpreview_lien_menu');
function imgpreview_lien_menu($menu)
{
	
    array_push(
			$menu,
			array('NAME' => 'Image Preview',
            'URL'  => get_admin_plugin_menu_link(get_root_url().'plugins/'.IMGP_DIR.'/admin/admin.php')
						)
		);
    return $menu;
}
/** thumbnails.tpl **/
add_event_handler('loc_end_index_thumbnails', 'imgpreview_thumbnails');
function imgpreview_thumbnails($tpl_thumbnails_var)
{
	global $template, $conf ;

	$conf_imgp = explode("#" , $conf['imgpreview']);
	$imgpreview=array( 'width' => $conf_imgp[0], 'height' => $conf_imgp[1] );
	$template->assign(array(
		'imgpreview' => $imgpreview
	));

	$template->set_prefilter('index_thumbnails', 'imgpreview_prefilter_thumbnails');
	$template->set_prefilter('stuffs', 'imgpreview_prefilter_thumbnails');
	$dir=dirname(__FILE__).'/css_js.tpl';
	$template->set_filenames(array(
		'imgpreview_css_js' => realpath($dir),
	  )  );
	$template->assign_var_from_handle('IMGPREVIEW', 'imgpreview_css_js');

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