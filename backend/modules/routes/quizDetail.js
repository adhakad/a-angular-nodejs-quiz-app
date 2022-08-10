const express = require('express');
const router = express.Router();
const quizDetailModel = require('../models/quizDetail');

// **************************Quiz Detail section
router.get('/get-quiz-detail', async (req, res, next) => {
    try {
      const quizDetail = await quizDetailModel.find({});
      res.json({ quizDetail: quizDetail });
    } catch (error) {
      console.log(error);
    }
  });
  router.post('/add-quiz-detail', async (req, res, next) => {
    try {
      const addQuiz = {
        quizId: req.body.quizId,
        className: req.body.className,
        subjectName: req.body.subjectName,
        quizTitle: req.body.quizTitle,
        totalQuestion: req.body.totalQuestion,
        timeDuration: req.body.timeDuration,
        quizStatus:req.body.quizStatus,
      }
      const quizDetail = await quizDetailModel.create(addQuiz);
      res.json( quizDetail);
    } catch (error) {
      console.log(error);
    }
  });

  module.exports = router;