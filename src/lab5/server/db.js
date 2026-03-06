const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

// Crear pool de conexión MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'bdpaises',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Función para verificar la conexión
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a MySQL establecida con éxito');
        connection.release();
    } catch (error) {
        console.error('Error al conectar a MySQL:', error);
    }
}
testConnection();
module.exports = pool;