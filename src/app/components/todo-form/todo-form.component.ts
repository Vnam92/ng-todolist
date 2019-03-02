import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  @Output() public create: EventEmitter<string> = new EventEmitter()
  private form: FormGroup = new FormGroup({
    task: new FormControl()
  });

  private onSubmit(): void {
    this.create.emit(this.form.value);
    this.form.reset();
  }
}
