import { Injectable, PipeTransform } from '@angular/core';
import { RecetaList } from '@shared/interfaces/receta';
import { SortDirection } from '@ngbtsp/directives/sortable.directive';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap, debounceTime, switchMap, delay, map } from 'rxjs/operators';
import { Subject, BehaviorSubject, Observable, of } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { JsonRes } from '@shared/interfaces/json-res';
import { Marca, Menu, Material, Producto, } from '@shared/interfaces/marca';
import { isNullOrUndefined, isNull } from 'util';

interface SearchResult {
  recetas: RecetaList[];
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

function sort(recetas: RecetaList[], column: string, direction: string): RecetaList[] {
  if (direction === '') {
    return recetas;
  } else {
    return [...recetas].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}


function matches(receta: RecetaList, term: string) {

  return receta.cliente.toLowerCase().includes(term.toLowerCase())
    || receta.clase.toLowerCase().includes(term.toLowerCase())
    || receta.descripcion.toLowerCase().includes(term.toLowerCase());
}

@Injectable({ providedIn: 'root' })
export class RecetarioService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _recetas$ = new BehaviorSubject<RecetaList[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private RECETAS: RecetaList[];

  private url: string;

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };


  public _marca$ = new Subject<Marca>();

  constructor(
    private http: HttpClient,
    private pipe: DecimalPipe
  ) {
    this.url = environment.api_receta_url + '/rec';

    this.todos().subscribe(data => {
      this.RECETAS = data.rows;

      this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      ).subscribe(result => {
        this._recetas$.next(result.recetas);
        this._total$.next(result.total);
      });


      this._recetas$.next(this.RECETAS);
      this._search$.next();
    });



  }

  crear(recetas: RecetaList) {

    return this.http.post<JsonRes>(`${this.url}ins`, recetas);
  }

  editarProductos(id: string, changes: Partial<RecetaList>) {
    return this.http.put<JsonRes>(`${this.url}upd/${id}`, changes);
  }
  editarMaterial(id: string, changes: Partial<RecetaList>) {
    return this.http.put<JsonRes>(`${this.url}upd/${id}`, changes);
  }

  eliminar(id: string) {
    return this.http.delete<JsonRes>(`${this.url}del/${id}`);
  }

  optener(id: string) {
    return this.http.post<JsonRes>(`${this.url}one/${id}`, id).pipe(
      map(data => {
        let marca: Marca = this.convertir(data.rows);
        this._marca$.next(marca);
        return marca;
      })
    );
  }

  convertir(data): Marca {
    const marca: Marca = this.encabezado((data.length > 1) ? data[0] : data);
    marca.menus = this.menu(data);
    // console.log(marca);
    
    return marca;
  }

  encabezado(data): Marca {

    return {

      nombre: data.descripcion,
      cliente: data.cliente,
      longitud: data.tamCabeza,
      cauchos: data.ubiCauchos,
      armado: {
        tipo: data.armado,
        url: data.urlArmado,
      },
      menus: null,
    };
  }

  FiltroCampo(item, id, campo) {
    if (!isNullOrUndefined(item[campo]) && item.piso === id) {
      return item;
    }
  }

  menu(data): Menu[] {
    let id: number = 0;
    let sig: boolean;
    let arregloMenu: Menu[] = [];
    do {
      sig = false;
      id++;
      let nuevosProductos: Producto[] = data.filter(i => this.FiltroCampo(i, id, 'producto'));
      let nuevosMateriales: Material[] = data.filter(i => this.FiltroCampo(i, id, 'material'));

      if ((!isNull(nuevosProductos) && !isNull(nuevosMateriales)) && (nuevosProductos.length > 0 && nuevosMateriales.length > 0)) {
        arregloMenu.push(
          {

            id: id,
            nombre: data[0].descPiso,
            superior: null,
            materiales: this.material(nuevosMateriales),
            productos: this.producto(nuevosProductos),

          }
        );
        sig = true;
      }

    } while (sig);

    return arregloMenu;
  }

  material(data): Material[] {
    return data.map(i => {
      return {

        id: i.id_num,
        url: i.urlMaterial,
        tipo: i.tipoMaterial,
        material: i.material,
        cantidad: i.cantMaterial
      };
    });
  }

  producto(data): Producto[] {
    return data.map(i => {
      return {
        id: i.id_num,
        producto: i.producto,
        variedad: i.variedad,
        ptoCorte: i.ptoCorte,
        grado: i.grado,
        tallos: i.tallos
      };
    });
  }


  todos() {
    return this.http.get<JsonRes>(`${this.url}all`);
  }


  get recetas$() { return this._recetas$.asObservable(); }
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
    let recetas = sort(this.RECETAS, sortColumn, sortDirection);

    // 2. filter
    recetas = recetas.filter(recetas => matches(recetas, searchTerm));
    const total = recetas.length;

    // 3. paginate
    recetas = recetas.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ recetas, total });
  }
}
