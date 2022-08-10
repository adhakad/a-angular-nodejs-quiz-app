import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css']
})
export class QuizStartComponent implements OnInit {
  timer = 3700;
  nextDisabled: any;
  loader = true;
  btnEnabled: boolean = false;
  isQuizCompleted: boolean = false;
  public questionList: any = [];
  public currentQuestion: number = 0;
  public saveAnswerList: any = [];
  selectOption: any;
  queAnsSelect: any[] = [];
  isAttempted: number = 0;
  unAttempted: number = 0;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  
  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.getAllQuestions();
    this.startTimer();
  }

  getAllQuestions() {
    this.quizService.getQuestion().subscribe(res => {
      if (res) {
        this.questionList = res.question;
        this.nextDisabled = this.questionList.length - 1;
        this.loader = false
        if (!localStorage.getItem('queAnsSelect')) {
          for (var i = 0; i < this.questionList.length; i++) {
            let queNo = i + 1;
            this.queAnsSelect.push({ queNo: queNo, selectAnswer: 12345 });
          }
          localStorage.setItem('queAnsSelect', JSON.stringify(this.queAnsSelect));
          let saveQueAnswerList = JSON.parse(localStorage.getItem('queAnsSelect'));
          this.saveAnswerList = saveQueAnswerList;
        } else {
          let saveQueAnswerList = JSON.parse(localStorage.getItem('queAnsSelect'));
          this.saveAnswerList = saveQueAnswerList;
          for (var i = 0; i < this.saveAnswerList.length; i++) {
            let a = this.saveAnswerList[i].selectAnswer;
            if (a !== 12345) {
              this.btnEnabled = true;
            }
          }
        }
      }
    })
  }

  startTimer(){
    let t = window.setInterval(()=>{
      if(this.timer<=0){
        this.submitQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime(){
      var hours:any   = Math.floor(this.timer / 3600);
      var minutes:any = Math.floor((this.timer - (hours * 3600)) / 60);
      var seconds:any = this.timer - (hours * 3600) - (minutes * 60);
      if (seconds < 10) { 
        seconds = `0${seconds}`
      }
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      if (hours < 10) {
        hours = `0${hours}`
      }
      return `${hours} : ${minutes} :${seconds}`;
  }

  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }

  answer(questionNo: any, option: any) {
    if (this.questionList[questionNo - 1]?.option1 == option) {
      this.selectOption = 1
    } else if (this.questionList[questionNo - 1]?.option2 == option) {
      this.selectOption = 2
    } else if (this.questionList[questionNo - 1]?.option3 == option) {
      this.selectOption = 3
    } else {
      this.selectOption = 4
    }
    let index = questionNo - 1;
    let saveQueAnswerList = JSON.parse(localStorage.getItem('queAnsSelect'));
    saveQueAnswerList.splice(index, 1, { queNo: questionNo, selectAnswer: this.selectOption })
    localStorage.setItem('queAnsSelect', JSON.stringify(saveQueAnswerList));
    this.getAllQuestions();
  }

  submitQuiz() {
    let saveQueAnswerList = JSON.parse(localStorage.getItem('queAnsSelect'));
    for (var i = 0; i < saveQueAnswerList.length; i++) {
      let ansId = this.questionList[i].ansId;
      let selectAnswer = saveQueAnswerList[i].selectAnswer;
      if (ansId == selectAnswer) {
        this.correctAnswer++;
      }else if(selectAnswer==12345){
        this.unAttempted++
      }else{
        this.inCorrectAnswer++
      }
      this.isAttempted = this.correctAnswer + this.inCorrectAnswer; 
      saveQueAnswerList.splice(i, 1, { queNo: i+1, selectAnswer: selectAnswer,ansId:ansId })
      localStorage.setItem('queAnsSelect', JSON.stringify(saveQueAnswerList));
    }
    this.quizService.addSelectAnswer(saveQueAnswerList).subscribe(res => {
      if (res) {
        this.isQuizCompleted = true;
        localStorage.removeItem('queAnsSelect');
      }
    })
  }
}