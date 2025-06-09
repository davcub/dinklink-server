import { Pool } from "pg";

const testPool = new Pool({
  user: "testuser",
  password: "testpass",
  host: "localhost",
  port: 55432,
  database: "testdb",
  ssl: false,
});

export default testPool;
