import { Pool } from "pg";
import { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } from "../secret";

const pgPool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT as unknown as number,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pgPool;
