import mysql from "mysql2/promise";

// Create connection pool configuration
const poolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true, // Whether to queue connections when limit is reached
  connectionLimit: 10, // Maximum number of connections in pool
  queueLimit: 0, // Maximum number of connection requests in queue (0 = unlimited)
  enableKeepAlive: true, // Maintain connection health
  keepAliveInitialDelay: 10000, // Delay before first keep-alive check
};

// Create the connection pool
const pool = mysql.createPool(poolConfig);

// Utility function to get a connection with error handling
export const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Acquired connection from pool");
    return connection;
  } catch (error) {
    console.error("Failed to get database connection:", error);
    throw new Error("Database connection failed");
  }
};

// Export the pool for direct use
export default pool;
