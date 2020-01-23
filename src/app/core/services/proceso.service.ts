import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Proceso } from 'src/app/shared/interfaces/proceso';
import { JsonRes } from 'src/app/shared/interfaces/json-res';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  private url: string
  private params

  constructor(
    private http: HttpClient,
  ) {
    this.url = environment.api_url + '/pro'
  }

  crear(proceso: Proceso) {
    // console.log(proceso);

    return this.http.post<JsonRes>(`${this.url}ins`, proceso)
  }

  editar(id: string, changes: Partial<Proceso>) {
    return this.http.put<JsonRes>(`${this.url}upd/${id}`, changes)
  }

  eliminar(id: string) {
    return this.http.delete<JsonRes>(`${this.url}del/${id}`)
  }

  optener(id: string) {
    return this.http.post<JsonRes>(`${this.url}one/${id}`, id)
  }

  todos() {
    return this.http.get<JsonRes>(`${this.url}all`)
  }
}