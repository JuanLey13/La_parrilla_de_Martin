<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pedidos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Error de conexión: ' . $conn->connect_error]));
}

// Recibir datos del pedido
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validar datos básicos
if (!$data || empty($data['tipo']) || empty($data['items'])) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    exit;
}

try {
    // Iniciar transacción
    $conn->begin_transaction();

    // ========================================================================
    // 1. Insertar en PEDIDOS_COCINA (datos esenciales para preparación)
    // ========================================================================
    $datos_cliente = [];
    $tipo = $data['tipo'];

    // Recopilar datos según tipo de pedido
    switch ($tipo) {
        case 'reservacion':
            $datos_cliente = [
                'nombre' => $data['nombre_reserva'],
                'celular' => $data['celular_reserva'],
                'fecha' => $data['fecha_reserva'],
                'hora' => $data['hora_reserva'],
                'personas' => $data['personas_reserva']
            ];
            break;

        case 'delivery':
            $datos_cliente = [
                'nombre' => $data['nombre_delivery'],
                'celular' => $data['celular_delivery'],
                'direccion' => $data['direccion_delivery'],
                'distrito' => $data['distrito_delivery'],
                'referencia' => $data['referencia_delivery']
            ];
            break;

        case 'recojo':
            $datos_cliente = [
                'nombre' => $data['nombre_recojo'],
                'celular' => $data['celular_recojo'],
                'hora' => $data['hora_recojo']
            ];
            break;

        case 'mesa':
            $datos_cliente = [
                'mesa' => $data['mesa'],
                'mozo' => $data['mozo']
            ];
            break;
    }

    // Preparar items para cocina
    $items_cocina = array_map(function($item) {
        return [
            'id' => $item['id'],
            'nombre' => $item['nombre'],
            'opciones' => $item['opciones'] ?? null
        ];
    }, $data['items']);

    // Insertar en pedidos_cocina
    $stmt_cocina = $conn->prepare("INSERT INTO pedidos_cocina 
        (tipo_pedido, datos_cliente, items) 
        VALUES (?, ?, ?)");
    
    $json_datos_cliente = json_encode($datos_cliente);
    $json_items = json_encode($items_cocina);
    
    $stmt_cocina->bind_param("sss", 
        $tipo,
        $json_datos_cliente,
        $json_items
    );

    if (!$stmt_cocina->execute()) {
        throw new Exception("Error al guardar en cocina: " . $stmt_cocina->error);
    }

    // ========================================================================
    // 2. Insertar en ESTADISTICAS_PEDIDOS (datos para análisis)
    // ========================================================================
    $total = $data['total'];
    $costo_delivery = $tipo === 'delivery' ? $data['costoDelivery'] : 0;
    $metodo_pago = $data['metodo_pago'];
    
    $datos_operativos = [
        'subtotal' => $data['subtotal'],
        'costo_delivery' => $costo_delivery,
        'cantidad_items' => count($data['items']),
        'items' => array_map(function($item) {
            return [
                'id' => $item['id'],
                'nombre' => $item['nombre'],
                'precio' => $item['precio']
            ];
        }, $data['items'])
    ];

    $stmt_estadisticas = $conn->prepare("INSERT INTO estadisticas_pedidos 
        (tipo_pedido, fecha, hora, total, costo_delivery, metodo_pago, datos_operativos) 
        VALUES (?, CURDATE(), CURTIME(), ?, ?, ?, ?)");
    
    $json_operativos = json_encode($datos_operativos);
    
    $stmt_estadisticas->bind_param("sddds", 
        $tipo,
        $total,
        $costo_delivery,
        $metodo_pago,
        $json_operativos
    );

    if (!$stmt_estadisticas->execute()) {
        throw new Exception("Error en estadísticas: " . $stmt_estadisticas->error);
    }

    // Confirmar transacción
    $conn->commit();
    
    echo json_encode([
        'success' => true,
        'message' => 'Pedido registrado exitosamente',
        'codigo_cocina' => $conn->insert_id
    ]);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} finally {
    $conn->close();
}