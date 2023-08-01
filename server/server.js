const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  user: 'your_postgres_username',
  password: 'your_postgres_password',
  host: 'localhost',
  port: 5432,
  database: 'my_app_db',
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'your_secret_key', // Replace this with a strong secret key
    resave: false,
    saveUninitialized: true,
  })
);

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [
      username,
      hashedPassword,
    ]);
    res.status(200).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while registering user.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.username = user.username;
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid login credentials.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while logging in.' });
  }
});

app.get('/api/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'Logged out successfully.' });
});

app.get('/api/user', (req, res) => {
  const username = req.session.username;
  if (username) {
    res.status(200).json({ username });
  } else {
    res.status(401).json({ message: 'Not logged in.' });
  }
});

app.listen(3001, () => {
  console.log('Express server running on http://localhost:3001');
});
