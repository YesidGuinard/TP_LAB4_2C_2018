import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    let roles = next.data["roles"] as Array<string>;
    return this.checkLogin(url, roles);
  }

  checkLogin(url: string, roles: Array<string>): boolean {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    let check: boolean = false;
    if (user) {
      // Store the attempted URL for redirecting
      this.authService.redirectUrl = '/Empleados';
      roles.forEach(element => {
        if (user.tipo === element) {
          check = true;
        }
      });
    }
    else {
      // Store the attempted URL for redirecting
      this.authService.redirectUrl = url;
    }

    if (!check) {
      this.authService.logout();
      // Navigate to the login page with extras
      this.router.navigate(['/Login']);
    }

    return check;
  }
}
