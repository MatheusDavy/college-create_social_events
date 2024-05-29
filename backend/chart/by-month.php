<?php
include '../connection.php';

$eventosPorMes = array_fill(0, 12, 0);

$sql = "
    SELECT 
        MONTH(data) AS mes, 
        COUNT(id) AS num_eventos 
    FROM 
        eventos 
    GROUP BY 
        mes
";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $mes = (int) $row['mes'];
        $eventosPorMes[$mes - 1] = $row['num_eventos']; // Subtrair 1 para ajustar o índice do array (0-11)
    }
}

$conn->close();

header('Content-type: application/json');
echo json_encode(array_values($eventosPorMes));
?>
