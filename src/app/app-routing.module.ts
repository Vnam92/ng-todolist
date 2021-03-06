import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SignInComponent } from './containers/sign-in/sign-in.component';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { TodosComponent } from './containers/todos/todos.component';

import { RoutesGuard } from './guard/routes.guard';

const routes: Routes = [
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: '**',
    component: TodosComponent,
    canActivate: [RoutesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
