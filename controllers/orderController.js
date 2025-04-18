// ✅ Importa conexão com banco de dados
const db = require('../models/db');

// ✅ Importa funções de validação (mockadas ou reais)
const { validarClienteERestaurante } = require('../mock/service1');
const { verificarDisponibilidadePratos } = require('../mock/service2');

// ✅ Cria pedido
exports.createOrder = async (req, res) => {
  // 🔸 Extrai dados do corpo da requisição
  const { clienteId, restauranteId, itens } = req.body;

  try {
    // 🔍 Verifica se o cliente existe
    const [clienteRows] = await db.promise().query(
      'SELECT id FROM users2 WHERE id = ?', 
      [clienteId]
    );

    // 🔍 Verifica se o restaurante existe
    const [restauranteRows] = await db.promise().query(
      'SELECT id FROM restaurants2 WHERE id = ?', 
      [restauranteId]
    );

    // ❌ Se cliente ou restaurante não existir, retorna erro
    if (clienteRows.length === 0 || restauranteRows.length === 0) {
      return res.status(400).json({ error: 'Cliente ou restaurante inválido' });
    }

    // ✅ Abre conexão para transação com banco
    db.getConnection((err, connection) => {
      if (err) return res.status(500).json({ error: err.message });

      // ✅ Inicia transação
      connection.beginTransaction(err => {
        if (err) return res.status(500).json({ error: err.message });

        // ✅ Insere o pedido na tabela `orders`
        connection.query(
          'INSERT INTO orders (cliente_id, restaurante_id, status) VALUES (?, ?, ?)',
          [clienteId, restauranteId, 'em preparo'],
          (err, results) => {
            if (err) {
              return connection.rollback(() =>
                res.status(500).json({ error: err.message })
              );
            }

            const orderId = results.insertId; // 🔎 ID do novo pedido

            // 🔸 Mapeia os itens para o formato aceito pela query
            const values = itens.map(item => [
              orderId, item.pratoId, item.quantidade
            ]);

            // ✅ Insere os itens na tabela `order_items`
            connection.query(
              'INSERT INTO order_items (order_id, prato_id, quantidade) VALUES ?',
              [values],
              (err) => {
                if (err) {
                  return connection.rollback(() =>
                    res.status(500).json({ error: err.message })
                  );
                }

                // ✅ Confirma a transação
                connection.commit(err => {
                  if (err) {
                    return connection.rollback(() =>
                      res.status(500).json({ error: err.message })
                    );
                  }

                  // 🎉 Sucesso!
                  res.status(201).json({ message: 'Pedido criado com sucesso', orderId });
                });
              }
            );
          }
        );
      });
    });

  } catch (err) {
    // ⚠️ Erro na validação externa ou conexão
    res.status(500).json({ error: 'Erro ao processar pedido: ' + err.message });
  }
};
// ✅ Atualiza o status de um pedido
exports.updateOrderStatus = (req, res) => {
  const { id } = req.params;       // ID do pedido
  const { status } = req.body;     // Novo status

  // 🔄 Atualiza o campo 'status' no pedido correspondente
  db.query(
    'UPDATE orders SET status = ? WHERE id = ?',
    [status, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // ✅ Retorna sucesso
      res.json({ message: 'Status atualizado' });
    }
  );
};
// ✅ Retorna detalhes de um pedido específico
exports.getOrderById = (req, res) => {
  const { id } = req.params; // ID do pedido

  // 🔍 Busca pedido na tabela orders
  db.query('SELECT * FROM orders WHERE id = ?', [id], (err, orderResults) => {
    if (err || orderResults.length === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    // 📦 Busca itens do pedido
    db.query(
      'SELECT * FROM order_items WHERE order_id = ?', 
      [id], 
      (err, itemResults) => {
        if (err) return res.status(500).json({ error: err.message });

        // ✅ Retorna pedido + itens
        res.json({
          ...orderResults[0],
          itens: itemResults
        });
      }
    );
  });
};
// ✅ Atualiza status de pagamento do pedido
exports.updatePaymentStatus = (req, res) => {
  const { id } = req.params;                       // ID do pedido
  const { pagamentoConfirmado } = req.body;        // Novo status

  // ❌ Valida o valor (deve ser 0 ou 1)
  if (pagamentoConfirmado !== 0 && pagamentoConfirmado !== 1) {
    return res.status(400).json({ error: 'Pagamento confirmado deve ser 0 (não pago) ou 1 (pago)' });
  }

  // 🔄 Atualiza o campo pagamento_confirmado
  db.query(
    'UPDATE orders SET pagamento_confirmado = ? WHERE id = ?',
    [pagamentoConfirmado, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      // ✅ Sucesso
      res.json({ message: 'Status de pagamento atualizado com sucesso' });
    }
  );
};
// ✅ Lista todos os pratos disponíveis no banco
exports.getPratos = async (req, res) => {
  try {
    // 📦 Executa SELECT na tabela de pratos
    const [rows] = await db.promise().execute('SELECT * FROM pratos');

    // ✅ Retorna os dados
    res.status(200).json(rows);
  } catch (err) {
    // ⚠️ Erro na consulta
    console.error('Erro ao buscar pratos:', err);
    res.status(500).json({ error: 'Erro ao buscar pratos' });
  }
};
