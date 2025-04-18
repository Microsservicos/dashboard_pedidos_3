// ✅ Importa o módulo Express para criação do servidor
const express = require('express');

// ✅ Importa o módulo path para manipulação de caminhos de arquivos
const path = require('path');

// ✅ Importa as rotas relacionadas aos pedidos
const orderRoutes = require('./routes/orderRoutes');

// ✅ Inicializa o app Express
const app = express();

// ✅ Define a porta em que o servidor irá rodar
const PORT = 3003;

// ✅ Middleware para interpretar requisições com corpo no formato JSON
app.use(express.json());

// ✅ Define o uso das rotas da API de pedidos, prefixando com '/api/orders'
app.use('/api/orders', orderRoutes);

// ✅ Servir arquivos estáticos da pasta 'public' (como HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Rota padrão (fallback) para acessar o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Importa as rotas dos pratos
const pratosRoutes = require('./routes/pratosRoutes');

// ✅ Usa as rotas dos pratos, acessíveis via '/pratos'
app.use('/pratos', pratosRoutes);

// ✅ Importa as rotas das categorias
const categoriasRoutes = require('./routes/categoriasRoutes');

// ✅ Usa as rotas das categorias, acessíveis via '/categorias'
app.use('/categorias', categoriasRoutes);

// ✅ Importa o controller de pedidos (ajuste o caminho conforme necessário)
const ordersController = require('./controllers/orderController');

// ✅ Rota adicional da API para listar pratos, usando o método getPratos do controller
app.get('/api/pratos', ordersController.getPratos);

// ✅ Inicia o servidor e escuta na porta definida, exibindo mensagem no terminal
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

// ✅ Exporta o app para testes ou uso externo
module.exports = app;
