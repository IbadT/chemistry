const { QuestionModel, OptionsModel } = require('../models/_models.js');

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTcxMjUyNDg1OH0.XFFysrCL7U5b04lTYecT-a8UE8K8s1pNN0y0vppSCs4

class QuestionService {

    async getAllQuestions(user_id) {
        // const allQuestions = await QuestionModel.findAll({ where: { user_id }, attributes: ["id, name"]});
        const allQuestions = await QuestionModel.findAll({ where: { user_id } });
        return [allQuestions[0]];
    };

    async getAllQuestionsByName(name) {
        const questions = await QuestionModel.findAll({ where: { name }});
        return questions;
    }

    async getQuestionWithOptionById(id) {
        const question = await QuestionModel.findOne({ where: { id }});
        const optionsForQuestion = await OptionsModel.findAll({ where: { question_id: id }})
        return {
            question,
            options: optionsForQuestion
        };
    };

    async getQuestionWithOptionsByUserId(user_id) {
        const questionsByUserId = await QuestionModel.findAll({ where: { user_id }, attributes: ["id", "title", "name", "hasOptions"]});
        // [ { "id": 3 }, { "id": 4 } ]
        
        const optionsPromises = questionsByUserId.map(async ({ id, title, name, hasOptions }) => {
            const options = await OptionsModel.findAll({ where: { question_id: id }});
            const result = { id, title, name, hasOptions, options };
            return result;
        })
        const options = await Promise.all(optionsPromises);
        return options
    };

    async createQuestion(question, user_id) {
        const createdQuestion = await QuestionModel.create({...question, user_id });
        return createdQuestion;
    };

    // убрать user_id 
    async updateQuestion(id, user_id, updQuestion) {
        const updatedQuestion = await QuestionModel.update(updQuestion, { where: { id, user_id }});
        return updatedQuestion;
    };

    async deleteQuestion(id, user_id) {
        const deletedResult = await QuestionModel.destroy({ where: { id, user_id }});
        return deletedResult;
    };

};

module.exports = new QuestionService();