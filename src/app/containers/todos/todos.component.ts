import { Component, OnInit } from '@angular/core';
import { Todo } from "../../shared/todo";
import { TasksService } from "../../services/tasks.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public tasks = [];

  constructor(public tasksApi: TasksService) {}

  ngOnInit() {
    this.tasksApi.getTasksList()
  }

  private createTask($event: Todo): void {
    this.tasks.push($event);
    console.log($event, 'PArent', this.tasks);
    this.tasksApi.createTask($event);
  }

  private deleteTask(indexTask: number): void {
    this.tasks.splice(indexTask, 1);
    console.log(this.tasks, 'Delete');
  }
}
