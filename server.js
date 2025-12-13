const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'appuser',
  password: 'password123',
  database: 'fullstack_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

// Routes
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/users', (req, res) => {
  const { name, color } = req.body;
  db.query('INSERT INTO users (name, color) VALUES (?, ?)', [name, color], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name, color });
  });
});

app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { color } = req.body;
  db.query('UPDATE users SET color = ? WHERE id = ?', [color, id], (err) => {
    if (err) throw err;
    res.json({ message: 'Color updated!' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
