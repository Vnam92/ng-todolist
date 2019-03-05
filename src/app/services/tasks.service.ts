import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';

import { ITodo, Todo} from '../shared/todo';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasksRef: AngularFireList<ITodo>;
  private task: AngularFireObject<Todo>;
  private tasks: Observable<Todo[]>;

  constructor(private db: AngularFireDatabase) {
    this.tasksRef = this.db.list('tasks');
    this.tasks = this.tasksRef
      .snapshotChanges()
      .pipe(map(changes => changes.map(c =>  ({ key: c.payload.key, ...c.payload.val() }))));
  }

  // Create task
  createTask(task: Todo): void {
    this.tasksRef.push(task);
  }

  // Fetch Single Task Object
  getTask(key: string ): AngularFireObject<Todo> {
    this.task = this.db.object(`tasks/${key}`);
    return this.task;
  }

  // Fetch Tasks List
  getTasksList(): Observable<Todo[]>{
    return this.tasks;
  }

  // Toggle Task Object
  toggleTask(task: Todo): void {
    this.tasksRef.update(task.key, { title: task.title, completed: !task.completed })
  }

  // Update Task Object
  updateTask(task: Todo) {
    this.tasksRef.update(task.key, task);
  }

  // Delete Task Object
  deleteTask(key: string): void {
    this.tasksRef.remove(key);
  }
}
