import mysql from 'mysql2/promise'; // ❗Use promise-based API
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  console.log('✅ Connected to MySQL');

  await connection.query(`
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT,
      longitude FLOAT
    )
  `);

  console.log('✅ Schools table is ready');

  return connection;
};

export default connectDB; // ✅ Now it *is* a function
