import { Component, OnInit } from '@angular/core';
import { Session } from '../../interfaces/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  session: Session

  public isMenuCollapsed = true;
  constructor(
    private router: Router
    ) {

    this.session = JSON.parse(localStorage.getItem('Session')) as Session;
    console.log(this.session);


  }

  logout() {
    this.session = null;
    localStorage.removeItem('Session');
    this.router.navigate(['\auth'])
  }
}
