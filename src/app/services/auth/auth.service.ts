import { AngularFireAuth } from  '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from  '@angular/router';
import { User } from  'firebase';

import UserCredential = firebase.auth.UserCredential;
import { IAuthCredentials } from '../../shared/auth';
import { deleteLocalItem, getLocalItem, setLocalItem } from '../../helpers/utils';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user: User;

  constructor(
    public fireAuthRef: AngularFireAuth,
    public router: Router
  ) {
    this.fireAuthRef.authState.subscribe(user => {
      if (user) {
        this.user = user;
        setLocalItem('user', JSON.stringify(this.user))
      } else {
        setLocalItem('user', null)
      }
    })
  }

  /**
   * Registering of new user
   * @param form
   * @return Promise<UserCredential>
   */
  registerUser(form: IAuthCredentials): Promise<UserCredential> {
    return this.fireAuthRef.auth.createUserWithEmailAndPassword(form.email, form.password);
  }


  /**
   * User's authorization
   * @param form
   * @return Promise<UserCredential>
   */
  login(form: IAuthCredentials): Promise<UserCredential> {
    return this.fireAuthRef.auth.signInWithEmailAndPassword(form.email, form.password)
  }

  /**
   * User's sign out
   * @return Promise
   */
  logout(): Promise<any> {
    return this.fireAuthRef.auth.signOut()
      .then(() => {
        deleteLocalItem('user');
        deleteLocalItem('todoListId');
      })
      .catch(e => console.log(e.message))
  }

  /**
   * Check for logined or not user
   */
  get isLoggedIn(): boolean {
    const user = JSON.parse(getLocalItem('user'));
    return user !== null;
  }
}
