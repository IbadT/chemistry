const OptionService = require('../services/optionService.js');

class OptionController {
    async getAllOptionByQuestionId(req, res) {
        try {
            const { question_id } = req.params;
            const options = await OptionService.getAllOptionByQuestionId(question_id);
            res.send(options);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    }
    async createOption(req, res) {
        try {
            const createdOption = await OptionService.createOption(req.body);
            res.send(createdOption);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    }
    async updateOption(req, res) {
        try {
            const { id } = req.params;
            const updatedOption = await OptionService.updateOption(id, req.body);
            res.send(updatedOption);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    }
    async deleteOption(req, res) {
        try {
            const { id } = req.params;
            const deletedResult = await OptionService.deleteOption(id);
            res.send(deletedResult);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    }
};

module.exports = new OptionController();