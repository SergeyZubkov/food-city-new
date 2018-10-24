<?php

$post = (!empty($_POST)) ? true : false;
if($post) {
  $phone = $_POST['phone'];
  $name = $_POST['name'];
  $amount = $_POST['amount'];
  $addressDeliver = $_POST['addressDeliver'];

  $error = '';
  if(!$name) {$error .= 'Укажите свое имя. ';}
  if(!$phone) {$error .= 'Укажите ваш телефон. ';}
  if(!$error) {
    $address = "yukservis@yandex.ru";
    $mes = "Заявка с сайта. Имя: ".$name."\n\nТелефон: ".$phone."\n\nКоличество обедов:".$amount."\n\nАдрес доставки: ".$addressDeliver."\n\n";
    $sub =  '=?utf-8?B?' . base64_encode("клиент") . '?=';
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $send = mail($address,$sub,$mes, $headers);

    if($send) {echo 'OK';}
  }
  else {echo '<div class="err">'.$error.'</div>';}
}
?>