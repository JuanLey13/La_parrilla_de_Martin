<?php
file_put_contents("debug.txt", file_get_contents("php://input"));

$conexion = new mysqli("localhost", "root", "", "mi_base_datos");
$conexion->set_charset("utf8mb4");

$data = json_decode(file_get_contents("php://input"), true);

$tipo = $data['tipo'];
$nombre = $data['items'][0]['nombre'] ?? 'Cliente';
$subtotal = $data['subtotal'];
$total = $data['total'];
$fecha = date("Y-m-d H:i:s");

$sql = "INSERT INTO pedidos (tipo_pedido, nombre_cliente, subtotal, total, fecha_creacion, metodo_pago)
        VALUES (?, ?, ?, ?, ?, 'efectivo')";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("ssdss", $tipo, $nombre, $subtotal, $total, $fecha);
$stmt->execute();
$pedido_id = $stmt->insert_id;

foreach ($data['items'] as $item) {
    $sql_item = "INSERT INTO pedido_items (pedido_id, plato_id, nombre_plato, precio_unitario, cantidad, subtotal)
                 VALUES (?, ?, ?, ?, ?, ?)";
    $stmt_item = $conexion->prepare($sql_item);
    $plato_id = $item['id'];
    $nombre_plato = $item['nombre'];
    $precio = $item['precio'];
    $cantidad = $item['cantidad'];
    $subtotal_item = $precio * $cantidad;
    $stmt_item->bind_param("iisddi", $pedido_id, $plato_id, $nombre_plato, $precio, $cantidad, $subtotal_item);
    $stmt_item->execute();
}

echo "✅ Pedido guardado correctamente.";
?>
