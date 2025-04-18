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

//Rota verifição dos pratos
const pratosRoutes = require('./routes/pratosRoutes');
app.use('/pratos', pratosRoutes);

//Verificação categorias
const categoriasRoutes = require('./routes/categoriasRoutes');
app.use('/categorias', categoriasRoutes);

const ordersController = require('./controllers/orderController');  // Ajuste conforme seu arquivo

// Rota para listar pratos
app.get('/api/pratos', ordersController.getPratos);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
