<?php
include '../connection.php';

session_start();

// Inicializar um array com 12 elementos, um para cada mês do ano, todos com valor 0
$inscricoesPorMes = array_fill(0, 12, 0);

$sql = "
    SELECT 
        MONTH(e.data) AS mes, 
        COUNT(i.id) AS num_inscricoes 
    FROM 
        inscricoes i
    JOIN 
        eventos e 
    ON 
        i.evento_id = e.id
    GROUP BY 
        mes
";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $mes = (int) $row['mes'];
        $inscricoesPorMes[$mes - 1] = $row['num_inscricoes']; // Subtrair 1 para ajustar o índice do array (0-11)
    }
}

$conn->close();

header('Content-type: application/json');
echo json_encode(array_values($inscricoesPorMes));
?>
