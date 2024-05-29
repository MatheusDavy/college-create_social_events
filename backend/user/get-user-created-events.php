<?php
include '../connection.php';

session_start();

$json = file_get_contents('php://input');
$data = json_decode($json, true);
echo $data;
$userId = isset($_GET['userId']) ? intval($_GET['userId']) : '';

$total_query = "SELECT COUNT(*) as total FROM eventos WHERE criador = $userId";
$total_result = $conn->query($total_query);
$total_row = $total_result->fetch_assoc();
$total = $total_row['total'];

$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$events_per_page = 10;
$offset = ($page - 1) * $events_per_page;

$sql = "SELECT id, nome, descricao, data, localidade, categoria_id
        FROM eventos
        WHERE criador = $userId
        ORDER BY id DESC
        LIMIT $offset, $events_per_page";

$result = $conn->query($sql);
$rows = $result->fetch_all(MYSQLI_ASSOC);
$conn->close();

header('Content-type: application/json');
echo json_encode(['data' => $rows, "total" => $total]);
?>
