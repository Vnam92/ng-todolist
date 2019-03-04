import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from "../../shared/todo";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() private tasks: Todo[];
  @Output() private delete: EventEmitter<string> = new EventEmitter();
  @Output() private toggle: EventEmitter<Todo> = new EventEmitter();
  @Output() private edit: EventEmitter<Todo> = new EventEmitter();

  private onDelete(key: string): void {
    this.delete.emit(key)
  }

  private onToggle(task: Todo): void {
    this.toggle.emit(task)
  }

  private onEdit(task: Todo): void {
    this.edit.emit(task)
  }
}
