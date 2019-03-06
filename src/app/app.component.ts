import { Component } from '@angular/core';

import { setLocalItem, getLocalItem, uniqueId } from './helpers/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly todoListId: string;

  constructor() {
        this.todoListId = getLocalItem('todoListId');
    if (!this.todoListId) {
      this.todoListId = uniqueId();
      setLocalItem('todoListId', this.todoListId);
    }
    console.log('APP component! todoListId: ' + this.todoListId)
  }
}
