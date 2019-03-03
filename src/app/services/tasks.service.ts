import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';

import { Todo } from '../shared/todo';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: AngularFireList<any>;
  private task: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  // Create task
  createTask(task: Todo) {
    console.log(task, 'SERVICE')
    this.tasks.push(task);
  }

  // Fetch Single Task Object
  getTask(id: string | number) {
    this.task = this.db.object('tasks/' + id);
    return this.task;
  }

  // Fetch Tasks List
  getTasksList() {
    // TODO REFACTORING!!!!!!
    let result = null;
    this.db.list('tasks')
      .valueChanges()
      .subscribe(data => {
        // console.log(data)
        result = data
      });
    return result;
  }

  // // Update Task Object
  // updateTask(task: Todo) {
  //   this.tasks.update(this.tasks, {
  //     title: task.title,
  //     completed: task.completed,
  //   });
  // }

  // Delete Task Object
  deleteTask(id: string | number) {
    this.task = this.db.object('tasks/'+id);
    this.task.remove();
  }
}
