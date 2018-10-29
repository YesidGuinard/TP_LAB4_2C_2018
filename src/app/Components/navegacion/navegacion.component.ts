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

  constructor(private authService: AuthService, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }


}
