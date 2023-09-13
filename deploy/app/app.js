const express = require('express');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'examplepassword',
  database: 'mydatabase',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Create a simple route to fetch data from the database
app.get('/', (req, res) => {
  db.query('SELECT * FROM mytable', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
