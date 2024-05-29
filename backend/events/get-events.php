<?php
include '../connection.php';

session_start();

$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Contagem total de eventos
$total_query = "SELECT COUNT(*) as total FROM eventos";
$total_result = $conn->query($total_query);
$total_row = $total_result->fetch_assoc();
$total = $total_row['total'];

// Paginação
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$events_per_page = 10;
$offset = ($page - 1) * $events_per_page;

$sql = "SELECT e.id, e.nome, e.descricao, e.data, e.localidade, e.categoria_id, u.nome AS nome_criador, c.nome AS nome_categoria
        FROM eventos AS e 
        INNER JOIN usuarios AS u ON e.criador = u.id 
        INNER JOIN categorias_eventos AS c ON e.categoria_id = c.id
        ORDER BY e.id DESC
        LIMIT $offset, $events_per_page";

$result = $conn->query($sql);
$rows = $result->fetch_all(MYSQLI_ASSOC);
$conn->close();

header('Content-type: application/json');
echo json_encode(['data' => $rows, "total" => $total]);
?>
