// ✅ Importa o módulo 'path' para manipulação de caminhos de diretórios
const path = require('path');

// ✅ Carrega variáveis de ambiente do arquivo .env localizado um nível acima
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// ✅ Importa o módulo 'mysql2' para conexão com o banco de dados MySQL
const mysql = require('mysql2');

// ✅ Cria um pool de conexões com o banco de dados usando configurações vindas do arquivo .env
const pool = mysql.createPool({
  host: process.env.DB_HOST,           // Endereço do host do banco
  port: process.env.DB_PORT,           // Porta do banco de dados
  user: process.env.DB_USER,           // Usuário do banco
  password: process.env.DB_PASSWORD,   // Senha do banco
  database: process.env.DB_NAME,       // Nome do banco de dados
  waitForConnections: true,            // Aguarda conexões caso todas estejam ocupadas
  connectionLimit: 10,                 // Limite máximo de conexões simultâneas
  queueLimit: 0                        // Limite da fila de conexões (0 = ilimitado)
});

// ✅ Exporta o pool de conexões para ser usado em outras partes da aplicação
module.exports = pool;
