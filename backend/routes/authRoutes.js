const express = require('express');
const bcrypt = require('bcrypt');
const { pool } = require('../config/database');
const router = express.Router();


function generateToken(userId) {
    const timestamp = new Date().getTime();
    return `token-${userId}-${timestamp}-${Math.random().toString(36).substring(2, 15)}`;
}

router.post('/login', async (req, res) => {
    console.log('Received POST request at /api/auth/login');
    console.log('Request Body:', req.body); // 檢查請求體內容
    const { account, password } = req.body;
    if (!account || !password) {
        return res.status(400).json({ error: '請提供帳號和密碼' });
    }

    try {
        // 1. 查詢資料庫中的用戶
        const [rows] = await pool.execute('SELECT * FROM users WHERE account = ?', [account]);

        if (rows.length === 0) {
            return res.status(401).json({ error: '帳號不存在' });
        }

        const user = rows[0];

        // 2. 驗證密碼
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: '密碼錯誤' });
        }

        // 3. 登入成功，產生並回傳 Token跟其他資料
        const token = generateToken(user.id);
        const lastLogin = new Date().toISOString();
        const loginIp = req.ip || req.headers['x-forwarded-for'] || 'unknown'; 
        const deviceInfo = req.headers['user-agent'] || 'unknown';
        const now=new Date();
        const expiresInMilliseconds = 24 * 60 * 60 * 1000;
        const expiresAt=new Date(now.getTime() + expiresInMilliseconds);
        // 更新用戶資料
        await pool.execute(
            'INSERT INTO tokens (user_id, token, expires_at, login_at, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?)',
            [user.id, token, expiresAt, now, loginIp, deviceInfo]
        );

        return res.json({ success: true, token: token, user: { id: user.id, account: user.account } });

    } catch (error) {
        console.error('登入驗證錯誤:', error);
        return res.status(500).json({ error: '伺服器錯誤，請稍後再試' });
    }
});

module.exports = router;