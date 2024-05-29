<?php
include '../connection.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$evento_id = $data['evento_id'];
$usuario_id = $data['usuario_id'];

$sql = "DELETE FROM inscricoes
        WHERE usuario_id = $usuario_id AND evento_id = $evento_id";

if ($conn->query($sql)) {
    header('Content-type: application/json');
    echo json_encode(['data' => 'Success']);
} else {
    http_response_code(404);
    header('Content-type: application/json');
    echo json_encode(["error" => "Erro ao se inscrever no evento, tente novamente mais tarde"]);
}
?>
