require('dotenv').config();
const jwt = require('jsonwebtoken');

const validation = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization && authorization.split(' ')[1];
        if(token === undefined) res.sendStatus(401);
        jwt.verify(token, process.env.SECRET_WORD, (err, { id }) => {
            if(err) throw new Error(err);
            req.user_id = id;
            next();
        })
    } catch ({ message }) {
        console.log(message);
        res.sendStatus(403);
    }
};

module.exports = validation;