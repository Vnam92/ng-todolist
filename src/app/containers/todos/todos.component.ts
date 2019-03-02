import { Component, OnInit } from '@angular/core';
import { Todo } from "../../shared/todo";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public tasks = [];

  constructor() { }

  ngOnInit() {
  }

  createTodo($event: Todo) {
    this.tasks.push($event)
    console.log($event, 'PArent', this.tasks)
  }
}
