import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JsonRes } from 'src/app/shared/interfaces/json-res';
import { Desplegable } from 'src/app/shared/interfaces/desplegable';
import { environment } from 'src/environments/environment';
import { SortDirection } from 'src/app/ng-bootstrap/directives/sortable.directive';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';

interface SearchResult {
  desplegables: Desplegable[];
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

function sort(desplegables: Desplegable[], column: string, direction: string): Desplegable[] {
  if (direction === '') {
    return desplegables;
  } else {
    return [...desplegables].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(desplegable: Desplegable, term: string, pipe: PipeTransform) {
  return pipe.transform(desplegable.id_Desplegable).includes(term)
    || desplegable.Filtro.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(desplegable.Codigo).includes(term)
    || desplegable.Opcion.toLowerCase().includes(term.toLowerCase())
}

@Injectable({ providedIn: 'root' })
export class DesplegableService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _desplegables$ = new BehaviorSubject<Desplegable[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private DESPLEGABLES: Desplegable[];

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
    this.url = environment.api_url + '/des';
    this.tabla();


    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._desplegables$.next(result.desplegables);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  tabla() {
    this.todos().subscribe(data => {
      this.DESPLEGABLES = data.rows
    });
  }
  crear(desplegable: Desplegable) {

    return this.http.post<JsonRes>(`${this.url}ins`, desplegable)
  }

  editar(id: string, changes: Partial<Desplegable>) {
    return this.http.put<JsonRes>(`${this.url}upd/${id}`, changes)
  }

  eliminar(id: string) {
    return this.http.delete<JsonRes>(`${this.url}del/${id}`)
  }

  optener(id: string) {
    return this.http.post<JsonRes>(`${this.url}one/${id}`, id)
  }

  filtro(filtro: string) {
    return this.http.post<JsonRes>(`${this.url}fil/${filtro}`, filtro)
  }

  todos() {
    return this.http.get<JsonRes>(`${this.url}all`);
  }


  get desplegables$() { return this._desplegables$.asObservable(); }
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
    let desplegables = sort(this.DESPLEGABLES, sortColumn, sortDirection);

    // 2. filter
    desplegables = desplegables.filter(desplegable => matches(desplegable, searchTerm, this.pipe));
    const total = desplegables.length;

    // 3. paginate
    desplegables = desplegables.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ desplegables, total });
  }

}
