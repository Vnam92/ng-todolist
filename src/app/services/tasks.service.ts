import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';

import { Todo } from '../shared/todo';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: AngularFireList<Todo>;
  private task: AngularFireObject<Todo>;

  constructor(private db: AngularFireDatabase) {}

  // Create task
  createTask(task: Todo): void {
    console.log(task, 'SERVICE')
    this.db.list('tasks').push(task);
  }

  // Fetch Single Task Object
  getTask(id: string | number): AngularFireObject<Todo> {
    this.task = this.db.object('tasks/' + id);
    return this.task;
  }

  // Fetch Tasks List
  getTasksList(): Observable<any>{
    return this.db.list('tasks').valueChanges();
  }

  // // Update Task Object
  // updateTask(task: Todo) {
  //   this.tasks.update(this.tasks, {
  //     title: task.title,
  //     completed: task.completed,
  //   });
  // }

  // Delete Task Object
  deleteTask(id: string | number): void {
    this.task = this.db.object('tasks/'+id);
    this.task.remove();
  }
}
