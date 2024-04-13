const QuestionService = require('../services/questionService.js');


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTcxMjUyNDg1OH0.XFFysrCL7U5b04lTYecT-a8UE8K8s1pNN0y0vppSCs4

class QuestionController {
    async getAllQuestions(req, res) {
        try {
            const { user_id } = req;
            const questions = await QuestionService.getAllQuestions(user_id);
            res.send(questions);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    };

    async getAllQuestionsByName(req, res) {
        try {
            const { name } = req.query;
            const questions = await QuestionService.getAllQuestionsByName(name);
            res.send(questions);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    }

    async getQuestionWithOptionById(req, res) {
        try {
            const { id } = req.params;
            const questions = await QuestionService.getQuestionWithOptionById(id);
            res.send(questions);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    };
    
    async getQuestionWithOptionsByUserId(req, res) {
        try {
            const { user_id } = req;
            const questionsWithOptions = await QuestionService.getQuestionWithOptionsByUserId(user_id);
            res.send(questionsWithOptions);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    }

    async createQuestion(req, res) {
        try {
            const { user_id } = req;
            const createdQuestion = await QuestionService.createQuestion(req.body, user_id);
            res.send(createdQuestion);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    };

    async updateQuestion(req, res) {
        try {
            const { id } = req.params;
            const { user_id } = req;
            console.log(`body: ${req.body}`);
            const updatedQuestion = await QuestionService.updateQuestion(id, user_id, req.body);
            res.send(updatedQuestion);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    };

    async deleteQuestion(req, res) {
        try {
            const { id } = req.query;
            const { user_id } = req.params;
            const deletedResult = await QuestionService.deleteQuestion(id, user_id);
            res.send(deletedResult);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    };
};

module.exports = new QuestionController();