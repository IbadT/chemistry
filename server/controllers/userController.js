require('dotenv').config();
const UserService = require('../services/userService.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {

    async findAll(req, res) {
        try {
            const users = await UserService.findAll();
            res.send(users);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const isUserExist = await UserService.findUserByEmail(email);
            if(isUserExist) {
                const { id } = isUserExist;
                const passwordCompare = await bcrypt.compare(password, isUserExist.password);
                if(passwordCompare) {
                    const token = jwt.sign({ id }, process.env.SECRET_WORD);
                    return res.json(token);
                } return res.json({ message: "invalid token" });
            } return res.sendStatus(401);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    };

    async register(req, res) {
        try {
            const { email, password, user_name } = req.body;
            const isUserExist = await UserService.findUserByEmail(email);
            if(!isUserExist) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                const createdUser = await UserService.create({
                    user_name,
                    email,
                    password: hashPassword,
                });
                return res.send(createdUser);
            } return res.sendStatus(400);
        } catch ({ message }) {
            console.log(message);
            res.json(message);
        }
    };
};

module.exports = new UserController();