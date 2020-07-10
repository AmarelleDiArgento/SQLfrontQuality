import { Component, OnInit } from '@angular/core';
import { SessionFull } from '../../interfaces/session';
import { Router } from '@angular/router';
import { CryptoService } from '@core/services/crypto.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  session: SessionFull = null;

  public isMenuCollapsed = true;
  public isOptionCollapsed: boolean[] = [];

  constructor(private router: Router, private crypto: CryptoService) {
    this.session = JSON.parse(
      this.crypto.recuperar(localStorage.getItem('Session'))
    ) as SessionFull;


    if (this.session.modulos !== null && this.session.modulos !== undefined) {
      for (const mod of this.session.modulos) {
        this.isOptionCollapsed.push(true);
      }
    }

    console.log(this.session);
  }

  componerUrl(url: string, reportes: Reportes): string[] {
    let newUrl = url.split('/');
    newUrl = ['/', ...newUrl];
    // console.log(newUrl);

    return [...newUrl];
  }

  logout() {
    this.session = null;
    localStorage.removeItem('Session');
    this.router.navigate(['auth']);
  }
}
