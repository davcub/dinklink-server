import testPool from "./testPool";

describe("Quick DB Integration Test", () => {
  beforeAll(async () => {
    await testPool.query(`
		CREATE TABLE IF NOT EXISTS users (
		  id SERIAL PRIMARY KEY,
		  name TEXT NOT NULL
		);
	  `);
  });

  afterAll(async () => {
    await testPool.query(`DROP TABLE IF EXISTS users;`);
    await testPool.end();
  });

  it("inserts and fetches a user", async () => {
    await testPool.query(`INSERT INTO users (name) VALUES ($1)`, ["Alice"]);
    const result = await testPool.query(`SELECT * FROM users`);
    expect(result.rows.length).toBe(1);
    expect(result.rows[0].name).toBe("Alice");
  });
});
