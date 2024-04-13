const router = require('express').Router();
const OptionController = require('../controllers/optionController.js');

/**
 * @swagger
 * /api/option/{question_id}:
 *   get:
 *     summary: Get Option By ID
 *     tags: [Option]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: question_id
 *         type: integer
 *         required: true
 *     responses:
 *       '200':
 *         description: Seccess
 */

router.get('/:question_id', OptionController.getAllOptionByQuestionId);



// router.get('/all-options/:question_id', OptionController.get)


/**
 * @swagger
 * /api/option/create:
 *   post:
 *     summary: Create Option
 *     tags: [Option]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               isCorrect:
 *                 type: boolean
 *               question_id:
 *                 type: integer
 *     responses:   
 *       '200':
 *         description: Seccess
 */

router.post('/create', OptionController.createOption);


/**
 * @swagger
 * /api/option/update/{id}:
 *   put:
 *     summary: Update Option
 *     tags: [Option]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               isCorrect:
 *                 type: boolean
 *     responses:   
 *       '200':
 *         description: Seccess
 */

router.patch('/update/:id', OptionController.updateOption);


/**
 * @swagger
 * /api/option/delete/{id}:
 *   delete:
 *     summary: Delete Option By ID
 *     tags: [Option]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:   
 *       '200':
 *         description: Seccess
 */

router.delete('/delete', OptionController.deleteOption);

module.exports = router;