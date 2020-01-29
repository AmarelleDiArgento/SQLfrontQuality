import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GraficaPostco, Items, Shorts, Procesos } from 'src/app/shared/interfaces/grafica-postco';
import { JsonRes } from 'src/app/shared/interfaces/json-res';
import { saveAs } from 'file-saver';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url: string

  public Graph: GraficaPostco[] = [];

  public graph = new BehaviorSubject<GraficaPostco[]>([]);
  graph$ = this.graph.asObservable();


  public dat
  public datas = new BehaviorSubject<[]>([]);
  public datas$ = this.datas.asObservable();


  public postcosechas = [];
  public post = new BehaviorSubject<any[]>([]);
  public post$ = this.post.asObservable();

  constructor(
    private http: HttpClient,
  ) {

    this.url = environment.api_url + '/gra'
  }

  // crear(graP: GraficaPostco) {
  //   // console.log(proceso);

  //   return this.http.post<JsonRes>(`${this.url}ins`, graP)
  // }

  // editar(id: string, changes: Partial<GraficaPostco>) {
  //   return this.http.put<JsonRes>(`${this.url}upd/${id}`, changes)
  // }

  // eliminar(id: string) {
  //   return this.http.delete<JsonRes>(`${this.url}del/${id}`)
  // }

  // optener(id: string) {
  //   return this.http.post<JsonRes>(`${this.url}one/${id}`, id)
  // }

  todos() {
    return this.http.get<JsonRes>(`${this.url}all`)
  }

  cargar() {
    this.todos().subscribe(i => {
      this.dat = i.rows
      this.datas.next(this.dat)
      this.DataPostco()
    })
  }


  data(id: number): GraficaPostco {
    return this.Graph[id]
  }


  /**
 * Estructurar json! inicio
 * this.Graph contiene la data agrupada general
 */

  DataPostco() {
    this.Graph = []
    this.postcosechas = []

    this.dat.map(r => {
      let AgregoPostco = false;

      for (const i of this.Graph) {
        if (i.postcosecha === r.Postcosecha) {
          i.Si += r.Total_Si;
          i.No += r.Total_No;
          i.cumplimiento = i.Si / (i.No + i.Si)
          AgregoPostco = true;
          i.procesos = this.DataProceso(r, i.procesos);
        }
      }

      if (!AgregoPostco) {
        let gnew: GraficaPostco;
        let id = this.Graph.length
        this.postcosechas.push(r.Postcosecha)
        this.post.next(this.postcosechas)
        gnew = {
          id: id,
          postcosecha: r.Postcosecha,
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
        }
        this.Graph.push(gnew)
      }
      this.graph.next(this.Graph)

    })
  }

  DataProceso(r, p: Procesos[]): Procesos[] {

    let AgregoProceso = false;
    for (let i = 0; i < p.length; i++) {

      if (p[i].proceso === r.nombre_proceso) {
        p[i].Si += r.Total_Si;
        p[i].No += r.Total_No;
        p[i].cumplimiento = p[i].Si / (p[i].No + p[i].Si)
        AgregoProceso = true;
        p[i].shorts = this.DataShorts(r, p[i].shorts)
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
      }
      p.push(pnew)
    }
    return p
  }

  DataShorts(r, p: Shorts[]): Shorts[] {

    let AgregoShort = false;
    for (let i = 0; i < p.length; i++) {
      if (p[i].short === r.Short_Item) {
        p[i].Si += r.Total_Si;
        p[i].No += r.Total_No;
        p[i].cumplimiento = p[i].Si / (p[i].No + p[i].Si)
        AgregoShort = true;
        p[i].items = this.DataItems(r, p[i].items)
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
      }
      p.push(snew)
    }
    return p

  }

  DataItems(r, p: Items[]): Items[] {


    let AgregoShort = false;
    for (let i = 0; i < p.length; i++) {
      if (p[i].item === r.item) {
        p[i].Si += r.Total_Si;
        p[i].No += r.Total_No;
        p[i].cumplimiento = p[i].Si / (p[i].No + p[i].Si)
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
      }
      p.push(snew)
    }
    return p
  }

  /**
   * Estructurar json! Final
   */


}
