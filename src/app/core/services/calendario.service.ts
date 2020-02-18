import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class CalendarioService {

  private fechas: any[] = [];
  private rango = new BehaviorSubject<any[]>([]);

  $rango = this.rango.asObservable();

  constructor() { }

  cambioRango(rango: any[]) {
    this.fechas = [...rango];
    this.rango.next(this.fechas);
  }
  
}
