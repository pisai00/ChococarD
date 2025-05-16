'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        account: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // 可以添加其他欄位，例如 email, createdAt, updatedAt 等
    }, {
        tableName: 'users', // 可選：指定資料庫中的表格名稱
        timestamps: true,   // 可選：自動添加 createdAt 和 updatedAt 欄位
    });

    return User;
};