// controllers/categoriasController.js
const db = require('../models/db');

exports.listarCategorias = async (req, res) => {
  try {
    const [categorias] = await db.promise().query('SELECT * FROM categorias');
    res.json(categorias);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
};
