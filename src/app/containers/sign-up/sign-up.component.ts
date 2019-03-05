import { Component } from '@angular/core';

import { AuthService } from "../../services/auth/auth.service";
import { IAuthCredentials } from "../../shared/auth";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(private authService: AuthService) { }

  onFirstBtnClick(): void {
    this.authService.router.navigate(['signin'])
  }

  onSubmit(form: IAuthCredentials): void {
    this.authService.registerUser(form);
  }
}
