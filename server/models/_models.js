const UserModel = require('./userModel.js');
const QuestionModel = require('./questionModel.js');
const OptionsModel = require('./optionsModel.js');
const TextAnswerModel = require('./textAnswerModel.js');
const TextQuestionModel = require('./textQuestionModel.js');
const UserAnswerModel = require('./userAnswerModel.js')


UserModel.hasMany(QuestionModel, { foreignKey: "user_id" });
QuestionModel.belongsTo(UserModel, { foreignKey: "user_id" });

QuestionModel.hasMany(OptionsModel, { foreignKey: "question_id" });
OptionsModel.belongsTo(QuestionModel, { foreignKey: "question_id" });

QuestionModel.hasOne(UserAnswerModel, { foreignKey: "question_id" });
UserAnswerModel.belongsTo(QuestionModel, { foreignKey: "question_id" });

OptionsModel.hasOne(UserAnswerModel, { foreignKey: "option_id" });
UserAnswerModel.belongsTo(OptionsModel, { foreignKey: "option_id" });

UserModel.hasMany(TextQuestionModel, { foreignKey: "user_id" });
TextQuestionModel.belongsTo(UserModel, { foreignKey: "user_id" });

UserModel.hasMany(TextAnswerModel, { foreignKey: "user_id" });
TextAnswerModel.belongsTo(UserModel, { foreignKey: "user_id" });

TextQuestionModel.hasOne(TextAnswerModel, { foreignKey: "text_question_id" });
TextAnswerModel.belongsTo(TextQuestionModel, { foreignKey: "text_question_id" });

UserModel.hasMany(UserAnswerModel, { foreignKey: "user_id" });
UserAnswerModel.belongsTo(UserModel, { foreignKey: "user_id" });




// (async () => {
//     await UserModel.sync({ force: true }).then(() => {
//         console.log("User was created...");
//     });

//     await QuestionModel.sync({ force: true }).then(() => {
//         console.log("Question was created...");
//     });

//     await OptionsModel.sync({ forece: true }).then(() => {
//         console.log("Options was created...");
//     });

//     await TextQuestionModel.sync({ force: true }).then(() => {
//         console.log("Text Question was created...");
//     });

//     await TextAnswerModel.sync({ force: true }).then(() => {
//         console.log("Text Answer was created...");
//     });

    // await UserAnswerModel.sync({ force: true }).then(() => {
    //     console.log("User Answer was created...");
    // })
// })();

module.exports = {
    UserModel, 
    QuestionModel,
    OptionsModel,
    TextQuestionModel,
    TextAnswerModel,
    UserAnswerModel
}