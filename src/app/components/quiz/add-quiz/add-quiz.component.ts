import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  quizForm: FormGroup;
  questionForm: FormGroup;
  showModal: boolean = true;
  totalQuestion:number;
  allQuestion:number[] = [];
  fields: any;
  arr:any[]=[];
  quizId:number;
  constructor(private fb: FormBuilder, private quizService: QuizService) { }

  ngOnInit(): void {
    // this.getClass();
    
      this.quizForm = this.fb.group({
        quizId: ['', Validators.required],
        className: ['', Validators.required],
        subjectName: ['', Validators.required],
        quizTitle: ['', Validators.required],
        totalQuestion: ['', Validators.required],
        timeDuration: ['', Validators.required],
        quizStatus: ['', Validators.required],
      })

      this.questionForm = this.fb.group({
        type: this.fb.group({
          option: this.fb.array([])
        }),
      })
  }

  quizSubmit() {
    if (this.quizForm.valid) {
      this.quizService.addQuizDetail(this.quizForm.value).subscribe(res => {
        if (res) {
          this.showModal = false;
          this.totalQuestion=this.quizForm.value.totalQuestion;
          this.quizId=this.quizForm.value.quizId;
          for(var i=0;i<this.totalQuestion;i++){
           this.allQuestion.push(i+1);
          }
          for(var i=0;i<this.allQuestion.length;i++){
            this.fields = {questionText:"questionText",option1:"option1",option2:"option2",option3:"option3",option4:"option4",ansId:"ansId"};
            this.arr.push(this.fields);
          }

          this.patch();
        }
      });
    }
  }

  questionSubmit() {
      this.quizService.addQuestionDetail(this.questionForm.value,this.quizId).subscribe(res => {
        
      });
    
  }

  patch() {
    const control = <FormArray>this.questionForm.get('type.option'); 
    this.arr.forEach(x => {
      // console.log(x)
      control.push(this.patchValues(x.questionText,x.option1,x.option2,x.option2,x.option4,x.ansId))
      this.questionForm.reset();
    })
  }

  patchValues(questionText,option1,option2,option3,option4,ansId) {
    return this.fb.group({
      questionText:[questionText],
      option1:[option1],
      option2:[option2],
      option3:[option3],
      option4:[option4],
      ansId:[ansId],
    })
  }
}

