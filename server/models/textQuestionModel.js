const { INTEGER, STRING, BOOLEAN } = require('sequelize');
const db = require('../config/db.js');
const UserModel = require('./userModel.js');

const TextQuestionModel = db.define("text_question", {
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
        defaultValue: false
    },
    answer: {
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

module.exports = TextQuestionModel;