<?php
include '../connection.php';

$sql = "
    SELECT 
        c.id, 
        c.nome, 
        COUNT(e.id) AS num_eventos 
    FROM 
        categorias_eventos c 
    LEFT JOIN 
        eventos e 
    ON 
        c.id = e.categoria_id 
    GROUP BY 
        c.id, 
        c.nome
";
$result = $conn->query($sql);

$categorias = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $categoria = [
            'id' => $row['id'],
            'nome' => $row['nome'],
            'num_eventos' => $row['num_eventos']
        ];
        $categorias[] = $categoria;
    }
}

$conn->close();

header('Content-type: application/json');
echo json_encode($categorias);
?>
