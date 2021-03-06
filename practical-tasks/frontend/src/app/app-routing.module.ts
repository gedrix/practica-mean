import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { TasksComponent } from './components/tasks/tasks.component';


const routes: Routes = [
  {path: '', redirectTo: '/tasks', pathMatch:'full'},

  {path: 'tasks', component: TasksComponent},
  {path: 'private', component: PrivateTasksComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
