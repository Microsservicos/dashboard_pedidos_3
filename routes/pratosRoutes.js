// ✅ Importa o módulo Express para criar o roteador
const express = require('express');

// ✅ Cria uma instância de roteador do Express
const router = express.Router();

// ✅ Importa o controller responsável pela lógica dos pratos
const pratosController = require('../controllers/pratosController.js');

// ✅ Rota para listar todos os pratos de uma categoria específica
// ✅ Exemplo: GET /pratos/categoria/2
// ✅ O valor após "/categoria/" será capturado como `categoria_id` no controller
router.get('/categoria/:categoria_id', pratosController.listarPratosPorCategoria);

// ✅ Exporta o roteador para ser usado no arquivo principal (app.js)
module.exports = router;
