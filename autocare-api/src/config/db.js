const mysql = require('mysql2/promise');

// Crear pool de conexiones a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'autocare',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Comprobar la conexión
pool.getConnection()
  .then(connection => {
    console.log('✅ Conexión exitosa a la base de datos MySQL');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Error conectando a la base de datos:', err.message);
  });

module.exports = pool;
