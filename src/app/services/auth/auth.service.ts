import { AngularFireAuth } from  "@angular/fire/auth";
import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { User } from  'firebase';

import { IAuthCredentials } from "../../shared/auth";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user: User;

  constructor(
    private fireAuthRef: AngularFireAuth,
    public router: Router
  ) {
    this.fireAuthRef.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  async registerUser(form: IAuthCredentials) {
    try {
      await this.fireAuthRef.auth.createUserWithEmailAndPassword(form.email, form.password);
      this.router.navigate(['login']);
    } catch (e) {
      console.log("Error!"  +  e.message);
    }
  }

  async login(form: IAuthCredentials) {
    try {
      await this.fireAuthRef.auth.signInWithEmailAndPassword(form.email, form.password);
      this.router.navigate(['todos']);
    } catch (e) {
      console.log("Error!"  +  e.message);
    }
  }

  async logout() {
    try {
      await this.fireAuthRef.auth.signOut();
      this.router.navigate(['signin']);
    } catch (e) {
      console.log(e.message)
    } finally {
      localStorage.removeItem('user');
    }
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
}
