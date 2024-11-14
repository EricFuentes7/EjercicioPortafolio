<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json'); // Asegúrate de que el tipo de contenido sea JSON

// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "nuevo_usuario"; // El nuevo nombre de usuario
$password = "tu_contraseña"; // La contraseña del nuevo usuario
$dbname = "notificaciones"; // Nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    echo json_encode(["error" => "Conexión fallida: " . $conn->connect_error]);
    exit();
}

// Capturar el correo y la fecha enviados por POST
$data = json_decode(file_get_contents("php://input"));
$email = $data->email ?? null; // Agregar un valor por defecto
$fecha_envio = '2024-10-26'; // Asignar la fecha fija directamente

// Validar el correo electrónico
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // Verificar si el correo ya está registrado
    $stmt = $conn->prepare("SELECT COUNT(*) FROM emails WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    
    if ($count > 0) {
        echo json_encode(["error" => "Correo ya registrado."]);
    } else {
        // Preparar y ejecutar la consulta para insertar
        $stmt->close(); // Cerrar el statement anterior
        $stmt = $conn->prepare("INSERT INTO emails (email, fecha_envio) VALUES (?, ?)");
        $stmt->bind_param("ss", $email, $fecha_envio);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Correo registrado correctamente."]);
        } else {
            echo json_encode(["error" => "Error al registrar el correo."]);
        }
    }
    $stmt->close();
} else {
    echo json_encode(["error" => "Correo no válido."]);
}

// Cerrar la conexión
$conn->close();
?>
