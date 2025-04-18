const express = require('express');
const router = express.Router();
const pratosController = require('../controllers/pratosController.js');

// Lista todos os pratos de um restaurante
// routes/pratosRoutes.js
router.get('/categoria/:categoria_id', pratosController.listarPratosPorCategoria);


module.exports = router;
