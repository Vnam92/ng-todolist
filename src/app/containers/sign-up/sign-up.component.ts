import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { IAuthCredentials } from '../../shared/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  private errorMsg: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.authService.router.navigate(['todos']);
    }
  }
  
  onFirstBtnClick(): void {
    this.authService.router.navigate(['signin'])
  }

  onSubmit(form: IAuthCredentials): void {
    if(this.errorMsg) {
      this.errorMsg = '';
    }
    this.authService.registerUser(form)
      .then(() => this.onFirstBtnClick())
      .catch(e => this.errorMsg = e.message);
  }
}
