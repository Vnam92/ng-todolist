import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { IAuthCredentials } from '../../shared/auth';
import { getLocalItem } from '../../helpers/utils';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit {
  private errorMsg: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.successRedirect();
    }
  }

  onFirstBtnClick(): void {
    this.authService.router.navigate(['signup'])
  }

  onSubmit(form: IAuthCredentials): void {
    if(this.errorMsg) {
      this.errorMsg = '';
    }
    this.authService.login(form)
      .then(() => this.successRedirect())
      .catch(e => this.errorMsg = e.message);
  }

  private successRedirect(): void {
    this.authService.router.navigate([getLocalItem('todoListId')]);
  }
}
