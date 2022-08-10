import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { AddQuizComponent } from './components/quiz/add-quiz/add-quiz.component';
import { QuizStartComponent } from './components/quiz/quiz-start/quiz-start.component';

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:"full"},
  {path:"home", component:HomeComponent},
  {path:"quiz", component:QuizStartComponent},
  {path:"add-quiz", component:AddQuizComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
