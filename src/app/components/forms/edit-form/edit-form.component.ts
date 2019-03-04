import { Component, Input, OnInit } from '@angular/core';

import { Todo } from "../../../shared/todo";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  @Input() private task: Todo;


  ngOnInit() {
  }
}
