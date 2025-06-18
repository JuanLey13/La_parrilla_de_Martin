<?php
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
