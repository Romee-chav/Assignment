import mysql from 'mysql2/promise'; // ❗Use promise-based API
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  const connection = await mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    port: process.env.MYSQLPORT,
    database: process.env.MYSQLDATABASE,
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
