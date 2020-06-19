import { Component, OnInit } from '@angular/core';
import { SessionFull } from '@shared/interfaces/session';
import { CryptoService } from '@core/services/crypto.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  session: SessionFull = null;
  usuario: string = '';

  isMenuCollapse: boolean[] = [];

  constructor(
    private crypto: CryptoService
  ) { }

  ngOnInit(): void {
    this.session = JSON.parse(
      this.crypto.recuperar(
        localStorage.getItem('Session')
      )
    ) as SessionFull;

    this.usuario = this.optenerPrimerNombre(this.session.nombre);
    if (this.session.modulos !== undefined) {
      this.definirCollapse(this.session.modulos.length);
    }
  }
  clicCollapse(i: number) {
console.log(i);

    this.isMenuCollapse[i] = !this.isMenuCollapse[i]
  }

  optenerPrimerNombre(nombre: string): string {
    let primerNombre = nombre.split(' ');
    return primerNombre[0];
  }

  definirCollapse(cant: number) {
    for (let i = 0; i < cant; i++) {
      this.isMenuCollapse.push(true);
    }
  }

}
