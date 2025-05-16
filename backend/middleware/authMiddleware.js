const pool = require('../config/database'); // 假設您的資料庫連線池設定在 config/database.js

async function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // 從 Authorization header 中獲取 Bearer token

  if (!token) {
    return res.status(401).json({ message: '未提供 token' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT t.user_id, u.account, t.expires_at ' +
      'FROM tokens t ' +
      'JOIN users u ON t.user_id = u.id ' +
      'WHERE t.token = ?',
      [token]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: '無效的 token' });
    }

    const user = rows[0];
    const now = new Date();
    const expiresAt = new Date(user.expires_at);

    if (expiresAt < now) {
      return res.status(401).json({ message: 'token 已過期' });
    }

    req.userId = user.user_id;
    req.userAccount = user.account;
    next(); // 驗證成功，傳遞控制權

    // (可選) 更新 last_activity
    await pool.execute(
      'UPDATE tokens SET last_activity = ? WHERE token = ?',
      [now, token]
    );

  } catch (error) {
    console.error('驗證 Token 時發生錯誤:', error);
    return res.status(500).json({ message: '伺服器錯誤' });
  }
}

module.exports = authenticate;