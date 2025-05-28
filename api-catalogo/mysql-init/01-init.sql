SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET character_set_connection=utf8mb4;

CREATE DATABASE IF NOT EXISTS db_catalogo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_catalogo;

DROP TABLE IF EXISTS catalogo;
CREATE TABLE catalogo (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    descricao TEXT,
    peso DOUBLE NOT NULL,
    preco DOUBLE NOT NULL,
    estoque INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO catalogo (nome, tipo, descricao, peso, preco, estoque) VALUES
('Ração Premium Cães Adultos', 'Cachorro', 'Ração super premium para cães adultos, rica em proteínas e nutrientes essenciais', 15.0, 89.90, 50),
('Ração Premium Gatos Filhotes', 'Gato', 'Ração especial para gatos filhotes, com nutrientes para desenvolvimento saudável', 10.0, 79.90, 45),
('Ração Premium Cães Filhotes', 'Cachorro', 'Ração super premium para cães filhotes, com nutrientes para crescimento', 15.0, 94.90, 40),
('Ração Premium Gatos Adultos', 'Gato', 'Ração super premium para gatos adultos, com taurina e nutrientes essenciais', 10.0, 84.90, 55),
('Ração Premium Cães Sênior', 'Cachorro', 'Ração especial para cães idosos, com nutrientes para saúde articular', 15.0, 99.90, 30),
('Ração Premium Gatos Castrados', 'Gato', 'Ração especial para gatos castrados, com controle de peso', 10.0, 89.90, 35),
('Ração Premium Cães Raças Pequenas', 'Cachorro', 'Ração especial para cães de raças pequenas, com grãos menores', 7.5, 69.90, 60),
('Ração Premium Gatos Sênior', 'Gato', 'Ração especial para gatos idosos, com nutrientes para saúde renal', 10.0, 94.90, 25),
('Ração Premium Cães Raças Grandes', 'Cachorro', 'Ração especial para cães de raças grandes, com nutrientes para articulações', 20.0, 119.90, 40),
('Ração Premium Gatos Filhotes Especial', 'Gato', 'Ração super premium para gatos filhotes, com DHA para desenvolvimento cerebral', 10.0, 89.90, 30); 