const db = require('./db');

// Testar conexão
db.getConnection((err, connection) => {
  if (err) {
    console.log('Erro de conexão:', err.message);
  } else {
    console.log('Conexão bem-sucedida!');
    connection.release(); // Libera a conexão
  }
});
