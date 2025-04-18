// ✅ Importa o módulo Express, necessário para criar rotas
const express = require('express');

// ✅ Cria um roteador do Express para agrupar rotas relacionadas a pedidos
const router = express.Router();

// ✅ Importa o controlador que contém as funções responsáveis por manipular os pedidos
const orderController = require('../controllers/orderController');

// ✅ Rota para criar um novo pedido
// ✅ Método: POST | Caminho: /api/orders/
// ✅ O corpo da requisição deve conter os dados do pedido
router.post('/', orderController.createOrder);

// ✅ Rota para atualizar o status de um pedido (ex: "em preparo", "entregue", etc.)
// ✅ Método: PUT | Caminho: /api/orders/:id/status
// ✅ O parâmetro `:id` identifica o pedido
router.put('/:id/status', orderController.updateOrderStatus);

// ✅ Rota para buscar os detalhes de um pedido específico pelo ID
// ✅ Método: GET | Caminho: /api/orders/:id
router.get('/:id', orderController.getOrderById);

// ✅ Rota para atualizar o status de pagamento de um pedido (ex: "pago", "pendente")
// ✅ Método: PUT | Caminho: /api/orders/:id/payment
router.put('/:id/payment', orderController.updatePaymentStatus);

// ✅ Exporta o roteador para ser usado no arquivo principal (app.js)
module.exports = router;
