import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JsonRes } from 'src/app/shared/interfaces/json-res';
import { Procesos_Detalle } from 'src/app/shared/interfaces/procesosdetalle';
import { environment } from 'src/environments/environment';
import { SortDirection } from 'src/app/ng-bootstrap/directives/sortable.directive';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';

interface SearchResult {
  procesosdetalle: Procesos_Detalle[];
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

function sort(procesosdetalle: Procesos_Detalle[], column: string, direction: string): Procesos_Detalle[] {
  if (direction === '') {
    return procesosdetalle;
  } else {
    return [...procesosdetalle].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(procesosdetalle: Procesos_Detalle, term: string, pipe: PipeTransform) {
  return pipe.transform(procesosdetalle.id_proceso).includes(term)
    || pipe.transform(procesosdetalle.codigo_detalle).includes(term)
    || procesosdetalle.nombre_detalle.toLowerCase().includes(term.toLowerCase())
    || procesosdetalle.tipo.toLowerCase().includes(term.toLowerCase())
    || procesosdetalle.lista_desp.toLowerCase().includes(term.toLowerCase())
    || procesosdetalle.tipo_M.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(procesosdetalle.porcentaje).includes(term)
    || pipe.transform(procesosdetalle.capitulo).includes(term)
    || pipe.transform(procesosdetalle.item).includes(term)
    || procesosdetalle.Capitulo_Nombre.toLowerCase().includes(term.toLowerCase())
    || procesosdetalle.grupo1.toLowerCase().includes(term.toLowerCase());
}

@Injectable({ providedIn: 'root' })
export class ProcesosDetalleService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _procesosdetalle$ = new BehaviorSubject<Procesos_Detalle[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private PROCESOSDETALLE: Procesos_Detalle[];
  private url: string;

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
    this.url = environment.api_url + '/pd';
    this.tabla('0');


    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._procesosdetalle$.next(result.procesosdetalle);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  tabla(id: string) {
    this.filtro(id).subscribe(data => {
      this.PROCESOSDETALLE = data.rows;
    });
  }
  crear(Procesosdetalle: ProcesosDetalleService) {
    // console.log(procesosdetalle);

    return this.http.post<JsonRes>(`${this.url}ins`, Procesosdetalle);
  }

  editar(id: string, changes: Partial<Procesos_Detalle>) {
    return this.http.put<JsonRes>(`${this.url}upd/${id}`, changes);
  }

  eliminar(id: string) {
    return this.http.delete<JsonRes>(`${this.url}del/${id}`);
  }

  optener(id: string) {
    return this.http.post<JsonRes>(`${this.url}one/${id}`, id);
  }

  filtro(id: string) {
    return this.http.post<JsonRes>(`${this.url}fil/${id}`, id);
  }

  todos() {
    return this.http.get<JsonRes>(`${this.url}all`);
  }


  get procesosdetalle$() { return this._procesosdetalle$.asObservable(); }
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
    let procesosdetalle = sort(this.PROCESOSDETALLE, sortColumn, sortDirection);

    // 2. filter

    procesosdetalle = procesosdetalle.filter(procesosdetalle => matches(procesosdetalle, searchTerm, this.pipe));
    const total = procesosdetalle.length;

    // 3. paginate
    procesosdetalle = procesosdetalle.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ procesosdetalle, total });
  }

}

