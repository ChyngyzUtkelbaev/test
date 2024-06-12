const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Создание таблицы при запуске сервера
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    registrationDate TEXT NOT NULL
)`);

// Регистрация пользователя
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const registrationDate = new Date().toISOString();

    const stmt = db.prepare("INSERT INTO users (name, email, password, registrationDate) VALUES (?, ?, ?, ?)");
    stmt.run(name, email, password, registrationDate, function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ success: false, message: 'Failed to register user' });
        }
        res.json({ success: true });
    });
    stmt.finalize();
});

// Логин пользователя
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        if (!row) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        res.json({ success: true, user: row });
    });
});

// Обновление профиля пользователя
app.post('/profile', (req, res) => {
    const { name, id } = req.body;
    const stmt = db.prepare("UPDATE users SET name = ? WHERE id = ?");

    stmt.run(name, id, function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ success: false, message: 'Failed to update profile' });
        }
        res.json({ success: true });
    });
    stmt.finalize();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
