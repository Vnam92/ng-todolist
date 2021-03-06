import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatFormFieldModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { NgModule } from '@angular/core';

import { TasksService } from './services/tasks/tasks.service';
import { AuthService } from './services/auth/auth.service';
import { AppRoutingModule } from './app-routing.module';

import { SignInComponent } from './containers/sign-in/sign-in.component';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { TodosComponent } from './containers/todos/todos.component';

import { SnackBarTextComponent } from './components/snack-bar-text/snack-bar-text.component';
import { TodoFormComponent } from './components/forms/todo-form/todo-form.component';
import { EditFormComponent } from './components/forms/edit-form/edit-form.component';
import { AuthFormComponent } from './components/forms/auth-form/auth-form.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoFormComponent,
    AuthFormComponent,
    EditFormComponent,
    SnackBarComponent,
    SnackBarTextComponent,
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    TasksService,
    AuthService,
    SnackBarComponent,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditFormComponent,
    SnackBarComponent,
    SnackBarTextComponent,
  ]
})
export class AppModule {}
