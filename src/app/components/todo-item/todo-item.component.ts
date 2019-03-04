import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from "../../shared/todo";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() private task: Todo;
  @Output() private delete: EventEmitter<any> = new EventEmitter();
  @Output() private toggle: EventEmitter<any> = new EventEmitter();
  @Output() private edit: EventEmitter<any> = new EventEmitter();

  private onDelete(): void {
    this.delete.emit(this.task.key)
  }

  private onToggle(): void {
    this.toggle.emit(this.task)
  }

  private onEdit(form): void {
    this.edit.emit(form)
  }
}
