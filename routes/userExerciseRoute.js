const express = require('express');
const exerciseController= require('../controllers/exerciseController')
const router = express.Router();

router.post('/',exerciseController.createUser)
router.post('/:id/exercises', exerciseController.createExercise)

router.get('/:_id/logs', exerciseController.getLogs)
module.exports = router