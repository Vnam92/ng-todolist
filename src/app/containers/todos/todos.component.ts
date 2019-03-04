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

  ngOnInit() {
    this.tasksApi.getTasksList().subscribe(data => this.tasks = data);
  }

  private createTask($event: Todo): void {
    this.tasksApi.createTask($event);
  }

  private deleteTask(indexTask: number): void {
    console.log(indexTask, 'Delete');
  }
}
