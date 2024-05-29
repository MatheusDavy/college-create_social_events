<?php
include '../connection.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$usuario_id = $data['usuario_id'];

$sql = "SELECT e.* 
        FROM eventos e
        INNER JOIN inscricoes i ON e.id = i.evento_id
        WHERE i.usuario_id = '$usuario_id'";

$result = $conn->query($sql);

if ($result) {
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    header('Content-type: application/json');
    echo json_encode(['data' => $rows]);
} else {
    http_response_code(404);
    header('Content-type: application/json');
    echo json_encode(["error" => "Erro ao buscar os eventos inscritos"]);
}
?>
