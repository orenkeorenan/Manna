import mysql from "mysql2/promise";

let db;

if (!db) {
  if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
    throw new Error("Missing DB env variables! Did you set them in Vercel?");
  }

  db = mysql.createPool({
    host: process.env.DB_HOST,            // must be your cloud DB host
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: { rejectUnauthorized: false },
  });
}

export { db };
