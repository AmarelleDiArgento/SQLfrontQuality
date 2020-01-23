import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GraficaPostco } from 'src/app/shared/interfaces/grafica-postco';
import { JsonRes } from 'src/app/shared/interfaces/json-res';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url: string
  private params

  constructor(
    private http: HttpClient,
  ) {
    this.url = environment.api_url + '/gra'
  }

  // crear(graP: GraficaPostco) {
  //   // console.log(proceso);

  //   return this.http.post<JsonRes>(`${this.url}ins`, graP)
  // }

  // editar(id: string, changes: Partial<GraficaPostco>) {
  //   return this.http.put<JsonRes>(`${this.url}upd/${id}`, changes)
  // }

  // eliminar(id: string) {
  //   return this.http.delete<JsonRes>(`${this.url}del/${id}`)
  // }

  // optener(id: string) {
  //   return this.http.post<JsonRes>(`${this.url}one/${id}`, id)
  // }

  todos() {
    return this.http.get<JsonRes>(`${this.url}all`)
  }
}
