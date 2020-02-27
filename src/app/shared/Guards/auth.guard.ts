import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router) { }
  async canActivate() {
    const inSession = localStorage.getItem('Session');
    if (inSession != null) {
      return true;
    } else {
      this.router.navigate(['auth'])
    }
  }
}
