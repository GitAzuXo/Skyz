// lib/db.js
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const db = new Database('skyz.db', { verbose: console.log });

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    password TEXT NOT NULL,
    score INTEGER DEFAULT 0 NOT NULL
  );
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    answer INTEGER NOT NULL,
    difficulty TEXT NOT NULL,
    option1 TEXT NOT NULL,
    option2 TEXT NOT NULL,
    option3 TEXT NOT NULL
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

function addQuestion(question, answer, difficulty, option1, option2, option3) {
  const stmt = db.prepare('SELECT text FROM questions WHERE text = ?');
  if (stmt.get(question)) {
    return { error: 'Question already exists' };
  } else {
    try {
      const insertStmt = db.prepare('INSERT INTO questions (text, answer, difficulty, option1, option2, option3) VALUES (?, ?, ?, ?, ?, ?)');
      return insertStmt.run(question, answer, difficulty, option1, option2, option3);
    } catch (error) {
      console.error('Database error in addQuestion:', error);
      throw error;
    }
  }
}

function getUsers() {
  return db.prepare('SELECT * FROM users').all();
}

function getQuestions(limit, excludeIds = []) {
  const placeholders = excludeIds.map(() => '?').join(', ');
  const query = `
    SELECT * FROM questions
    ${excludeIds.length > 0 ? `WHERE id NOT IN (${placeholders})` : ''}
    ORDER BY RANDOM()
    LIMIT ?;
  `;
  return db.prepare(query).all(...excludeIds, limit);
}

function saveScore(name, score) {
  const stmt = db.prepare('UPDATE users SET score = ? WHERE name = ?');
  return stmt.run(score, name);
}

function verifyUser(name, password) {
  const stmt = db.prepare('SELECT password, score FROM users WHERE name = ?');
  const user = stmt.get(name);
  if (user && bcrypt.compareSync(password, user.password)) {
    return { success: true, score: user.score };
  }
  return { success: false, error: 'Invalid credentials' };
}

module.exports = {
  addUser,
  getUsers,
  verifyUser,
  getQuestions,
  addQuestion,
  saveScore
};
