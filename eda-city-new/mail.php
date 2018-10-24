<?php

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
  //Receive the RAW post data.
  $content = trim(file_get_contents("php://input"));

  $decoded = json_decode($content, true);

  //If json_decode failed, the JSON is invalid.
  if(is_array($decoded)) {
    $phone = $decoded['phone'];
    $name = $decoded['name'];
    $amount = $decoded['amount'];

    $addressDeliver = $decoded['addressDeliver'];
    $order = $decoded['order'];
    $orderSalad = $order['salad'];
    $orderSoup = $order['soup'];
    $orderHotter = $order['hotter'];
    $orderSide = $order['side'];

    $address = "edacity@yandex.ru";
    
    $msg  = "<html><body style='font-family: Arial, sans-serif; font-size: 2vw;'>";
    $msg .= "<h1 style='font-weight: bold;'>Данные клиента:</h1>\r\n";
    $msg .= "<p><strong>Имя:</strong> ".$name."</p>\r\n";
    $msg .= "<p><strong>Телефон:</strong> ".$phone."</p>\r\n";
    $msg .= "<p><strong>Адрес доставки:</strong> ".$addressDeliver."</p>\r\n";
    $msg .= "<h2 style='font-weight: bold;'>Заказ:</h2>\r\n";
    $msg .= "<p><strong>Обед комплексный</strong> ".$amount." &#10005; 199 руб. = ".($amount * 199)." руб.</p>\r\n";
    $msg .= "<div style='font-size: 12px; margin: 5px 3px;'>".$orderSalad."</div>\r\n";
    $msg .= "<div style='font-size: 12px; margin: 5px 3px;'>".$orderSoup."</div>\r\n";
    $msg .= "<div style='font-size: 12px; margin: 5px 3px;'>".$orderHotter."</div>\r\n";
    $msg .= "<div style='font-size: 12px; margin: 5px 3px;'>".$orderSide."</div>\r\n";

    $totalPrice = 199;

    foreach($order['submenu'] as $item) {
       $price = $item['amount'] * $item['price'];
       $msg .= "<p>".$item['name']." ".$item['amount']." &#10005; ".$item['price']." руб. = ".$price." руб.</p>\r\n";
       $totalPrice += $price;
    }
    $msg .=  "<p><strong>Итого: ".$totalPrice."</strong></p>\r\n";
    $msg .= "</body></html>";


    $sub =  '=?utf-8?B?' . base64_encode("клиент") . '?=';
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $send = mail($address,$sub,$msg, $headers);
    
    if($send) {echo 'OK';}
  } else {
    // Send error back to user.
    echo is_array($decoded);
  }
}
?>