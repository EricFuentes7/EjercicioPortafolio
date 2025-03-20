<?php
session_start();

// Verificar si la sesión de usuario está activa y si es "admin"
if (!isset($_SESSION['userType']) || $_SESSION['userType'] !== 'admin') {
    echo '<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Acceso Denegado</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <h1>No tienes permisos para acceder a esta página.</h1>
    </body>
    </html>';
    exit();
}

// Configuración de la base de datos
$host = 'localhost'; 
$db = 'mensajes'; 
$user = 'nuevo_usuario'; 
$pass = 'tu_contraseña'; 

// Crear la conexión
$conn = new mysqli($host, $user, $pass, $db);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta para obtener los mensajes de la tabla
$sql = "SELECT name, email, message, created_at FROM contact_messages ORDER BY created_at DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="ca">
<head>
    <link rel="stylesheet" href="styles.css">
    <title>Missatges</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.25, user-scalable=no">
</head>
<body>
    <header>
        <h1>Missatges d'Usuaris</h1>
    </header>
    
    <div class="messages-container">
        <?php if ($result->num_rows > 0): ?>
            <?php while($row = $result->fetch_assoc()): ?>
                <div class="message-card">
                    <h2><?php echo htmlspecialchars($row['name']); ?></h2>
                    <p><strong>Correu electrònic:</strong> <?php echo htmlspecialchars($row['email']); ?></p>
                    <p><strong>Missatge:</strong> <?php echo htmlspecialchars($row['message']); ?></p>
                    <p><strong>Data:</strong> <?php echo date('d/m/Y H:i', strtotime($row['created_at'])); ?></p>
                </div>
            <?php endwhile; ?>
        <?php else: ?>
            <p>No hi ha missatges per mostrar.</p>
        <?php endif; ?>
    </div>

    <?php
    // Cerrar la conexión
    $conn->close();
    ?>
</body>
</html>
