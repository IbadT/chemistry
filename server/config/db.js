const { Sequelize } = require("sequelize");

const db = new Sequelize(
    'chemistry', 
    'postgres', 
    'admin', 
    { 
        dialect: 'postgres', 
        host: 'localhost'
    }
);
module.exports = db;