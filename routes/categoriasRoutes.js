// ✅ Importa o módulo Express, necessário para criar rotas
const express = require('express');

// ✅ Cria uma instância de roteador do Express
const router = express.Router();

// ✅ Importa o controlador responsável pelas operações relacionadas às categorias
const categoriasController = require('../controllers/categoriasController');

// ✅ Rota para listar todas as categorias disponíveis
// ✅ Método: GET | Caminho: /categorias
router.get('/', categoriasController.listarCategorias);

// ✅ Exporta o roteador para ser utilizado no arquivo principal da aplicação
module.exports = router;
