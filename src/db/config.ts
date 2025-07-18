import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../../dua_main.sqlite');

console.log(dbPath);

let db: Database.Database;
try {
     db = new Database(dbPath);
    console.log('Database connected successfully');
} catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
}

export default db;