import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { Todo } from "../../../shared/todo";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit{
  @Input() private task: Todo;
  @Output() public close: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<EditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo
  ) {}

  ngOnInit(): void {
    // console.log(this.task, this.data)
  }

  private onNoClick($event): void {
    console.log('CALL', $event)
    this.close.emit($event);
    this.dialogRef.close();
  }
}
