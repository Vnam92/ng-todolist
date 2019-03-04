import { Component, OnInit } from '@angular/core';

import { TasksService } from "../../services/tasks.service";
import { Todo } from "../../shared/todo";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public tasks: Todo[];

  constructor(public tasksApi: TasksService) {}

  ngOnInit(): void {
    this.tasksApi
      .getTasksList()
      .subscribe(data => this.tasks = data);
  }

  private createTask(task: Todo): void {
    this.tasksApi.createTask(task);
  }

  private deleteTask(key: string): void {
    this.tasksApi.deleteTask(key);
  }

  private toggleTask(task: Todo): void {
    this.tasksApi.toggleTask(task);
  }
}
