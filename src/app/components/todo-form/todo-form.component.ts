import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit{
  @Output() public create: EventEmitter<string> = new EventEmitter();
  private form: FormGroup;

  constructor(public fb: FormBuilder){}

  ngOnInit() {
    this.fbForm();
  }

  private fbForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
    })
  }

  private onSubmit(): void {
    this.form.markAsUntouched();
    this.form.markAsPristine();
    this.create.emit({...this.form.value, completed: false});
    this.form.reset();
  }

  private get title(): AbstractControl {
    return this.form.get('title');
  }
}
