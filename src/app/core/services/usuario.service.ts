import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JsonRes } from 'src/app/shared/interfaces/json-res';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { environment } from 'src/environments/environment';
import { SortDirection } from 'src/app/ng-bootstrap/directives/sortable.directive';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';

interface SearchResult {
  usuarios: Usuario[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(usuarios: Usuario[], column: string, direction: string): Usuario[] {
  if (direction === '') {
    return usuarios;
  } else {
    return [...usuarios].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(usuario: Usuario, term: string, pipe: PipeTransform) {
  return usuario.nombre_usuario.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(usuario.id_login).includes(term)
    || pipe.transform(usuario.id_usuario).includes(term)
    || pipe.transform(usuario.password).includes(term);
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _usuarios$ = new BehaviorSubject<Usuario[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private USUARIOS: Usuario[];

  private url: string

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(
    private http: HttpClient,
    private pipe: DecimalPipe
  ) {
    this.url = environment.api_url + '/log'
    this.tabla()


    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._usuarios$.next(result.usuarios);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  tabla() {
    this.todos().subscribe(data => {
      this.USUARIOS = data.rows

      this._usuarios$.next(this.USUARIOS);
    })
  }
  crear(usuario: Usuario) {

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

  login(logger: Partial<Usuario>) {
    return this.http.post<JsonRes>(`${this.url}in`, logger)
  }

  todos() {
    return this.http.get<JsonRes>(`${this.url}all`)
  }


  get usuarios$() { return this._usuarios$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let usuarios = sort(this.USUARIOS, sortColumn, sortDirection);

    // 2. filter
    usuarios = usuarios.filter(usuarios => matches(usuarios, searchTerm, this.pipe));
    const total = usuarios.length;

    // 3. paginate
    usuarios = usuarios.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ usuarios, total });
  }

}
