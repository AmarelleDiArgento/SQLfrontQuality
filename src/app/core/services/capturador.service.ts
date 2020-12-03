import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JsonRes } from '@shared/interfaces/json-res';
import { FormBorrable } from '@shared/interfaces/formularios';
import { environment } from 'environments/environment';
import { SortDirection } from '@ngbtsp/directives/sortable.directive';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';

interface SearchResult {
  forms: FormBorrable[];
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

function sort(forms: FormBorrable[], column: string, direction: string): FormBorrable[] {
  if (direction === '') {
    return forms;
  } else {
    return [...forms].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(form: FormBorrable, term: string, pipe: PipeTransform) {
  return form.unico.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(form.id_proceso).includes(term)
    || form.proceso.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(form.id_lugar).includes(term)
    || form.lugar.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(form.id_usuario).includes(term)
    || form.nombre_usuario.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(form.consec_json).includes(term);
}

@Injectable({
  providedIn: 'root'
})
export class CapturadorService {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _forms$ = new BehaviorSubject<FormBorrable[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private FORMS: FormBorrable[];

  private url: string
  private primero = true

  private _state: State = {
    page: 1,
    pageSize: 50,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };
  constructor(
    private http: HttpClient,
    private pipe: DecimalPipe
  ) {
    this.url = environment.api_url + '/cap'
    this.tabla()


    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime((this.primero) ? 3600 : 200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._forms$.next(result.forms);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  tabla() {
    this.todos().subscribe(data => {
      this.FORMS = data.rows
      this._forms$.next(this.FORMS);
    })
  }



  todos() {
    return this.http.post<JsonRes>(`${this.url}allfec`, { fFi: '2020-12-01', fIn: '2020-12-01', proc: 'PQC' })
  }


  get forms$() { return this._forms$.asObservable(); }
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
    this.primero = false;
    let inicio = new Date().getTime()
    console.log(inicio);

    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
    let total = 0;
    // 1. sort
    let forms = sort(this.FORMS, sortColumn, sortDirection);

    // 2. filter
    forms = forms.filter(forms => matches(forms, searchTerm, this.pipe));
    total = forms.length;

    // 3. paginate
    forms = forms.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);



    console.log(total);

    let fin = new Date().getTime()
    console.log(fin);

    console.log(fin - inicio);

    return of({ forms, total });

  }
}
