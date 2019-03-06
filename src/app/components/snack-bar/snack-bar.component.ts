import { MatSnackBar } from '@angular/material';
import { Component } from '@angular/core';

import { SnackBarTextComponent } from '../snack-bar-text/snack-bar-text.component';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
})
export class SnackBarComponent {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(): void {
    this.snackBar.openFromComponent(SnackBarTextComponent, {
      duration: 7000,
      verticalPosition: "top",
    });
  }
}
