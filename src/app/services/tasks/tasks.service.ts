import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ITodo, Todo } from '../../shared/todo';
import { getLocalItem } from '../../helpers/utils';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasksRef: AngularFireList<ITodo>;
  private readonly tasks: Observable<Todo[]>;

  constructor(private db: AngularFireDatabase) {
    this.tasksRef = this.db.list(getLocalItem('todoListId'));
    this.tasks = this.tasksRef
      .snapshotChanges()
      .pipe(map(changes =>
        changes.map(c =>
          ({
            key: c.payload.key,
            ...c.payload.val(),
          })
        )));
  }

  /**
   * Creating task
   * @param task
   */
  createTask(task: Todo): void {
    this.tasksRef.push(task)
      .catch(e => console.log(e.message));
  }

  /**
   * Fetching tasks list
   * @return Observable<Todo[]>
   */
  getTasksList(): Observable<Todo[]>{
    return this.tasks;
  }

  /**
   * Toggling task
   * @param task
   */
  toggleTask(task: Todo): void {
    this.tasksRef.update(task.key, { title: task.title, completed: !task.completed })
      .catch(e => console.log(e.message));
  }

  /**
   * Updating task
   * @param task
   */
  updateTask(task: Todo): void {
    this.tasksRef.update(task.key, { title: task.title, completed: task.completed })
      .catch(e => console.log(e.message));
  }

  /**
   * Delete task object by key
   * @param key
   */
  deleteTask(key: string): void {
    this.tasksRef.remove(key)
      .catch(e => console.log(e.message));
  }
}
