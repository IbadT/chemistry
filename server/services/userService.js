const { UserModel } = require('../models/_models.js');

class UserService {

    async findAll() {
        const users = await UserModel.findAll();
        return users;
    };
    
    async findUserByEmail(email) {
        const findedUser = await UserModel.findOne({ where: { email }});
        return findedUser;
    };

    async create(userDto) {
        const createdUser = await UserModel.create(userDto);
        return createdUser;
    };

};

module.exports = new UserService();