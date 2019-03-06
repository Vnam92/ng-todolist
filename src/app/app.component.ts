import { Component } from '@angular/core';

import { setLocalItem, getLocalItem, uniqueId } from './helpers/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() {
    if (!getLocalItem('todoListId')) {
      setLocalItem('todoListId', uniqueId());
    }
  }
}
