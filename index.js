
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./database.sqlite');

// Création des tables si elles n'existent pas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);
  db.run(`INSERT OR IGNORE INTO users (username, password) VALUES ('Ahmed', 'password'), ('Amina', 'password')`);

  db.run(`CREATE TABLE IF NOT EXISTS produits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT,
    quantite INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS visites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT,
    date_visite TEXT,
    client TEXT,
    type_client TEXT,
    adresse TEXT,
    ville TEXT,
    gps TEXT,
    echantillons TEXT,
    remarque TEXT
  )`);
});

// Authentification simple
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
    if (row) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Identifiants invalides" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
