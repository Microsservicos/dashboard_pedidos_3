const db = require('../models/db');

// controllers/pratosController.js
exports.listarPratosPorCategoria = async (req, res) => {
    const { categoria_id } = req.params;
  
    try {
      const [pratos] = await db.promise().query(
        'SELECT id, nome, preco FROM pratos WHERE categoria_id = ?',
        [categoria_id]
      );
  
      res.json(pratos);
    } catch (error) {
      console.error('Erro ao buscar pratos:', error);
      res.status(500).json({ error: 'Erro ao buscar pratos' });
    }
  };
  