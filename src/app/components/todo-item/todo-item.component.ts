import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from "../../shared/todo";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() private task: Todo;
  @Output() private delete: EventEmitter<string> = new EventEmitter();
  @Output() private toggle: EventEmitter<Todo> = new EventEmitter();
  @Output() private edit: EventEmitter<Todo> = new EventEmitter();

  onDelete(): void {
    this.delete.emit(this.task.key)
  }

  onToggle(): void {
    this.toggle.emit(this.task)
  }

  onEdit(): void {
    this.edit.emit(this.task)
  }
}
