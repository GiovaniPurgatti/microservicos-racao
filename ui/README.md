# PetShop UI

Este é o frontend da aplicação PetShop, desenvolvido com Next.js 14 e Tailwind CSS.

## Requisitos

- Node.js 18.17 ou superior
- npm 9.6.7 ou superior

## Instalação

1. Clone o repositório
2. Navegue até o diretório do projeto:
   ```bash
   cd ui
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
NEXT_PUBLIC_API_URL=http://localhost:8081
```

## Executando o projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`.

## Funcionalidades

- Navegação por diferentes tipos de rações
- Cadastro e login de usuários
- Visualização de detalhes dos produtos
- Realização de pedidos
- Acompanhamento de pedidos

## Tecnologias utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- React Hook Form
- Yup
- Axios
- React Hot Toast
- Headless UI
- Heroicons
