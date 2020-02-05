import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JsonRes } from 'src/app/shared/interfaces/json-res';
import { Procesos } from 'src/app/shared/interfaces/proceso';
import { environment } from 'src/environments/environment';
import { SortDirection } from 'src/app/ng-bootstrap/directives/sortable.directive';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';
import { isNull } from 'util';
interface SearchResult {
  proceso: Procesos[];
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


function sort(proceso: Procesos[], column: string, direction: string): Procesos[] {
  if (direction === '') {
    return proceso;
  } else {
    return [...proceso].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}


function matches(proceso: Procesos, term: string, pipe: PipeTransform) {
  return pipe.transform(proceso.id_Proceso).includes(term)
    || pipe.transform(proceso.codigo_proceso).includes(term)
    || proceso.nombre_proceso.toLowerCase().includes(term.toLowerCase())
    || proceso.Personalizado1.toLowerCase().includes(term.toLowerCase())
    || proceso.Personalizado2.toLowerCase().includes(term.toLowerCase())
    || proceso.Personalizado3.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(proceso.Personalizado1_Valor).includes(term);


}

@Injectable({ providedIn: 'root' })
export class ProcesoService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _proceso$ = new BehaviorSubject<Procesos[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private PROCESO: Procesos[];

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
    this.url = environment.api_url + '/pro';
    this.tabla();


    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._proceso$.next(result.proceso);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  tabla() {
    this.todos().subscribe(data => {
      this.PROCESO = data.rows;
    });
  }
  crear(proceso: Procesos) {
    // console.log(Proceso);

    return this.http.post<JsonRes>(`${this.url}ins`, proceso);
  }

  editar(id: string, changes: Partial<Procesos>) {
    return this.http.put<JsonRes>(`${this.url}upd/${id}`, changes);
  }

  eliminar(id: string) {
    return this.http.delete<JsonRes>(`${this.url}del/${id}`);
  }

  optener(id: string) {
    return this.http.post<JsonRes>(`${this.url}one/${id}`, id);
  }

  todos() {
    return this.http.get<JsonRes>(`${this.url}all`);
  }


  get proceso$() { return this._proceso$.asObservable(); }
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
    let proceso = sort(this.PROCESO, sortColumn, sortDirection);

    // 2. filter
    proceso = proceso.filter(proceso => matches(proceso, searchTerm, this.pipe));
    const total = proceso.length;

    // 3. paginate
    proceso = proceso.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ proceso, total });
  }
}
