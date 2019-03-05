import { Component } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { IAuthCredentials } from '../../shared/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(private authService: AuthService) { }

  onFirstBtnClick(): void {
    this.authService.router.navigate(['signup'])
  }

  onSubmit(form: IAuthCredentials): void {
    this.authService.login(form);
  }
}
