// ✅ Importa o módulo de conexão com o banco de dados
const db = require('../models/db');

// ✅ Define e exporta a função assíncrona que lista os pratos por categoria
exports.listarPratosPorCategoria = async (req, res) => {
  
  // ✅ Extrai o parâmetro da URL que representa o ID da categoria
  const { categoria_id } = req.params;

  try {
    // ✅ Executa uma consulta no banco de dados para buscar pratos com a categoria fornecida
    // Utiliza .promise() para permitir uso de async/await
    const [pratos] = await db.promise().query(
      'SELECT id, nome, preco FROM pratos WHERE categoria_id = ?', // Consulta SQL com placeholder (?)
      [categoria_id] // Substitui o ? pela categoria_id
    );

    // ✅ Envia os dados dos pratos encontrados como resposta em formato JSON
    res.json(pratos);

  } catch (error) {
    // ⚠️ Se ocorrer algum erro na consulta, exibe o erro no console
    console.error('Erro ao buscar pratos:', error);

    // ⚠️ Retorna erro 500 (erro interno do servidor) e mensagem de erro em JSON
    res.status(500).json({ error: 'Erro ao buscar pratos' });
  }
};
