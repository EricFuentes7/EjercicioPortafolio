<?php
session_start();

// Recibir el tipo de usuario desde la solicitud
$input = json_decode(file_get_contents('php://input'), true);

// Verificar si es "admin" y establecer una sesión
if (isset($input['userType']) && $input['userType'] === 'admin') {
    $_SESSION['userType'] = 'admin';
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error']);
}
?>
