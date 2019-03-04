import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
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
  public dialogConfig: MatDialogConfig;

  constructor(public tasksApi: TasksService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.tasksApi
      .getTasksList()
      .subscribe(data => this.tasks = data);
  }

  private openDialog(): void {
    this.dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = '20rem';
    this.dialogConfig.data = this.editingTask;

    this.dialog.open(EditFormComponent, this.dialogConfig);
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

  private editTask(task: Todo): void {
    this.editingTask = task;
    this.openDialog();
  }

  // TODO need to fix this, doesn't called
  private closeEditTask($event): void {
    console.log('closeEditTask $event', $event);
    this.dialogConfig = null;
    this.editingTask = null;
  }
}
