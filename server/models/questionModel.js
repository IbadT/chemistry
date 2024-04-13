const { INTEGER, STRING, ARRAY, BOOLEAN } = require('sequelize');
const db = require('../config/db.js');
const UserModel = require('./userModel.js');

const QuestionModel = db.define('questions', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: STRING,
        allowNull: false,
        require: true
    },
    hasOptions: {
        type: BOOLEAN,
        allowNull: false,
        require: true,
        defaultValue: true
    },
    name: {
        type: STRING,
        allowNull: false,
        require: true
    },
    user_id: {
        type: INTEGER,
        allowNull: false,
        require: true,
        references: {
            model: UserModel,
            key: "id"       
        }
    }

});

module.exports = QuestionModel;