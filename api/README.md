# WaiterApp API 🍽️

WaiterApp é uma ferramenta projetada para facilitar o trabalho dos garçons, agilizando o processo de atendimento e gerenciamento de pedidos. O objetivo do aplicativo é melhorar a eficiência dos serviços em restaurantes, bares e cafés.

## 📝 Descrição do Projeto

Este projeto é uma aplicação para restaurantes, focada na criação de um sistema de pedidos para garçons. A aplicação foi desenvolvida utilizando Node.js com Express para o backend, MongoDB para o banco de dados e TypeScript para tipagem estática. O projeto inclui a configuração do servidor, conexão com o MongoDB, definição de rotas RESTful e implementação de modelos com Mongoose para gerenciar dados de categorias, produtos e pedidos.

## ✨ Funcionalidades

- Listar categorias
- Listar produtos
- Gerenciar pedidos (criar, listar, atualizar status e cancelar)
- Upload de imagens utilizando a biblioteca Multer
- Servir arquivos estáticos
- Validações básicas e manipulação de dados com Mongoose

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- TypeScript
- Multer

## 📥 Instalação

1. Clone o repositório:
```bash
https://github.com/Viniciusrbr/waiterapp-api.git
```

2. Navegue até o diretório do projeto:
```bash
cd waiterapp-api
```

3. Instale as dependências:
```bash
npm install
```

## 🔧 Executando o Projeto

Para iniciar o servidor em ambiente de desenvolvimento, execute:
```bash
npm run dev
```

## 🛣️ Rotas da API

### Categorias
- `GET /categories`: Lista todas as categorias
- `POST /categories`: Cria uma nova categoria

### Produtos
- `GET /products`: Lista todos os produtos
- `POST /products`: Cria um novo produto (com upload de imagem)
- `GET /categories/:categoryId/products`: Lista produtos por categoria

### Pedidos
- `GET /orders`: Lista todos os pedidos
- `POST /orders`: Cria um novo pedido
- `PATCH /orders/:orderId`: Atualiza o status de um pedido
- `DELETE /orders/:orderId`: Cancela um pedido
