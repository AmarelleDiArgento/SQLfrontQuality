import { DecimalPipe, KeyValuePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EncabezadoTabla } from "@shared/interfaces/encabezado-tabla";
import { JsonRes } from "@shared/interfaces/json-res";
import { Usuario } from "@shared/interfaces/usuario";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TUsuarioService {
  private url: string;
  public Encabezados: EncabezadoTabla[] = [
    {
      nombre: "ID",
      nombreBase: "id_login",
      pintar: true,
    },
    {
      nombre: "Codigo",
      nombreBase: "id_usuario",
      pintar: true,
    },
    {
      nombre: "Nombre",
      nombreBase: "nombre_usuario",
      pintar: true,
    },
    {
      nombre: "Pass",
      nombreBase: "password",
      pintar: true,
    },
  ];

  constructor(private http: HttpClient) {
    this.url = environment.api_url + "/log";
  }

  optenerTodos(): Observable<Usuario[]> {
    return this.http
      .get<JsonRes>(`${this.url}all`)
      .pipe(map((data) => data.rows as Usuario[]));
  }

  optenerFincas(usuario: Partial<Usuario>): Observable<any[]> {
    return this.http
      .post<JsonRes>(`${this.url}infincas`, usuario)
      .pipe(map((data) => data.rows));
  }

  optenerPermisos(usuario: Partial<Usuario>): Observable<any[]> {
    return this.http
      .post<JsonRes>(`${this.url}inpermisos`, usuario)
      .pipe(map((data) => data.rows));
  }

  optenerFormularios(usuario: Partial<Usuario>): Observable<any[]> {
    return this.http
      .post<JsonRes>(`${this.url}informularios`, usuario)
      .pipe(map((data) => data.rows));
  }
}
