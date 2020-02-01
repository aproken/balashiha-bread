<?php

$userName = $_POST['userName'];
$userEmail = $_POST['userEmail'];
$userPhone = $_POST['userPhone'];

// Load Composer's autoloader
require '../../PHPMailer/PHPMailer.php';
require '../../PHPMailer/SMTP.php';
require '../../PHPMailer/Exception.php';
require '../../Setting.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    //Server settings
    $mail->SMTPDebug = 1;                      // Enable verbose debug output
    $mail->isSMTP();                           // Send using SMTPN
    $mail->Host       = $setting->Host;        // Set the SMTP server to send through
    $mail->SMTPAuth   = $setting->SMTPAuth;    // Enable SMTP authentication
    $mail->Username   = $setting->Username;    // SMTP username
    $mail->Password   = $setting->Password;    // SMTP password
    $mail->SMTPSecure = $setting->SMTPSecure;  // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = $setting->Port;        // TCP port to connect to

    //Recipients
    $mail->setFrom($setting->sendFrom);

    foreach ($setting->sendTo as $email) {
        $mail->addAddress($email);     // Add a recipient
    }

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Новая заявка с сайта';
    $mail->Body    = "Имя пользователя: ${userName}, его телефон: ${userPhone}. Его почта: ${userEmail}";

    if ($mail->send()) {
        echo "ok";
    } else {
        echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
    }
    
    //$mail->send();
    //header('Location: thanks.html');
} catch (Exception $e) {
    echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
}