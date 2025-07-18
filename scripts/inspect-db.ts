import Database from 'better-sqlite3';

const db = new Database('dua_main.sqlite');

const tables = db.prepare(`
  SELECT name FROM sqlite_master WHERE type='table';
`).all() as { name: string }[];

console.log('Tables:', tables);

for (const { name } of tables) {
  const schema = db.prepare(`SELECT sql FROM sqlite_master WHERE name = ?`).get(name) as { sql: string };
  console.log(`\nSchema for ${name}:\n${schema.sql}`);
}
