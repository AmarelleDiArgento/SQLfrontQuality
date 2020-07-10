import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { GraficaInfo, Items, Shorts, Procesos } from '@shared/interfaces/grafica-info';
import { JsonRes } from '@shared/interfaces/json-res';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap, debounceTime, switchMap, delay } from 'rxjs/operators';
import { isNull, isNullOrUndefined } from 'util';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url: string;

  public Graph: GraficaInfo[] = [];

  public graph = new BehaviorSubject<GraficaInfo[]>([]);
  public graph$ = this.graph.asObservable();

  public dat;
  public datas = new BehaviorSubject<[]>([]);
  public datas$ = this.datas.asObservable();

  public postcosechas = [];
  public post = new BehaviorSubject<any[]>([]);
  public post$ = this.post.asObservable();

  public fincas = [];
  public finc = new BehaviorSubject<any[]>([]);
  public finc$ = this.finc.asObservable();

  private _loading$ = new BehaviorSubject<boolean>(true);

  private _searchPost$ = new Subject<void>();
  private _postcosechas$ = new BehaviorSubject<any[]>([]);

  private _searchCult$ = new Subject<void>();
  private _cultivo$ = new BehaviorSubject<any[]>([]);

  private _searchSiem$ = new Subject<void>();
  private _siembra$ = new BehaviorSubject<any[]>([]);

  private fecha: [{ year: 2020, month: 2, day: 25, formatoSql: '2020-02-25' }, { year: 2020, month: 2, day: 28, formatoSql: '2020-02-28' }];
  constructor(
    private http: HttpClient,

  ) {

    this.url = environment.api_url + '/gra';

    this._searchPost$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._searchPost(this.fecha)),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._postcosechas$.next(result.rows);
    });

    this._searchCult$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._searchCult(this.fecha)),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._cultivo$.next(result.rows);
    });

    this._searchSiem$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._searchSiem(this.fecha)),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._siembra$.next(result.rows);
    });

  }

  private _searchPost(fecha): Observable<JsonRes> {
    return this.http.post<JsonRes>(`${this.url}pos`, fecha);
  }


  private _searchCult(fecha): Observable<JsonRes> {
    return this.http.post<JsonRes>(`${this.url}cul`, fecha);
  }


  private _searchSiem(fecha): Observable<JsonRes> {
    return this.http.post<JsonRes>(`${this.url}cul`, fecha);
  }

  private _searchMoni(fecha): Observable<JsonRes> {
    return this.http.post<JsonRes>(`${this.url}mon`, fecha);
  }


  get postcosecha$() { return this._postcosechas$.asObservable(); }
  get cultivo$() { return this._cultivo$.asObservable(); }
  get siembra$() { return this._cultivo$.asObservable(); }

  get loading$() { return this._loading$.asObservable(); }



  postcosecha(fecha) {
    // console.log('Hola Postco :D');
    return this.http.post<JsonRes>(`${this.url}pos`, fecha);
  }
  cultivo(fecha) {
    // console.log('Hola cultivo :D');
    return this.http.post<JsonRes>(`${this.url}cul`, fecha);
  }
  siembra(fecha) {
    // console.log('Hola cultivo :D');
    return this.http.post<JsonRes>(`${this.url}pla`, fecha);
  }
  monitoreo(fecha) {
    // console.log('Hola cultivo :D');
    return this.http.post<JsonRes>(`${this.url}mon`, fecha);
  }

  auditoria(rango: any[]) {
    return this.http.post<JsonRes>(`${this.url}exp`, rango);
  }

  cargar(origen: string, fecha: any[], supervisor: string, finca: string) {

    this.Graph = [];
    this.graph.next(this.Graph);
    switch (origen) {
      case 'C':
        this.cultivo(fecha).subscribe(i => {
          this.dat = i.rows;
          this.datas.next(this.dat);
          this.DataCultivo(this.dat);
        });
        break;
      case 'P':
        this.postcosecha(fecha).subscribe(i => {
          this.dat = i.rows;
          this.datas.next(this.dat);
          this.DataPostco(this.dat);
        });
        break;
      case 'S':
        this.siembra(fecha).subscribe(i => {
          this.dat = i.rows;
          this.datas.next(this.dat);
          this.DataCultivo(this.dat);
        });
        break;
      case 'M':
        this.monitoreo(fecha).subscribe(i => {
          this.dat = i.rows;
          this.datas.next(this.dat);
          this.DataCultivo(this.dat);
        });
        break;

      default:
        break;
    }
  }


  data(id: number): GraficaInfo {
    return this.Graph[id];
  }

  // Filtra por criterio.
  criterio(item: any, supervisor: string, finca: string) {

    if ((isNullOrUndefined(supervisor) || item.Supervisor.trim() === supervisor.trim())
      && (isNullOrUndefined(finca) || item.Finca.trim() === finca.trim())) {
      return item;
    }
  }
  // Prueba

  Filtro(data, supervisor: string, finca: string) {
    return data.filter(r => this.criterio(r, supervisor, finca));
  }

  Suma = (rows, name, dato, criterio) => {
    var acum = 0;
    rows.reduce((a, b) => {
      acum += (b[name] === dato) ? b[criterio] : 0;
    });

    return acum;
  }

  Cumplimiento = (Si, No) => Si / (Si + No);

  resultado = (rows, name) => {

    return Array.from(new Set(rows.map(s => s[name])))
      .map(dato => {

        var Si = this.Suma(rows, name, dato, 'Total_Si');
        var No = this.Suma(rows, name, dato, 'Total_No');

        return {
          Supervisor: dato,
          Total_Si: Si,
          Total_No: No,
          cumplimiento: this.Cumplimiento(Si, No)
        };
      });

  }


  Supervisores(data): string[] {
    return data.map(({ Supervisor: d }) => d);
  }

  // retorna valores unicos
  Distinto = (valor, indice, self) => {
    return self.indexOf(valor) === indice;
  }

  Unicos(data, supervisor: string, finca: string) {
    return this.Supervisores(
      this.Filtro(data, supervisor, finca))
      .filter(this.Distinto);
  }




  /**
 * Estructurar json! inicio
 * this.Graph contiene la data agrupada general
 */

  DataPostco(dat: any[]) {
    this.Graph = [];
    this.postcosechas = [];

    dat.map(r => {

      let AgregoPostco = false;

      for (const i of this.Graph) {
        if (i.origen === r.Postcosecha) {
          i.Si += r.Total_Si;
          i.No += r.Total_No;
          i.cumplimiento = i.Si / (i.No + i.Si);
          AgregoPostco = true;
          i.procesos = this.DataProceso(r, i.procesos);
        }
      }

      if (!AgregoPostco) {
        let gnew: GraficaInfo;
        const id = this.Graph.length;
        this.postcosechas.push(r.Postcosecha);
        this.post.next(this.postcosechas);
        gnew = {
          id,
          origen: r.Postcosecha,
          Si: r.Total_Si,
          No: r.Total_No,
          activo: true,
          cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
          procesos: [{
            id: 0,
            proceso: r.nombre_proceso,
            Si: r.Total_Si,
            No: r.Total_No,
            cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
            shorts: [{
              id: 0,
              short: r.Short_Item,
              Si: r.Total_Si,
              No: r.Total_No,
              cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
              items: [{
                id: 0,
                item: r.item,
                Si: r.Total_Si,
                No: r.Total_No,
                cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No))
              }]
            }]
          }]
        };
        this.Graph.push(gnew);
      }
      this.graph.next(this.Graph);

    });
  }


  DataCultivo(dat: any[]) {
    // console.log('Data Cul:', dat);

    this.graph.next([]);
    this.Graph = [];
    this.fincas = [];

    dat.map(r => {
      let AgregoFinca = false;

      for (const i of this.Graph) {
        if (i.origen === r.Finca) {
          i.Si += r.Total_Si;
          i.No += r.Total_No;
          i.cumplimiento = i.Si / (i.No + i.Si);
          AgregoFinca = true;
          i.procesos = this.DataProceso(r, i.procesos);
        }
      }

      if (!AgregoFinca) {
        let gnew: GraficaInfo;
        const id = this.Graph.length;
        this.fincas.push(r.Finca);
        this.finc.next(this.fincas);
        gnew = {
          id,
          origen: r.Finca,
          Si: r.Total_Si,
          No: r.Total_No,
          activo: true,
          cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
          procesos: [{
            id: 0,
            proceso: r.nombre_proceso,
            Si: r.Total_Si,
            No: r.Total_No,
            cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
            shorts: [{
              id: 0,
              short: r.Short_Item,
              Si: r.Total_Si,
              No: r.Total_No,
              cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
              items: [{
                id: 0,
                item: r.item,
                Si: r.Total_Si,
                No: r.Total_No,
                cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No))
              }]
            }]
          }]
        };

        this.Graph.push(gnew);
      }

      this.graph.next(this.Graph);

    });
  }

  DataProceso(r, p: Procesos[]): Procesos[] {

    let AgregoProceso = false;
    for (let i = 0; i < p.length; i++) {

      if (p[i].proceso === r.nombre_proceso) {
        p[i].Si += r.Total_Si;
        p[i].No += r.Total_No;
        p[i].cumplimiento = p[i].Si / (p[i].No + p[i].Si);
        AgregoProceso = true;
        p[i].shorts = this.DataShorts(r, p[i].shorts);
      }
    }

    if (!AgregoProceso) {
      let pnew: Procesos;
      pnew = {
        id: 0,
        proceso: r.nombre_proceso,
        Si: r.Total_Si,
        No: r.Total_No,
        cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
        shorts: [{
          id: 0,
          short: r.Short_Item,
          Si: r.Total_Si,
          No: r.Total_No,
          cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
          items: [{
            id: 0,
            item: r.item,
            Si: r.Total_Si,
            No: r.Total_No,
            cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No))
          }]
        }]
      };
      p.push(pnew);
    }
    return p;
  }

  DataShorts(r, p: Shorts[]): Shorts[] {

    let AgregoShort = false;
    for (let i = 0; i < p.length; i++) {
      if (p[i].short === r.Short_Item) {
        p[i].Si += r.Total_Si;
        p[i].No += r.Total_No;
        p[i].cumplimiento = p[i].Si / (p[i].No + p[i].Si);
        AgregoShort = true;
        p[i].items = this.DataItems(r, p[i].items);
      }
    }

    if (!AgregoShort) {
      let snew: Shorts;
      snew = {
        id: 0,
        short: r.Short_Item,
        Si: r.Total_Si,
        No: r.Total_No,
        cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
        items: [{
          id: 0,
          item: r.item,
          Si: r.Total_Si,
          No: r.Total_No,
          cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No))
        }]
      };
      p.push(snew);
    }
    return p;

  }

  DataItems(r, p: Items[]): Items[] {


    let AgregoShort = false;
    for (let i = 0; i < p.length; i++) {
      if (p[i].item === r.item) {
        p[i].Si += r.Total_Si;
        p[i].No += r.Total_No;
        p[i].cumplimiento = p[i].Si / (p[i].No + p[i].Si);
        AgregoShort = true;
      }
    }

    if (!AgregoShort) {
      let snew: Items;
      snew = {
        id: 0,
        item: r.item,
        Si: r.Total_Si,
        No: r.Total_No,
        cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No))
      };
      p.push(snew);
    }
    return p;
  }

  /**
   * Estructurar json! Final
   */


}
