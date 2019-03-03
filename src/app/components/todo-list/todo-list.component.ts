import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from "../../shared/todo";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() private tasks: Todo[];
  @Output() private delete: EventEmitter<any> = new EventEmitter();
  @Output() private toggle: EventEmitter<any> = new EventEmitter();

  private onDelete(index: number): void {
    this.delete.emit(index)
  }
  private onToggle(index: any): void {}
}
