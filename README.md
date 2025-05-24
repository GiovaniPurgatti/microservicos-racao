# Microserviços de Ração

Este projeto contém uma arquitetura de microserviços para gerenciamento de uma Plataforma de Venda de Ração para Animais, implementada em Java com Spring Boot.

## Estrutura do Projeto

O projeto está dividido em diferentes serviços, cada um em sua própria pasta:

- `api-usuario`: Serviço de gerenciamento de usuários
- `api-catalogo`: Serviço de gerenciamento de produtos/catálogo
- `api-pagamento`: Serviço de processamento de pagamentos
- `api-pedidos`: Serviço de gerenciamento de pedidos

## Como Executar

Para executar cada serviço, siga os passos abaixo:

1. Navegue até a pasta do serviço desejado:
   ```bash
   cd nome-do-servico
   ```

2. Execute o Docker Compose para construir e iniciar o serviço:
   ```bash
   docker compose up --build
   ```

Repita estes passos para cada serviço que deseja executar.

## Requisitos

- Docker
- Docker Compose

## Observações

- Cada serviço possui seu próprio arquivo `docker-compose.yml` com as configurações específicas
- Os serviços podem ser executados independentemente
- Cada serviço utiliza MySQL como banco de dados
- Certifique-se de que as portas necessárias estejam disponíveis em sua máquina
- Todos os serviços são desenvolvidos em Java com Spring Boot
