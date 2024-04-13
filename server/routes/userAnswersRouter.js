const router = require('express').Router();
const UserAnswersController = require('../controllers/userAnswersController');
const validation = require('../helpers/validation.js');

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEyMzI1NzQ3fQ.J0XrE4DcgnvERTw0dMuIhRAhTx6TIatzkQiXPBOpCog

/**
 * @swagger
 * /api/user-answers/get-all:
 *   get:
 *     summary: Get All Answers
 *     tags: [Answers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Seccess
 */

router.get('/get-all', validation, UserAnswersController.getAllAnswers);


/**
 * @swagger
 * /api/user-answers/add:
 *   post:
 *     summary: Add User's Answer
 *     tags: [Answers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isCorrectAnswer:
 *                 type: boolean
 *                 default: true
 *               question_id:
 *                 type: integer
 *               option_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Seccess
 */

router.post('/add', validation, UserAnswersController.create);



/**
 * @swagger
 * /api/user-answers/add-text:
 *   post:
 *     summary: Add User's Text Answer
 *     tags: [Answers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               userAnswer:
 *                 type: string
 *               isCorrectUserAnswer:
 *                 type: boolean
 *                 default: false
 *               text_question_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Seccess
 */

router.post('/add-text', validation, UserAnswersController.create);





/**
 * @swagger
 * /api/user-answers/delete:
 *   delete:
 *     summary: Delete All User's answers
 *     tags: [Answers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Seccess
 */

router.delete('/delete', validation, UserAnswersController.deleteAnswers);

module.exports = router;