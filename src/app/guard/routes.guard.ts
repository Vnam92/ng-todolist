import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';
import { setLocalItem, getLocalItem, uniqueId } from '../helpers/utils';

@Injectable({ providedIn: 'root' })

export class RoutesGuard implements CanActivate {
  private readonly todoListId: string;
  private readonly currentPath: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    ) {
    // TODO 1: Check FOR SHARED LINK BY '_ng....' and save them if there in localStorage OR REDIRECT if USER almost Loggined In SYSTEM
    // TODO 2: Care about message/alert IF SomeOne inserts DATA in this TODOList
    this.todoListId = getLocalItem('todoListId');
    this.currentPath = this.location.path();
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
      if (this.currentPath.length > 0 && this.currentPath.includes('_ng') && (this.currentPath !== this.todoListId)) {
        setLocalItem('todoListId', this.currentPath.slice(1));
      }
      return true;
    } else {
      return this.router.parseUrl('signin');
    }
  }
}
