import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from "../../shared/todo";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() private task: Todo;
  @Input() private index: number;
  @Output() private delete = new EventEmitter();
  @Output() private toggle = new EventEmitter();

  private onDelete(): void {
    this.delete.emit(this.index)
  }

  private onToggle(): void {
    this.toggle.emit(this.index)
  }
}
