<?php
include '../connection.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$id = $data['id'];
$dateTime = $data['dateTime'];
$localidade = $data['localidade'];
$nome = $data['nome'];
$descricao = $data['descricao'];
$categoria = $data['categoria'];

$sql = "
    UPDATE eventos 
    SET nome = '$nome',
        descricao = '$descricao',
        data = '$dateTime',
        localidade = '$localidade',
        categoria_id = '$categoria'
    WHERE id = $id;
";

if ($conn->query($sql)) {
    header('Content-type: application/json');
    echo json_encode(['data' => 'updated']);
} else {
    http_response_code(404);
    header('Content-type: application/json');
    echo json_encode(["error" => "Erro ao executar esta ação, tente novamente mais tarde"]);
}
?>