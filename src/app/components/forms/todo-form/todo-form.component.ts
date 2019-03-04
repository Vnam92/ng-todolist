import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ITodo } from "../../../shared/todo";


@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit{
  @Output() public create: EventEmitter<ITodo> = new EventEmitter();
  private form: FormGroup;

  constructor(public fb: FormBuilder){}

  ngOnInit() {
    this.fbForm();
  }

  private fbForm(): void {
    this.form = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^((?!\s{2,}).)*$/)
      ]],
    })
  }

  private onSubmit(): void {
    this.form.markAsUntouched();
    this.form.markAsPristine();
    this.create.emit({title: this.form.value.title.trim(), completed: false});
    this.form.reset();
  }

  private onReset(): void {
    this.form.markAsUntouched();
    this.form.markAsPristine();
    this.form.reset();
  }

  public get title(): AbstractControl {
    return this.form.get('title');
  }
}
