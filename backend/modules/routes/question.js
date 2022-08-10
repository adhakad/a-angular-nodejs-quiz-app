const express = require('express');
const router = express.Router();
const questionModel = require('../models/question');
const saveAnswerModel = require('../models/userAnswerSave');

// **************************Question section
router.get('/questions', async (req, res, next) => {
  try {
    const question = await questionModel.find({});
    res.json({ question: question });
  } catch (error) {
    console.log(error);
  }
});
router.post('/questions', async (req, res, next) => {
  try {
    for (var i = 0; i < req.body[0].data.type.option.length; i++) {
      let qid = i + 1;
      const addQuestion = {
        quizId: req.body[0].quizId,
        questionId: qid,
        questionText: req.body[0].data.type.option[i].questionText,
        option1: req.body[0].data.type.option[i].option1,
        option2: req.body[0].data.type.option[i].option2,
        option3: req.body[0].data.type.option[i].option3,
        option4: req.body[0].data.type.option[i].option4,
        ansId: req.body[0].data.type.option[i].ansId,
      }
      const question = await questionModel.create(addQuestion);
    }
  } catch (error) {
    console.log(error);
  }
});


// ************************saveAnswer section

router.post('/saveAnswer', async (req, res, next) => {
  try {
    for (var i = 0; i < req.body.length; i++) {
      let createData =
      {
        questionNo: req.body[i].queNo,
        selectAnswer: req.body[i].selectAnswer,
        ansId:req.body[i].ansId,
      }
      let saveAnswer = await saveAnswerModel.create(createData);
    }
    res.json({msg:"data insert"});
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;