<?php
require 'vendor/autoload.php'; // Incluir la autoload de Composer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "nuevo_usuario"; // Cambia por tu nombre de usuario
$password = "tu_contraseña"; // Cambia por tu contraseña
$dbname = "notificaciones"; // Nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener todos los correos
$sql = "SELECT email FROM emails"; // Solo selecciona el campo 'email'
$result = $conn->query($sql);

// Crear una instancia de PHPMailer
$mail = new PHPMailer(true);

try {
    // Configurar el servidor SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.office365.com'; // Servidor SMTP de Outlook
    $mail->SMTPAuth = true;
    $mail->Username = 'OCULTO@outlook.com'; // Cambia por tu dirección de correo de Outlook
    $mail->Password = 'OCULTO'; // Usa aquí la contraseña de aplicación generada
    $mail->SMTPSecure = "tls";             
    $mail->Port = 587; // 587 para TLS o 465 para SSL
    $mail->SMTPDebug = 1; // Activar salida de depuración

    // Establecer los encabezados
    $mail->setFrom('OCULTO@outlook.com', 'Eric'); // Cambia por tu correo y nombre
    $mail->isHTML(true); // Para enviar contenido HTML

    // Enviar correos a cada dirección
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $to = $row['email'];
            $mail->addAddress($to); // Añadir el destinatario

            // Cuerpo del mensaje mejorado
            $mail->Subject = "¡Escucha 'El Cantante' - Nuevo EP!";
            $mail->Body = '
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                        padding: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background: #fff;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        padding: 20px;
                    }
                    h1 {
                        color: #007BFF;
                    }
                    p {
                        line-height: 1.6;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 15px;
                        margin: 20px 0;
                        background-color: #007BFF;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 0.9em;
                        color: #777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>¡El Cantante ha llegado!</h1>
                    <p>Estamos emocionados de anunciar que nuestro nuevo EP, <strong>"El Cantante"</strong>, con 6 canciones impresionantes ya está disponible. Este álbum ha sido creado con mucho amor y dedicación, ¡y no podemos esperar a que lo escuches!</p>
                    <p>Haz clic en el siguiente botón para ir a nuestra página web y disfrutar de "El Cantante".</p>
                    <a class="button" href="https://ericofcrypto.com/otros/index.html">Escuchar Ahora</a>
                    <div class="footer">
                        <p>Gracias por tu apoyo,</p>
                        <p>Eric</p>
                    </div>
                </div>
            </body>
            </html>';

            // Enviar el correo
            if ($mail->send()) {
                echo "Correo enviado a: $to<br>";
            } else {
                echo "Error al enviar correo a: $to. Mailer Error: {$mail->ErrorInfo}<br>";
            }

            $mail->clearAddresses(); // Limpiar destinatarios para el próximo envío
        }
    } else {
        echo "No se encontraron correos en la base de datos.";
    }

} catch (Exception $e) {
    echo "El correo no se pudo enviar. Mailer Error: {$mail->ErrorInfo}";
}

// Cerrar la conexión
$conn->close();
?>
