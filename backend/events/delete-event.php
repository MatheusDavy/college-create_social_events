<?php
include '../connection.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$id = isset($_GET['event']) ? intval($_GET['event']) : '';

$sql_delete_comentarios = "DELETE FROM comentarios WHERE evento_id = $id";

$sql_delete_inscricoes = "DELETE FROM inscricoes WHERE evento_id = $id";

$sql_delete_evento = "DELETE FROM eventos WHERE id = $id";

if (
    $conn->query($sql_delete_comentarios) === TRUE && 
    $conn->query($sql_delete_inscricoes) === TRUE && 
    $conn->query($sql_delete_evento) === TRUE
) {
    $conn->close();
    header('Content-type: application/json');
    echo json_encode(['data' => 'deleted']);
} else {
    echo json_encode(['error' => 'Error deleting record: ' . $conn->error]);
}
?>
