<?php
include '../connection.php';

session_start();

$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Extrair os dados da pesquisa
$searchTerm = isset($data["search"]) ? $data["search"] : "";

$offset = isset($data["page"]) ? ($data['page'] - 1) * 10 : 0;

$sql = "SELECT e.id, e.nome, e.descricao, e.data, e.localidade, e.categoria_id, u.nome AS nome_criador 
        FROM eventos AS e 
        INNER JOIN usuarios AS u ON e.criador = u.id 
        WHERE e.nome LIKE '%$searchTerm%' 
        OR e.descricao LIKE '%$searchTerm%' 
        OR e.localidade LIKE '%$searchTerm%' 
        OR e.data LIKE '%$searchTerm%'
        LIMIT $offset, 10";

$result = $conn->query($sql);
$rows = [];
if ($result) {
    $rows = $result->fetch_all(MYSQLI_ASSOC);
}

$total = mysqli_fetch_array($conn->query("SELECT COUNT(*) FROM eventos WHERE nome LIKE '%$searchTerm%' OR descricao LIKE '%$searchTerm%' OR localidade LIKE '%$searchTerm%' OR data LIKE '%$searchTerm%'"));

$conn->close();

header('Content-type: application/json');
echo json_encode(['data' => $rows, "total" => $total[0]]);
?>
