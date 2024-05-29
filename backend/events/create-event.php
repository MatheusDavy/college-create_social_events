<?php
include '../connection.php';

$data = json_decode(file_get_contents("php://input"), true);

$dataTime = $data['dateTime'];
$localidade = $data['localidade'];
$nome = $data['nome'];
$descricao = $data['descricao'];
$criador = $data['userId'];
$categoria = $data['categoria'];

$sql = "
    INSERT INTO eventos (nome, descricao, data, localidade, categoria_id, criador)
    VALUES ('$nome', '$descricao', '$dataTime', '$localidade', '$categoria', $criador)
";

if ($conn->query($sql)) {
    header('Content-type: application/json');
    echo json_encode(['data' => 'created']);
} else {
    http_response_code(404);
    header('Content-type: application/json');
    echo json_encode(["error" => "Erro ao executar esta ação, tente novamente mais tarde"]);
}
?>  