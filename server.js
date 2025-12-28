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
host: 'mysql-container',
  user: 'appuser',
  password: 'password123',
  database: 'fullstack_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

// Get all restaurants
app.get('/api/restaurants', (req, res) => {
  db.query('SELECT * FROM restaurants ORDER BY rating DESC', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Search restaurants by cuisine
app.get('/api/restaurants/search', (req, res) => {
  const cuisine = req.query.cuisine;
  db.query(
    'SELECT * FROM restaurants WHERE LOWER(cuisine) LIKE ? ORDER BY rating DESC',
    [`%${cuisine.toLowerCase()}%`],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
