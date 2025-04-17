const express = require('express');
const path = require('path');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = 3003;

// ✅ Middleware para interpretar JSON deve vir ANTES de tudo
app.use(express.json());

// ✅ Rotas da API de pedidos
app.use('/api/orders', orderRoutes);

// ✅ Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Rota fallback
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
