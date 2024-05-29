    CREATE DATABASE IF NOT EXISTS projeto_02;
    USE projeto_02;

    CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        senha VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS categorias_eventos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS eventos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        descricao TEXT,
        data DATE,
        localidade VARCHAR(255),
        categoria_id INT,
        criador INT,
        FOREIGN KEY (criador) REFERENCES usuarios(id),
        FOREIGN KEY (categoria_id) REFERENCES categorias_eventos(id)
    );

    CREATE TABLE IF NOT EXISTS inscricoes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuario_id INT,
        evento_id INT,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY (evento_id) REFERENCES eventos(id),
        UNIQUE KEY unique_inscricao (usuario_id, evento_id)
    );

    CREATE TABLE IF NOT EXISTS comentarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuario_id INT,
        evento_id INT,
        comentario TEXT,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY (evento_id) REFERENCES eventos(id)
    );

    -- Inserção das categorias
    INSERT IGNORE INTO categorias_eventos (nome) VALUES ('Doações');
    INSERT IGNORE INTO categorias_eventos (nome) VALUES ('Inclusão Social');
    INSERT IGNORE INTO categorias_eventos (nome) VALUES ('Educação');
    INSERT IGNORE INTO categorias_eventos (nome) VALUES ('Saúde');
    INSERT IGNORE INTO categorias_eventos (nome) VALUES ('Sustentabilidade');

    -- Inserção de usuários
    INSERT INTO usuarios (nome, email, senha) VALUES ('matheus', 'matheus@email.com', '12345');
    INSERT INTO usuarios (nome, email, senha) VALUES ('davy', 'davy@email.com', '54321');
