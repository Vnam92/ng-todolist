import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })

export class RoutesGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
    // TODO 1: Check FOR SHARED LINK BY '_ng....' and save them if there in localStorage OR REDIRECT if USER almost Loggined In SYSTEM
    // TODO 2: Care about message/alert IF SomeOne inserts DATA in this TODOList
  }

  /**
   * Checking route state for current snapshot
   * @param next
   * @param state
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      return this.router.parseUrl('signin');
    }
  }
}
