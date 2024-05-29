<?php
include '../connection.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$evento_id = $data['evento_id'];
$usuario_id = $data['usuario_id'];

$sql = "INSERT INTO inscricoes (usuario_id, evento_id) 
        VALUES ('$usuario_id', '$evento_id')";

if ($conn->query($sql)) {
    header('Content-type: application/json');
    echo json_encode(['data' => 'created']);
} else {
    http_response_code(404);
    header('Content-type: application/json');
    echo json_encode(["error" => "Erro ao se inscrever no evento, tente novamente mais tarde"]);
}
?>
