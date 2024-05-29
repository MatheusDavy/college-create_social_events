<?php
include '../connection.php';

$data = json_decode(file_get_contents("php://input"), true);

$evento_id = $data['evento_id'];
$usuario_id = $data['usuario_id'];
$comentario = $data['comentario'];

$sql = "INSERT INTO comentarios (usuario_id, evento_id, comentario) 
        VALUES ('$usuario_id', '$evento_id', '$comentario')";

if ($conn->query($sql)) {
    header('Content-type: application/json');
    echo json_encode(['data' => 'created']);
} else {
    http_response_code(404);
    header('Content-type: application/json');
    echo json_encode(["error" => "Erro ao adicionar o comentário, tente novamente mais tarde"]);
}
?>
