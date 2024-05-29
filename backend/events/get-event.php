    <?php
    include '../connection.php';

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $event_id = isset($_GET['event']) ? intval($_GET['event']) : '';
    $user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : '';

    $sql = "SELECT e.id, e.nome, e.descricao, e.data, e.localidade, e.categoria_id, u.nome AS nome_criador, c.nome AS nome_categoria,
                com.id AS comentario_id, com.comentario, com.usuario_id, uc.nome AS nome_usuario_comentario
            FROM eventos AS e 
            INNER JOIN usuarios AS u ON e.criador = u.id 
            INNER JOIN categorias_eventos AS c ON e.categoria_id = c.id
            LEFT JOIN comentarios AS com ON e.id = com.evento_id
            LEFT JOIN usuarios AS uc ON com.usuario_id = uc.id
            WHERE e.id = $event_id"; 

    $result = $conn->query($sql);
    $rows = $result->fetch_all(MYSQLI_ASSOC);

    // Organizar os comentários em um array
    $comentarios = [];
    foreach ($rows as $row) {
        // Verificar se o comentário existe
        if ($row['comentario'] !== null) {
            // Construir objeto de comentário
            $comentario = [
                'comentario' => $row['comentario'],
                'nome_usuario_comentario' => $row['nome_usuario_comentario'],
                'usuario_id' => $row['usuario_id'],
            ];
            // Adicionar o comentário ao array de comentários
            $comentarios[] = $comentario;
        }
    }

    // Verificar se o usuário está inscrito no evento
    $sql_inscricao = "SELECT COUNT(*) as inscricoes FROM inscricoes WHERE usuario_id = $user_id AND evento_id = $event_id";
    $result_inscricao = $conn->query($sql_inscricao);
    $row_inscricao = $result_inscricao->fetch_assoc();
    $usuario_inscrito = $row_inscricao['inscricoes'] > 0;

    // Construir objeto de retorno
    $retorno = [
        'evento' => [
            'id' => $event_id,
            'nome' => $rows[0]['nome'],
            'descricao' => $rows[0]['descricao'],
            'data' => $rows[0]['data'],
            'localidade' => $rows[0]['localidade'],
            'categoria_id' => $rows[0]['categoria_id'],
            'nome_criador' => $rows[0]['nome_criador'],
            'nome_categoria' => $rows[0]['nome_categoria'],
            'joined' => $usuario_inscrito
        ],
        'comentarios' => $comentarios
    ];

    $conn->close();

    header('Content-type: application/json');
    echo json_encode($retorno);
    ?>
