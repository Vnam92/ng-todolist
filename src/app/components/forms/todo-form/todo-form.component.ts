import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { ITodo } from "../../../shared/todo";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit{
  private form: FormGroup;
  @Output() private create: EventEmitter<ITodo> = new EventEmitter();

  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.fbForm();
  }

  private fbForm(): void {
    this.form = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(2),
      ]],
    })
  }

  onSubmit(): void {
    this.create.emit({
      completed: false,
      title: this.form.value.title.trim()
    });
    this.form.markAsUntouched();
    this.form.markAsPristine();
    this.form.reset();
  }

  onReset(): void {
    this.form.markAsUntouched();
    this.form.markAsPristine();
    this.form.reset();
  }

  get title(): AbstractControl {
    return this.form.get('title');
  }
}
