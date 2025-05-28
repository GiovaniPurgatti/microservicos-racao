create database db_pedidos;

USE db_pedidos;

CREATE TABLE IF NOT EXISTS pedidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cliente_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL,
    valor_total DOUBLE NOT NULL,
    data_pedido TIMESTAMP
);

CREATE TABLE IF NOT EXISTS itens_pedido (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pedido_id BIGINT NOT NULL,
    produto_id BIGINT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DOUBLE NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);