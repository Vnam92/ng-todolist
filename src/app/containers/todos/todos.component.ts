import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

import { TasksService } from '../../services/tasks/tasks.service';
import { Todo } from '../../shared/todo';

import { EditFormComponent } from '../../components/forms/edit-form/edit-form.component';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  private tasks: Todo[];
  private editingTask: Todo;
  private isDialogOpened: boolean;
  private dialogConfig: MatDialogConfig;

  constructor(private tasksApi: TasksService, private dialog: MatDialog, private toast: SnackBarComponent ) {}

  ngOnInit(): void {
    this.tasksApi
      .getTasksList()
      .subscribe(data => {
        if (
          this.isDialogOpened &&
          data.some(elem => (elem.key === this.editingTask.key) && elem.title !== this.editingTask.title)
        ) {
          this.toast.openSnackBar();
          this.isDialogOpened = false;
        }
        this.tasks = data
      });
  }

  private openDialog(): void {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.minWidth = '40vw';
    this.dialogConfig.data = this.editingTask;

    this.dialog.open(EditFormComponent, this.dialogConfig);
    this.isDialogOpened = true;
  }

  createTask(task: Todo): void {
    this.tasksApi.createTask(task);
  }

  deleteTask(key: string): void {
    this.tasksApi.deleteTask(key);
  }

  toggleTask(task: Todo): void {
    this.tasksApi.toggleTask(task);
  }

  editTask(task: Todo): void {
    this.editingTask = task;
    this.openDialog();
  }
}
