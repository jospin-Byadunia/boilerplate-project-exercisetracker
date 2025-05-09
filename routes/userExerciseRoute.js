const express = require('express');
const exerciseController= require('../controllers/exerciseController')
const router = express.Router();

router.post('/',exerciseController.createUser)
router.post('/:_id/exercises', exerciseController.createExercise)

router.get('/:_id/logs', exerciseController.getLogs)

router.get('/', exerciseController.getAllUsers)
module.exports = router