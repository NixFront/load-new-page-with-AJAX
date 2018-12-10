<?php
$errorMSG = "";
// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Заполните имя";
} else {
    $name = $_POST["name"];
}
// PHONE
if (empty($_POST["phone"])) {
    $errorMSG = "Заполните телефон";
} else {
    $phone = $_POST["phone"];
}
// EMAIL
if (empty($_POST["email"])) {
    $errorMSG = "Заполните email";
} else {
    $email = $_POST["email"];
}
// MESSAGE
if ($_POST["message"]) {
    $message = $_POST["message"];
}
$EmailTo = "test@gmail.com";
$Subject = "Сообщение от vipo.by";
// prepare email body text
$Body = "";
$Body .= "Имя: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Телефон: ";
$Body .= $phone;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Сообщение:";
$Body .= $message;
$Body .= "\n";
$headers  = "Content-type: text/html; charset=utf-8 \r\n";
// send email
$success = mail($EmailTo, $Subject, $Body,$headers);
?>