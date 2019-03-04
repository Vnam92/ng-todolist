import {MatDialog, MatDialogConfig} from "@angular/material";
import { Component, OnInit } from '@angular/core';

import { TasksService } from "../../services/tasks.service";
import { Todo } from "../../shared/todo";

import { EditFormComponent } from "../../components/forms/edit-form/edit-form.component";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public tasks: Todo[];
  public editingTask: Todo;

  constructor(public tasksApi: TasksService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.tasksApi
      .getTasksList()
      .subscribe(data => this.tasks = data);
  }

  private openDialog() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(EditFormComponent, dialogConfig);
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

  private editTask(task: Todo) {
    this.editingTask = task;
    this.openDialog();
  }
}
