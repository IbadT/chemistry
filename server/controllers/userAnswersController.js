const UserAnswerService = require('../services/userAnswersService.js');

class UserAnswerController {
    async getAllAnswers(req, res) {
        try {
            const { user_id } = req;
            const answers = await UserAnswerService.getAllAnswers(user_id);
            console.log(answers);
            res.send(answers);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    };

    async create(req, res) {
        try {
            const { body, user_id } = req;
            const addedAnswer = await UserAnswerService.create(body, user_id);
            res.send(addedAnswer);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    };

    async createText(req, res) {
        try {
            const { body } = req;
            const addedAnswer = await UserAnswerService.create(body);
            res.send(addedAnswer);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    };

    async deleteAnswers(req, res) {
        try {
            const { user_id } = req;
            const deletedResult = await UserAnswerService.deleteAnswers(user_id);
            res.send(deletedResult);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    }
};

module.exports = new UserAnswerController();