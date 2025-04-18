# 📦 Sistema de Pedidos com Node.js e MySQL

Este projeto é uma API desenvolvida com **Node.js** e **MySQL** que permite gerenciar pedidos feitos por clientes a restaurantes, incluindo funcionalidades como criação de pedidos, atualização de status e confirmação de pagamento.

## 🚀 Funcionalidades

- Criar pedido com múltiplos pratos
- Consultar pedido por ID
- Atualizar status do pedido
- Confirmar pagamento

## 🛠️ Tecnologias

- Node.js
- Express
- MySQL
- Axios (para testes com APIs externas)
- Insomnia/Postman para testes de rota

---

## 📸 Imagens do Projeto

### ✅ Criar Pedido
![Criar Pedido](./img/criar_pedido.png)

### 🔍 Consultar Pedido
![Consultar Pedido](./img/consultar_pedido.png)

### 🔄 Atualizar Status
![Atualizar Status](./img/atualizar_status.png)

### 💰 Atualizar Pagamento
![Atualizar Pagamento](./img/atualizar_pagamento.png)

---

## 📬 Exemplo de Requisição

### 🔹 Criar Pedido

**POST** `/api/orders`

```json
{
  "clienteId": 1,
  "restauranteId": 2,
  "itens": [
    { "pratoId": 10, "quantidade": 2 },
    { "pratoId": 15, "quantidade": 1 }
  ]
}
```

📅 **Resposta esperada:**
```json
{
  "message": "Pedido criado com sucesso",
  "orderId": 42
}
```

### 🔹 Atualizar Status do Pedido

**PUT** `/api/orders/:id/status`

```json
{
  "status": "entregue"
}
```

### 🔹 Atualizar Pagamento

**PUT** `/api/orders/:id/pagamento`

```json
{
  "pagamentoConfirmado": 1
}
```

### 🔹 Consultar Pedido por ID

**GET** `/api/orders/:id`

📅 **Resposta esperada:**
```json
{
  "id": 42,
  "cliente_id": 1,
  "restaurante_id": 2,
  "status": "em preparo",
  "pagamento_confirmado": 1,
  "itens": [
    {
      "order_id": 42,
      "prato_id": 10,
      "quantidade": 2
    },
    {
      "order_id": 42,
      "prato_id": 15,
      "quantidade": 1
    }
  ]
}
```

---

## 📁 Estrutura de Pastas

```
📦 projeto
 ├️ 📂 img
 ┃ ├️ 📄 criar_pedido.png
 ┃ ├️ 📄 consultar_pedido.png
 ┃ ├️ 📄 atualizar_status.png
 ┃ └️ 📄 atualizar_pagamento.png
 ├️ 📂 models
 ┃ └️ 📄 db.js
 ┃ └️ 📄 db2.js
 ├️ 📂 mock
 ┃ └️ 📄 service1.js
 ┃ └️ 📄 service2.js
 ├️ 📂 public
 ┃ └️ 📄 index.html
 ├️ 📂 controllers
 ┃ └️ 📄 ordersController.js
 ┃ └️ 📄 categoriasController.js
 ┃ └️ 📄 pratosController.js
 ├️ 📂 routes
 ┃ └️ 📄 ordersRoutes.js
 ┃ └️ 📄 categoriasRoutes.js
 ┃ └️ 📄 pratosRoutes.js
 ├️ 📄 .env
 ├️ 📄 app.js
 └️ 📄 README.md
```

---

## 🔧 Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/Microsservicos/dashboard_pedidos_3
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados MySQL:
Crie um banco e configure as credenciais no arquivo `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=delivery
```

4. Execute as migrations (caso esteja usando):
```bash
npm run migrate
```

5. Inicie o servidor:
```bash
npm start
```

Servidor rodando em: `http://localhost:3000`

---

## 🥮 Testes com cURL

### Criar Pedido
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId": 1,
    "restauranteId": 2,
    "itens": [
      { "pratoId": 10, "quantidade": 2 },
      { "pratoId": 15, "quantidade": 1 }
    ]
  }'
```

### Atualizar Status
```bash
curl -X PUT http://localhost:3000/api/orders/42/status \
  -H "Content-Type: application/json" \
  -d '{ "status": "entregue" }'
```

### Confirmar Pagamento
```bash
curl -X PUT http://localhost:3000/api/orders/42/pagamento \
  -H "Content-Type: application/json" \
  -d '{ "pagamentoConfirmado": 1 }'
```

### Consultar Pedido
```bash
curl http://localhost:3000/api/orders/42
```

---

## 📅 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 🧑‍💻 Autor

Desenvolvido por **[Ana Beatriz Lukasavicus Silva]** ✨

---


