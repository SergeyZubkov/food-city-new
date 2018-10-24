<?php
	$post = (!empty($_POST)) ? true : false;

	if($post) {
	  $subject = $_POST['subject'];

	  $text = htmlspecialchars($_POST['message']);

    $address = "yukservis@yandex.ru";
    
    $msg  = "<html><body style='font-family: Arial, sans-serif; font-size: 2vw;'>";
    $msg .= "<p>".$text."</p>\r\n";
    $msg .= "</body></html>";


    $subject =  '=?utf-8?B?' .base64_encode($subject). ' ' . base64_encode(" клиента") . '?=';
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $send = mail($address,$subject,$msg, $headers);

	  if($send) {
	  	echo 'OK';
	  } 
	  else {
	  	echo '<div class="err"></div>';
	  }
	}
?>