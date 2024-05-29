<?php
include '../connection.php';    

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$password = $data['senha'];

$sql = "
    SELECT * FROM usuarios
    WHERE email = '{$email}'
    AND senha = '{$password}'
";

$res = $conn->query($sql) or die($conn->error);
$qtd = $res->num_rows;
$row = $res->fetch_object();

if ($qtd > 0) {
    header('Content-type: application/json');
    echo json_encode([
        'id' => $row->id,
        'name' => $row->nome
    ]);
} else {
    http_response_code(404);
    header('Content-type: application/json');
    echo json_encode(["error" => "Usuário ou senha incorretos"]);
}

?>
