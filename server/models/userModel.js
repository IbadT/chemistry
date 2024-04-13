const { STRING, INTEGER } = require('sequelize');
const db = require('../config/db.js');

const UserModel = db.define('users', {
    id: {
        type: INTEGER,
        primaryKey: true, 
        autoIncrement: true,
    },
    user_name: {
        type: STRING,
        allowNull: false,
        require: true
    },
    email: {
        type: STRING,
        allowNull: false,
        unique: true,
        require: true
    },
    password: {
        type: STRING,
        allowNull: false,
        require: true,
    }
});

module.exports = UserModel;