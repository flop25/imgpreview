<?php

if (!defined('PHPWG_ROOT_PATH')) die('Hacking attempt!');

global $conf, $template, $lang, $page;
load_language('plugin.lang', IMGP_PATH);


$page['infos'] = array();

if (isset($_POST['envoi_config']) and $_POST['envoi_config']=='imgpreview')
{
	$conf_imgp = explode("#" , $conf['imgpreview']);
	check_pwg_token();
	$newconf_plugin = (isset($_POST['max-width']) and preg_match("#^[0-9]+$#",$_POST['max-width'])) ? $_POST['max-width'] : $conf_imgp[0];
	$newconf_plugin .= '#';
	$newconf_plugin .= (isset($_POST['max-height']) and preg_match("#^[0-9]+$#",$_POST['max-height'])) ? $_POST['max-height'] : $conf_imgp[1];
	$newconf_plugin .= '#';
	$newconf_plugin .= (isset($_POST['show-title'])) ? "true" : "false";
	$newconf_plugin .= '#';
	$newconf_plugin .= (isset($_POST['opacity'])) ? "true" : "false";
	$newconf_plugin .= '#';
	$newconf_plugin .= (isset($_POST['preloadImages'])) ? "true" : "false";
	conf_update_param('imgpreview', pwg_db_real_escape_string($newconf_plugin));				
	array_push($page['infos'], l10n('imgp_conf_updated'));
}

load_conf_from_db();
$conf_imgp = explode("#" , $conf['imgpreview']);
$val_title=(isset($conf_imgp[2]) and $conf_imgp[2]=="true") ? "checked" : ""; 
$val_opacity=(isset($conf_imgp[3]) and $conf_imgp[3]=="true") ? "checked" : ""; 
$val_preloadImages=(isset($conf_imgp[4]) and $conf_imgp[4]=="true") ? "checked" : ""; 
$template->assign(
	array(
		'MAX_W' => 'value="'.$conf_imgp[0].'"',
		'MAX_H' => 'value="'.$conf_imgp[1].'"',
		'SHOW_TITTLE' => $val_title,
		'OPACITY' => $val_opacity,
		'preloadImages' => $val_preloadImages,
		'PWG_TOKEN' => get_pwg_token()
	)
	);
$template->set_filename('plugin_admin_content', dirname(__FILE__).'/admin.tpl');
$template->assign_var_from_handle('ADMIN_CONTENT', 'plugin_admin_content');
?>