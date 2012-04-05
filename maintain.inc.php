<?php

function plugin_install()
{
    global $prefixeTable;
    $q = '
INSERT INTO ' . CONFIG_TABLE . ' (param,value,comment)
	VALUES
	("imgpreview" , "400#600#true#true#false" , "max-width#max-height#title#opacity#preloadImages");';
    pwg_query($q);

}



function plugin_activate()
{
  global $prefixeTable, $conf;
	//////////// Check Config
	$query = '
	SELECT COUNT(*) AS result FROM '.CONFIG_TABLE.'
	WHERE param IN (\'imgpreview\')
	;';
	$data_table = pwg_db_fetch_assoc(pwg_query($query));
	$exist = $data_table['result'];
	if ( $exist == 0 )
	{
		plugin_install();
	} 
	else {
		load_conf_from_db();

		if (count(explode("#" , $conf['imgpreview']))!=5)
		{
			pwg_query('DELETE FROM '.CONFIG_TABLE.' WHERE param IN (\'imgpreview\')');
			pwg_query($q);
			plugin_install();
		}
	}
}//fin active




function plugin_uninstall()
{
	global $prefixeTable;
  pwg_query('DELETE FROM '.CONFIG_TABLE.' WHERE param IN (\'imgpreview\')');
}//fin uninstall


?>