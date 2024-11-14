<?php
session_start();


// Si el usuario es admin, continuar con la conexión a la base de datos
$host = 'localhost'; 
$db = 'mensajes'; 
$user = 'nuevo_usuario'; 
$pass = 'tu_contraseña'; 

// Crear conexión
$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Obtener datos del formulario
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Preparar y ejecutar la consulta
$stmt = $conn->prepare("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {
    // Mostrar mensaje de éxito y redirigir
    echo '<!DOCTYPE html>
    <html lang="ca">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Enviat Correctament</title>
        <meta http-equiv="refresh" content="2;url=/index.html"> <!-- Cambia la URL si es necesario -->
    </head>
    <body>
        <h1>Missatge enviat correctament!</h1>
        <p>Seràs redirigit a la pàgina principal en 2 segons.</p>
    </body>
    </html>';
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
