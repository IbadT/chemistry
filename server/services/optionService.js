const { OptionsModel } = require('../models/_models.js');

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEzMDExMDc5fQ._sVa0B0FKqRL3abhZOgLipAqbBj6xgL7prc4bICy0es

class OptionService {
    async getAllOptionByQuestionId(question_id) {
        const options = await OptionsModel.findAll({ where: { question_id }});
        if(!options) throw new Error("Error with get all options");
        return options;
    };

    async createOption(body) {
        const createdOption = await OptionsModel.create(body);
        return createdOption;
    };

    async updateOption(id, body) {
        const updatedOption = await OptionsModel.update(body, { where: { id }});
        return updatedOption;
    };

    async deleteOption(id) {
        const deletedResult = await OptionsModel.destroy(id);
        return deletedResult;
    }
};

module.exports = new OptionService();