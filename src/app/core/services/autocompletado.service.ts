import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

export interface AutoCompletado {
  campo: string;
  valor: any;
}
@Injectable({
  providedIn: "root",
})
export class AutocompletadoService {
  private _campos$ = new BehaviorSubject<AutoCompletado[]>(null);
  private CAMPOS: AutoCompletado[] = [];

  constructor() {}

  get campos$() {
    return this._campos$.asObservable();
  }

  AsignarValorDeCampo(item: AutoCompletado) {
    let id = this.CAMPOS.findIndex((i) => i.campo === item.campo);
    if (id >= 0) {
      this.CAMPOS[id] = item;
    } else {
      this.CAMPOS = [...this.CAMPOS, item];
    }
    console.log(this.CAMPOS);
    this._campos$.next(this.CAMPOS);
  }
}
