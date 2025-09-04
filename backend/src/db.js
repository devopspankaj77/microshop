import mysql from 'mysql2/promise'


export async function getPool() {
const pool = await mysql.createPool({
host: process.env.MYSQL_HOST || 'localhost',
user: process.env.MYSQL_USER || 'root',
password: process.env.MYSQL_PASSWORD || 'password',
database: process.env.MYSQL_DB || 'microshop',
waitForConnections: true,
connectionLimit: 10,
maxIdle: 10,
idleTimeout: 60000
})
return pool
}


export async function migrate(pool) {
await pool.query(`CREATE TABLE IF NOT EXISTS items (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`)
}