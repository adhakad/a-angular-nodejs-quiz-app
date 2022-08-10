import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private questionUrl = "http://localhost:3000/api/questions";
  private saveAnswerUrl = "http://localhost:3000/api/saveAnswer";
  private addQuizUrl = "http://localhost:3000/api/add-quiz-detail";

  
  constructor(private http : HttpClient) { }

  // *******************************Quiz-Start 
  getQuestion(){
    return this.http.get<any>(this.questionUrl).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addSelectAnswer(saveQueAnswerList:any){
    return this.http.post(this.saveAnswerUrl, saveQueAnswerList);
  }

  // ********************************Quiz Add

  addQuizDetail(data:any){
    return this.http.post(this.addQuizUrl, data,);
  }
  addQuestionDetail(data:any,quizId:number){
    let datas = [];
    datas.push({quizId:quizId,data})
    console.log(datas)
    return this.http.post(this.questionUrl, datas,);
  }

}