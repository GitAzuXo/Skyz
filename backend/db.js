// backend/db.js (CommonJS-compatible version)
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const db = new Database('skyz.db', { verbose: console.log });

// Créer la table si elle n'existe pas
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    password TEXT NOT NULL
  );
`).run();

// Functions
function addUser(name, email, password) {
  const stmt = db.prepare('SELECT email FROM users WHERE email = ?');

  if (stmt.get(email)) {
    return { error: 'Email already exists' };
  } else {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const insertStmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    return insertStmt.run(name, email, hashedPassword);
  }
}

function getUsers() {
  return db.prepare('SELECT * FROM users').all();
}

function verifyUser(name, password) {
  const stmt = db.prepare('SELECT password FROM users WHERE name = ?');
  const user = stmt.get(name);
  if (user && bcrypt.compareSync(password, user.password)) {
    return { success: true };
  }
  return { success: false, error: 'Invalid credentials' };
}

// Export functions
module.exports = {
  addUser,
  getUsers,
  verifyUser
};
