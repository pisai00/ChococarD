const express = require('express');
const { pool } = require('../config/database');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');


router.get('/levels/:levelId', async (req, res) => {
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

router.get('/profile', authenticate, (req, res) => {
  res.json({ userId: req.userId, account: req.userAccount, message: '這是受保護的個人資料' });
});


module.exports = router;