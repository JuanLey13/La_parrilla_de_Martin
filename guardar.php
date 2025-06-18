<?php
// Conexión con la base de datos (XAMPP)
$conexion = new mysqli("localhost", "root", "", "restaurante");

// Verificar si hay error en la conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Recibir los datos del formulario
$nombre = $_POST['nombre']; 
$celular = $_POST['celular'];
$fecha = $_POST['fecha'];
$personas = $_POST['personas'];

// Verificar si los campos están vacíos
if (empty($nombre) || empty($celular) || empty($fecha) || empty($personas)) {
    die("Todos los campos son obligatorios");
}

// Verificar si el teléfono y personas son números
if (!is_numeric($celular)) {
    die("El teléfono debe ser un número");
}

// Insertar los datos en la base de datos
$sql = "INSERT INTO reservaciones (nombre, celular, fecha, personas) 
        VALUES ('$nombre', '$celular', '$fecha', '$personas')";

if ($conexion->query($sql) === TRUE) {
    // Redirigir antes de hacer echo
    header("Location: reservas.html?reserva=ok");
    exit();
} else {
    echo "Error al guardar la reserva: " . $conexion->error;
}

// Cerrar la conexión
$conexion->close();
?>
