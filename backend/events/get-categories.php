<?php
include '../connection.php';

session_start();

$sql = "SELECT id, nome FROM categorias_eventos";
$result = $conn->query($sql);

$categorias = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $categoria = [
            'id' => $row['id'],
            'nome' => $row['nome']
        ];
        $categorias[] = $categoria;
    }
}

$conn->close();

header('Content-type: application/json');
echo json_encode($categorias);
?>
