const db = require('../models/db');
const { validarClienteERestaurante } = require('../mock/service1');
const { verificarDisponibilidadePratos } = require('../mock/service2');

exports.createOrder = async (req, res) => {
  const { clienteId, restauranteId, itens } = req.body;

  if (!validarClienteERestaurante(clienteId, restauranteId)) {
    return res.status(400).json({ error: 'Cliente ou restaurante inválido' });
  }

  if (!verificarDisponibilidadePratos(itens)) {
    return res.status(400).json({ error: 'Um ou mais pratos indisponíveis' });
  }

  db.getConnection((err, connection) => {
    if (err) return res.status(500).json({ error: err.message });

    connection.beginTransaction(err => {
      if (err) return res.status(500).json({ error: err.message });

      connection.query(
        'INSERT INTO orders (cliente_id, restaurante_id, status) VALUES (?, ?, ?)',
        [clienteId, restauranteId, 'em preparo'],
        (err, results) => {
          if (err) return connection.rollback(() => res.status(500).json({ error: err.message }));

          const orderId = results.insertId;
          const values = itens.map(item => [orderId, item.pratoId, item.quantidade]);

          connection.query(
            'INSERT INTO order_items (order_id, prato_id, quantidade) VALUES ?',
            [values],
            (err) => {
              if (err) return connection.rollback(() => res.status(500).json({ error: err.message }));

              connection.commit(err => {
                if (err) return connection.rollback(() => res.status(500).json({ error: err.message }));
                res.status(201).json({ message: 'Pedido criado com sucesso', orderId });
              });
            }
          );
        }
      );
    });
  });
};

exports.updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Status atualizado' });
  });
};

exports.getOrderById = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM orders WHERE id = ?', [id], (err, orderResults) => {
    if (err || orderResults.length === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    db.query('SELECT * FROM order_items WHERE order_id = ?', [id], (err, itemResults) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        ...orderResults[0],
        itens: itemResults
      });
    });
  });
};

//PAGAMENTO
exports.updatePaymentStatus = (req, res) => {
    const { id } = req.params;
    const { pagamentoConfirmado } = req.body;
  
    if (pagamentoConfirmado !== 0 && pagamentoConfirmado !== 1) {
      return res.status(400).json({ error: 'Pagamento confirmado deve ser 0 (não pago) ou 1 (pago)' });
    }
  
    db.query(
      'UPDATE orders SET pagamento_confirmado = ? WHERE id = ?',
      [pagamentoConfirmado, id],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
  
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Pedido não encontrado' });
        }
  
        res.json({ message: 'Status de pagamento atualizado com sucesso' });
      }
    );
  };
  
