const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
const app = express();
const port = process.env.SERVER_PORT || 3000;

const pool = mysql.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '3306', 10) // 使用 .env 的 DB_PORT，並確保它是數字
});

app.get('/api/cards', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM cards');
    const cardsWithParsedEffects = rows.map(card => ({
      ...card,
      effect: JSON.parse(card.effect)
    }));
    res.json(cardsWithParsedEffects);
  } catch (error) {
    console.error('Error fetching and parsing cards:', error);
    res.status(500).json({ error: 'Failed to fetch and parse cards' });
  }
});


app.get('/api/enemies/:enemyId', async (req, res) => {
  const { enemyId } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM enemies WHERE id = ?', [enemyId]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Enemy not found' });
    }
  } catch (error) {
    console.error('Error fetching enemy:', error);
    res.status(500).json({ error: 'Failed to fetch enemy' });
  }
});
app.get('/api/cards/:cardId', async (req, res) => {
  const { cardId } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM cards WHERE id = ?', [cardId]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Card not found' });
    }
  } catch (error) {
    console.error('Error fetching card:', error);
    res.status(500).json({ error: 'Failed to fetch card' });
  }
});
app.get('/api/levels/:levelId', async (req, res) => {
  const { levelId } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM levels WHERE id = ?', [levelId]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Level not found' });
    }
  } catch (error) {
    console.error('Error fetching level:', error);
    res.status(500).json({ error: 'Failed to fetch level' });
  }
});

async function connect() {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL');
    connection.release();
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
  }
}

connect();

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});