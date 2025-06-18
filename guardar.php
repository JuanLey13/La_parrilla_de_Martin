<?php
<<<<<<< HEAD
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
=======
echo "<pre>";
print_r($_POST);
echo "</pre>";
//conexion con la base de datos xampp
$conexion = new mysqli("localhost", "root", "", "restaurante");
//verificar si hay error en la conexion 
if($conexion ->connect_error){
    die("Error de conexion: " . $conexion->connect_error);
}
//recibir los datos del formulario
$nombre = $_POST['nombres']; 
$celular = $_POST['celular'];
$fecha = $_POST['fecha'];
$personas=$_POST○['personas'];
//verificar si los campos estan vacios
if(empty($nombres) || empty($celular) || empty($fecha) || empty($personas)){
    echo "Todos los campos son obligatorios";
    exit();
}
//verificar si el telefono es un numero
if(!is_numeric($celular)){
    echo "El telefono debe ser un numero";
    exit();
}   
//verificar si el numero de personas es un numero
if(!is_numeric($personas)){
    echo "El numero de personas debe ser un numero";
    exit();
}
//insertar los datos en la base de datos        
$sql = "INSERT INTO reservas (nombre, apellido, telefono, direccion, personas) VALUES ('$nombres', '$celular', '$fecha', '$personas')";
if($conexion->query($sql) === TRUE){
    echo "Reserva guardada correctamente";
} else {
    3
    echo "Error al guardar la reserva: " . $conexion->error;
}       
//cerrar la conexion
$conexion->close(); 
//redireccionar a la pagina de inicio
header("Location: index.php");
>>>>>>> ff3dc4c1f9696010bc351ebbc3ec85a601d9929e
