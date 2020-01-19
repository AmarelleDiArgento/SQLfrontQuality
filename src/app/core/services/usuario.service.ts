import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JsonRes } from 'src/app/shared/interfaces/json-res';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string
  private params

  constructor(
    private http: HttpClient,
  ) {
    this.url = environment.api_url + '/log'
  }

  crear(usuario: Usuario) {
    console.log(usuario);

    return this.http.post<JsonRes>(`${this.url}ins`, usuario)
  }

  editar(id: string, changes: Partial<Usuario>) {
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
