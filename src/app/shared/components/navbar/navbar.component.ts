import { Component, OnInit } from '@angular/core';
import { Session } from '../../interfaces/session';
import { Router } from '@angular/router';
import { CryptoService } from 'src/app/core/services/crypto.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  session: Session

  public isMenuCollapsed = true;
  constructor(
    private router: Router,
    private crypto: CryptoService,
  ) {

    this.session = JSON.parse(
      this.crypto.recuperar(
        localStorage.getItem('Session')
      )
    ) as Session;
  }

  logout() {
    this.session = null;
    localStorage.removeItem('Session');
    this.router.navigate(['\auth'])
  }
}
