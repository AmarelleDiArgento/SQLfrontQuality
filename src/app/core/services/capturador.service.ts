import { Injectable, PipeTransform } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { JsonRes } from "@shared/interfaces/json-res";
import { FormBorrable } from "@shared/interfaces/formularios";
import { environment } from "environments/environment";
import { SortDirection } from "@ngbtsp/directives/sortable.directive";
import { BehaviorSubject, Subject, Observable, of } from "rxjs";
import { debounceTime, delay, switchMap, tap } from "rxjs/operators";
import { DecimalPipe } from "@angular/common";
import {
  NgbCalendar,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";

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

function sort(
  forms: FormBorrable[],
  column: string,
  direction: string
): FormBorrable[] {
  if (direction === "") {
    return forms;
  } else {
    return [...forms].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === "asc" ? res : -res;
    });
  }
}

function matches(form: FormBorrable, term: string, pipe: PipeTransform) {
  return (
    validarTexto(form.unico, term) ||
    validarNumero(form.id_procesos, term, pipe) ||
    validarTexto(form.proceso, term) ||
    validarNumero(form.id_lugar, term, pipe) ||
    validarTexto(form.lugar, term) ||
    validarNumero(form.id_usuario, term, pipe) ||
    validarTexto(form.nombre_usuario, term) ||
    validarNumero(form.consec_json, term, pipe)
  );
}

function validarTexto(objeto: any, term: string) {
  // console.log(objeto);

  if (objeto !== undefined && objeto !== null) {
    return objeto.toLowerCase().includes(term.toLowerCase());
  }
  return false;
}
function validarNumero(objeto: any, term: string, pipe: PipeTransform) {
  // console.log(objeto);

  if (objeto !== undefined && objeto !== null) {
    return pipe.transform(objeto).includes(term);
  }
  return false;
}

@Injectable({
  providedIn: "root",
})
export class CapturadorService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _forms$ = new BehaviorSubject<FormBorrable[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private FORMS: FormBorrable[];

  private url: string;
  private primero = true;

  public fecha;

  private _state: State = {
    page: 1,
    pageSize: 50,
    searchTerm: "",
    sortColumn: "",
    sortDirection: "",
  };
  constructor(
    private http: HttpClient,
    private pipe: DecimalPipe,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    let fromDate = calendar.getNext(calendar.getToday(), "d", 0);
    let toDate = calendar.getToday();

    this.url = environment.api_url + "/cap";
    this.tabla(this.returnDateRange(fromDate, toDate));

    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(3000),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._forms$.next(result.forms);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  tabla(fecha: any) {
    this.todos(fecha).subscribe((data) => {
      data.rows.forEach((a: any) => {

        a.fecha = new Date(a.fecha);
        a.Encabezado = JSON.parse(a.Encabezado);
      });
      this.FORMS = data.rows;
      this._forms$.next(this.FORMS);
    });
  }

  todos(fecha: any) {
    return this.http.post<JsonRes>(`${this.url}allfec`, {
      ...fecha,
      proc: "cult",
    });
  }

  eliminar(unico: FormBorrable) {
    return this.http.post<JsonRes>(`${this.url}deluni`, unico);
  }

  get forms$() {
    return this._forms$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    this.primero = false;
    let inicio = new Date().getTime();
    console.log(inicio);

    const {
      sortColumn,
      sortDirection,
      pageSize,
      page,
      searchTerm,
    } = this._state;
    let total = 0;
    // 1. sort
    let forms = sort(this.FORMS, sortColumn, sortDirection);

    // 2. filter
    forms = forms.filter((forms) => matches(forms, searchTerm, this.pipe));
    total = forms.length;

    // 3. paginate
    forms = forms.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );

    console.log(total);

    let fin = new Date().getTime();
    console.log(fin);

    console.log(fin - inicio);

    return of({ forms, total });
  }

  returnDateRange(fromDate, toDate): any[] {
    return [
      {
        ...fromDate,
        formatoSql: this.formatter.format(fromDate),
      },
      {
        ...(toDate !== null ? toDate : fromDate),
        formatoSql: this.formatter.format(toDate !== null ? toDate : fromDate),
      },
    ];
  }
}
