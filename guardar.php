<?php
// guardar_pedido.php

// Configuración de la base de datos
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', ' mi_base_datos');
define('DB_CHARSET', 'utf8mb4');

// Establecer encabezados para JSON
header('Content-Type: application/json');

// Manejar errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Conectar a la base de datos
function conectarDB() {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
    $opciones = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    
    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $opciones);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error de conexión a la base de datos: ' . $e->getMessage()]);
        exit;
    }
}

// Validar y sanitizar datos de entrada
function validarDatos($data) {
    $validados = [];
    
    // Información del cliente
    $validados['tipo_pedido'] = filter_var($data['tipo_pedido'] ?? '', FILTER_SANITIZE_STRING);
    $validados['nombre_cliente'] = filter_var($data['nombre_cliente'] ?? '', FILTER_SANITIZE_STRING);
    $validados['celular_cliente'] = filter_var($data['celular_cliente'] ?? '', FILTER_SANITIZE_STRING);
    $validados['metodo_pago'] = filter_var($data['metodo_pago'] ?? '', FILTER_SANITIZE_STRING);
    
    // Datos específicos de reservación
    $validados['fecha_reserva'] = filter_var($data['fecha_reserva'] ?? '', FILTER_SANITIZE_STRING);
    $validados['hora_reserva'] = filter_var($data['hora_reserva'] ?? '', FILTER_SANITIZE_STRING);
    $validados['num_personas'] = filter_var($data['num_personas'] ?? 1, FILTER_VALIDATE_INT);
    
    // Datos específicos de delivery
    $validados['direccion'] = filter_var($data['direccion'] ?? '', FILTER_SANITIZE_STRING);
    $validados['distrito'] = filter_var($data['distrito'] ?? '', FILTER_SANITIZE_STRING);
    $validados['referencia'] = filter_var($data['referencia'] ?? '', FILTER_SANITIZE_STRING);
    $validados['costo_delivery'] = filter_var($data['costo_delivery'] ?? 0, FILTER_VALIDATE_FLOAT);
    
    // Datos específicos de recojo
    $validados['hora_recojo'] = filter_var($data['hora_recojo'] ?? '', FILTER_SANITIZE_STRING);
    
    // Totales
    $validados['subtotal'] = filter_var($data['subtotal'] ?? 0, FILTER_VALIDATE_FLOAT);
    $validados['total'] = filter_var($data['total'] ?? 0, FILTER_VALIDATE_FLOAT);
    
    // Items del pedido
    $validados['items'] = [];
    if (isset($data['items']) && is_array($data['items'])) {
        foreach ($data['items'] as $item) {
            $itemValidado = [
                'plato_id' => filter_var($item['plato_id'] ?? 0, FILTER_VALIDATE_INT),
                'nombre' => filter_var($item['nombre'] ?? '', FILTER_SANITIZE_STRING),
                'precio' => filter_var($item['precio'] ?? 0, FILTER_VALIDATE_FLOAT),
                'cantidad' => filter_var($item['cantidad'] ?? 0, FILTER_VALIDATE_INT),
                'subtotal' => filter_var($item['subtotal'] ?? 0, FILTER_VALIDATE_FLOAT)
            ];
            $validados['items'][] = $itemValidado;
        }
    }
    
    return $validados;
}

// Guardar el pedido en la base de datos
function guardarPedido($pdo, $datos) {
    try {
        // Iniciar transacción
        $pdo->beginTransaction();
        
        // Insertar pedido principal
        $sqlPedido = "INSERT INTO pedidos (
            tipo_pedido, 
            nombre_cliente, 
            celular_cliente, 
            fecha_reserva, 
            hora_reserva, 
            num_personas, 
            direccion, 
            distrito, 
            referencia, 
            costo_delivery, 
            hora_recojo, 
            subtotal, 
            total, 
            metodo_pago, 
            fecha_creacion
        ) VALUES (
            :tipo_pedido, 
            :nombre_cliente, 
            :celular_cliente, 
            :fecha_reserva, 
            :hora_reserva, 
            :num_personas, 
            :direccion, 
            :distrito, 
            :referencia, 
            :costo_delivery, 
            :hora_recojo, 
            :subtotal, 
            :total, 
            :metodo_pago, 
            NOW()
        )";
        
        $stmtPedido = $pdo->prepare($sqlPedido);
        $stmtPedido->execute([
            ':tipo_pedido' => $datos['tipo_pedido'],
            ':nombre_cliente' => $datos['nombre_cliente'],
            ':celular_cliente' => $datos['celular_cliente'],
            ':fecha_reserva' => $datos['fecha_reserva'] ?: null,
            ':hora_reserva' => $datos['hora_reserva'] ?: null,
            ':num_personas' => $datos['num_personas'] ?: null,
            ':direccion' => $datos['direccion'] ?: null,
            ':distrito' => $datos['distrito'] ?: null,
            ':referencia' => $datos['referencia'] ?: null,
            ':costo_delivery' => $datos['costo_delivery'] ?: 0,
            ':hora_recojo' => $datos['hora_recojo'] ?: null,
            ':subtotal' => $datos['subtotal'],
            ':total' => $datos['total'],
            ':metodo_pago' => $datos['metodo_pago']
        ]);
        
        // Obtener ID del pedido recién insertado
        $pedidoId = $pdo->lastInsertId();
        
        // Insertar items del pedido
        $sqlItem = "INSERT INTO pedido_items (
            pedido_id, 
            plato_id, 
            nombre_plato, 
            precio_unitario, 
            cantidad, 
            subtotal
        ) VALUES (
            :pedido_id, 
            :plato_id, 
            :nombre_plato, 
            :precio_unitario, 
            :cantidad, 
            :subtotal
        )";
        
        $stmtItem = $pdo->prepare($sqlItem);
        
        foreach ($datos['items'] as $item) {
            $stmtItem->execute([
                ':pedido_id' => $pedidoId,
                ':plato_id' => $item['plato_id'],
                ':nombre_plato' => $item['nombre'],
                ':precio_unitario' => $item['precio'],
                ':cantidad' => $item['cantidad'],
                ':subtotal' => $item['subtotal']
            ]);
        }
        
        // Confirmar transacción
        $pdo->commit();
        
        return $pedidoId;
    } catch (PDOException $e) {
        // Revertir transacción en caso de error
        $pdo->rollBack();
        throw $e;
    }
}

// Procesar la solicitud
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener datos JSON del cuerpo de la solicitud
    $input = json_decode(file_get_contents('php://input'), true);
    
    if ($input === null) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos JSON inválidos']);
        exit;
    }
    
    // Validar datos
    $datos = validarDatos($input);
    
    // Validaciones adicionales
    if (empty($datos['tipo_pedido']) || 
        empty($datos['nombre_cliente']) || 
        empty($datos['celular_cliente']) || 
        empty($datos['items']) || 
        $datos['total'] <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos incompletos o inválidos']);
        exit;
    }
    
    // Conectar a la base de datos
    $pdo = conectarDB();
    
    try {
        // Guardar el pedido
        $pedidoId = guardarPedido($pdo, $datos);
        
        // Respuesta exitosa
        echo json_encode([
            'success' => true,
            'pedido_id' => $pedidoId,
            'message' => 'Pedido guardado correctamente'
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Error al guardar el pedido: ' . $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}
?>