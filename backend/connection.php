<?php   
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        exit; // Finaliza o script após responder às solicitações OPTIONS
    }
    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access");

    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "projeto_02";
    
    // Cria conexão
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Checa conexão
    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }
?>
