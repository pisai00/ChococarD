const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const app = express();
const port = process.env.SERVER_PORT || 3000;
const { pool } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const corsOptions = {
  origin:  'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(cors(corsOptions));//開特權的啦
app.use(express.json())
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);

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

