const router = require('express').Router();
const QuestionController = require('../controllers/questionController.js');
const validation = require('../helpers/validation.js');


/**
 * @swagger
 * /api/question:
 *   get:
 *     summary: Get All Questions
 *     security:
 *       - bearerAuth: []
 *     tags: [Question]
 *     responses:
 *       '200':
 *         description: Seccess
 */

router.get('/', validation, QuestionController.getAllQuestions);


/**
 * @swagger
 * /api/question/name:
 *   get:
 *     summary: Get Questions By Name
 *     tags: [Question]
 *     security:
 *       - bearerAuth: []
 *     parameters:  
 *       - in: query
 *         name: name
 *         type: string
 *         required: true
 *         example: Столицы
 *     responses:
 *       '200':
 *         description: Seccess
 */

router.get('/name', validation, QuestionController.getAllQuestionsByName)


/**
 * @swagger
 * /api/question/getall:
 *   get:
 *     summary: Get All User's Questions With Options
 *     tags: [Question]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Seccess
 */

router.get('/getall', validation, QuestionController.getQuestionWithOptionsByUserId);


/**
 * @swagger
 * /api/question/{id}:
 *   get:
 *     summary: Get Questions By Id 
 *     tags: [Question]
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *     responses:
 *       '200':
 *         description: Seccess
 */

router.get('/:id', validation, QuestionController.getQuestionWithOptionById);




/**
 * @swagger
 * /api/question/create:
 *   post:
 *     summary: Create Question
 *     tags: [Question]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               title: 
 *                 type: string
 *               hasOptions:
 *                 type: boolean   
 *     responses:
 *       '200': 
 *         description: Seccess
 *            
 */

router.post('/create', validation, QuestionController.createQuestion);


/**
 * @swagger
 * /api/question/update/{id}:
 *   put:
 *     summary: Create Question
 *     tags: [Question]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: 
 *                 type: string
 *               hasOptions:
 *                 type: boolean
 *     responses:
 *       '200': 
 *         description: Seccess
 *            
 */

router.patch('/update/:id', validation, QuestionController.updateQuestion);



/**
 * @swagger
 * /api/question/delete/{id}:
 *   delete:
 *     summary: Create Question
 *     tags: [Question]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *     responses:
 *       '200': 
 *         description: Seccess
 *            
 */

router.delete('/delete/:id', validation, QuestionController.deleteQuestion);

module.exports = router;