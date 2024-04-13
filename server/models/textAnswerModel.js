const { INTEGER, STRING, BOOLEAN } = require('sequelize');
const db = require('../config/db.js');
const TextQuestionModel = require('./textQuestionModel.js');
const UserModel = require('./userModel.js');

const TextAnswerModel = db.define("text_answer", {
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
    userAnswer: {
        type: STRING,
        allowNull: false,
        require: true
    },
    isCorrectUserAnswer: {
        type: BOOLEAN,
        allowNull: false,
        require: true
    },
    text_question_id: {
        type: INTEGER,
        allowNull: false,
        require: true,
        references: {
            model: TextQuestionModel,
            key: "id"
        }
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

module.exports = TextAnswerModel;