const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let quizDetail = new Schema({
  quizId: {type:Number },
  className: {type: Number },
  subjectName: {type: String },
  quizTitle : {type:String },
  totalQuestion: {type:Number },
  timeDuration: {type:Number },
  quizStatus : {type:Boolean},

}, {
  collection: 'quizDetail'
})
 
module.exports = mongoose.model('quizDetail', quizDetail);