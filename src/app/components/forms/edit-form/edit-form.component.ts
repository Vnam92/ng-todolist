import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject, OnInit } from '@angular/core';

import { TasksService } from "../../../services/tasks.service";
import { Todo } from "../../../shared/todo";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  private form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tasksApi: TasksService,
    private dialogRef: MatDialogRef<EditFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Todo
  ) {}

  ngOnInit(): void {
    this.fbForm();
  }

  private fbForm(): void {
    this.form = this.fb.group({
      title: [this.data.title, [
        Validators.required,
        Validators.minLength(2),
      ]],
    })
  }

  onSubmit(): void {
    this.tasksApi.updateTask({
      key: this.data.key,
      completed: this.data.completed,
      title: this.form.value.title.trim(),
    });
    this.form.markAsUntouched();
    this.form.markAsPristine();
    this.form.reset();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get title(): AbstractControl {
    return this.form.get('title');
  }
}
