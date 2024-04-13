const { INTEGER, STRING, BOOLEAN } = require('sequelize');
const db = require('../config/db.js');
const QuestionModel = require('./questionModel.js');

const OptionsModel = db.define("option", {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: STRING,
        allowNull: false,
        require: true
    },
    isCorrect: {
        type: BOOLEAN,
        allowNull: false,
        require: true,
        defaultValue: false
    },
    question_id: {
        type: INTEGER,
        allowNull: false,
        require: true,
        references: {
            model: QuestionModel,
            key: "id"
        }
    }
});

module.exports = OptionsModel;