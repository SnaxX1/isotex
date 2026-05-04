import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`UPDATE products SET image = '/images/denim.png' WHERE title = 'Recycled Denim Acoustic Panel'`);
  db.run(`UPDATE products SET image = '/images/mycelium.png' WHERE title = 'Mycelium Wall Tile'`);
});

db.close(() => {
  console.log('Images updated successfully in the database.');
});
