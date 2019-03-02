import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  public form: FormGroup = new FormGroup({
    task: new FormControl()
  });

  public onSubmit() {
    console.log('Submit', this.form.value);
  }
}
