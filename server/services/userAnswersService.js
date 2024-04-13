const { UserAnswerModel, TextAnswerModel } = require('../models/_models.js');

class UserAnswerService {
    async getAllAnswers(user_id) {
        const answers = await UserAnswerModel.findAll({ where: { user_id }});
        const text_answers = await TextAnswerModel.findAll({ where: { user_id }});
        return {
            with_options: answers,
            without_options: text_answers
        }
    };

    async create(body, user_id) {
        const { title } = body;
        console.log({ body, user_id });
        if(title === undefined) {
            const addedAnswer = await UserAnswerModel.create({...body, user_id});
            console.log(addedAnswer);
            return addedAnswer;
        } else {
            const addedAnswer = await TextAnswerModel.create({...body, user_id});
            console.log(addedAnswer);
            return addedAnswer;
        }
    };

    async deleteAnswers(user_id) {
        const deletedResultFromQuestions = await UserAnswerModel.destroy({ where: { user_id }});
        const deletedResultFromTextQuestions = await TextAnswerModel.destroy({ where: { user_id }});
        return {
            deletedResultFromQuestions,
            deletedResultFromTextQuestions
        }
    }
};

module.exports = new UserAnswerService();