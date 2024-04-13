const router = require('express').Router();

const userRouter = require('./userRouter.js');
router.use('/user', userRouter);

const questionRouter = require('./questionRouter.js');
router.use('/question', questionRouter);

const optionRouter = require('./optionRouter.js');
router.use('/option', optionRouter);

const userAnswerRouter = require('./userAnswersRouter.js');
router.use('/user-answers', userAnswerRouter);

module.exports = router;