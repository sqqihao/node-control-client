<?php
	$dir = str_replace(":","-",$_POST["dir"]);
	$con = @$_POST["content"];
	$jpg = @$_POST["jpg"];

	function createFolder($path)
	{
	    if (!file_exists($path))
	    {
	        createFolder(dirname($path));
	        mkdir($path, 0777);
	    }
	}
	function createFile($file,$source)
	{
	     if($fp=fopen($file,'w'))
	    {
	         $filesource=fwrite($fp,$source);
	         fclose($fp);
	         return $filesource;
	     }
	     else
	         return false;
	}

	if(!empty($con)) {

		createFolder( "contents/".$dir );
		createFile( "contents/".$dir.'/'.$dir.".txt", $con);
	
	}

	if(!empty($jpg)) {
		createFolder( "contents/".$dir );
		//file_put_contents("jpg.jpg", $jpg);
		createFile( "contents/".$dir.'/'.$dir.".jpg", base64_decode($jpg));

	}
?>