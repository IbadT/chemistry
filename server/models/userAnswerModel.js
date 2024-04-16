const { INTEGER, BOOLEAN, STRING } = require('sequelize');
const db = require('../config/db.js');
const QuestionModel = require('./questionModel.js');
const OptionsModel = require('./optionsModel.js');
const UserModel = require('./userModel.js');

const UserAnswerModel = db.define("user_answer", {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    isCorrectAnswer: {
        type: BOOLEAN,
        allowNull: false,
        require: true,
    },
    answer: {
        type: STRING,
        allowNull: true,
    },
    question_id: {
        type: INTEGER,
        allowNull: false,
        require: true,
        references: {
            model: QuestionModel,
            key: "id"
        }
    },
    option_id: {
        type: INTEGER,
        allowNull: false,
        require: true,
        references: {
            model: OptionsModel,
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

module.exports = UserAnswerModel;