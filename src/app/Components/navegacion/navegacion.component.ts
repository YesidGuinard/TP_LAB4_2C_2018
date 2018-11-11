import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';
import { MatSidenav, MatButtonModule } from '@angular/material';
import { User } from 'src/app/Model/User';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss']
})
export class NavegacionComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService, private router: Router, private jwt: JwtHelperService) {
    const token = localStorage.getItem('token');
    const tokenInfo = this.jwt.decodeToken(token);
    this.user = new User(tokenInfo['usuario'], tokenInfo['tipo'], tokenInfo['id'], tokenInfo['nombre']);
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }


}
