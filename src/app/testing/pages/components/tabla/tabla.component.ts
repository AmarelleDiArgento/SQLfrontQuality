import { Component, Input, OnInit } from "@angular/core";
import { TUsuarioService } from "app/testing/services/t-usuario.service";
import { BehaviorSubject, Observable } from "rxjs";
import { NgbAccordion } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DecimalPipe } from "@angular/common";
import { map, tap } from "rxjs/operators";

@Component({
  selector: "app-tabla",
  templateUrl: "./tabla.component.html",
  styleUrls: ["./tabla.component.scss"],
})
export class TablaComponent implements OnInit {
  term: string = null;
  pagina: number = 1;
  pags: number = 0;
  inicio: number;
  fin: number;

  tamano: number = 10;

  @Input() datos$: Observable<any[]>;
  @Input() encabezados: any[];

  resultados$: Observable<any[]>;

  _cargando$ = new BehaviorSubject<boolean>(true);
  _total$ = new BehaviorSubject<number>(0);

  // var form
  filtros: FormGroup;
  ordenadoPor: string = null;

  constructor(
    // public t_UserServ: TUsuarioService,
    private formBuilder: FormBuilder,
    private decimal: DecimalPipe
  ) {}

  ngOnInit(): void {
    this.resultados$ = this.recargaCompleta(this.datos$);
    this.filtros = this.formBuilder.group({
      term: [""],
      tamano: [10],
    });

    this.filtros.valueChanges.subscribe((data) => {
      this.tamano = data.tamano;
    });

    // filtros de texto texto
    this.filtros.get("term").valueChanges.subscribe((term) => {
      this.term = term;
      this.resultados$ = this.resultados;
    });
  }

  Ordenar(index, campo, reverso) {
    this.encabezados.forEach((e) => (e.orden = false));
    this.encabezados[index].orden = reverso;

    this.resultados$ = this.resultados$.pipe(
      map((p) =>
        p.sort((a, b) => {
          let tipo = typeof a[campo];

          switch (tipo) {
            case "string":
              return reverso
                ? b[campo].localeCompare(a[campo])
                : a[campo].localeCompare(b[campo]);
            case "number":
              return reverso ? b[campo] - a[campo] : a[campo] - b[campo];
          }
        })
      )
    );
  }

  paginas(total: number): number[] {
    let ini: number = this.inicio;
    let fin: number = this.fin;

    this.pags = Math.ceil(total / this.tamano) | 0;
    let pag: number[] = [];
    this.inicio = this.pagina > 5 && this.pags > 10 ? this.pagina - 5 : 1;
    this.fin = this.pagina >= 5 && this.pags > 10 ? this.pagina + 4 : 10;
    /*
    if (ini !== this.inicio && fin !== this.fin) {
      console.log(this.maximoInf(this.inicio), this.maximoSup(this.fin));
    }
*/
    for (
      let i = this.maximoInf(this.inicio);
      i <= this.maximoSup(this.fin);
      i++
    ) {
      pag.push(i);
    }

    return pag;
  }

  maximoSup(fin: number): number {
    if (fin > this.pags) return this.pags;
    return fin;
  }

  maximoInf(ini: number): number {
    if (ini < 0) return 1;
    if (ini + 9 >= this.pags && this.pags >= 10) return this.pags - 9;
    return ini;
  }

  pag(p: number) {
    this.pagina = p;
  }

  antPag() {
    if (this.pagina !== 1) --this.pagina;
  }

  sigPag() {
    if (this.pags > this.pagina) ++this.pagina;
  }

  get loading$() {
    return this._cargando$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }

  recargaCompleta(datos: Observable<any[]>): Observable<any[]> {
    datos.subscribe((d) => {
      this._total$.next(d.length | 0);
    });
    return datos;
  }

  get resultados(): Observable<any[]> {
    if (this.term === null || this.term.length < 2) {
      return this.recargaCompleta(this.datos$);
    } else {
      return this.datos$.pipe(
        tap(() => {
          this._cargando$.next(true);
        }),
        map((data: any[]) => {
          let resulados = data.filter((d) => this.matches(d, this.term));
          this._total$.next(resulados.length | 0);
          return resulados;
        }),
        tap(() => {
          this._cargando$.next(false);
        })
      );
    }
  }

  matches(form: any, term: string) {
    return this.validar(form, term);
  }

  validar(objeto: any, term: string) {
    var encontrados: boolean[] = [];
    this.encabezados.forEach((encabezado) => {
      let tipo = typeof objeto[encabezado.nombreBase];

      switch (tipo) {
        case "string":
          encontrados.push(
            this.validarTexto(objeto[encabezado.nombreBase], term)
          );
          break;
        case "number":
          encontrados.push(
            this.validarNumero(objeto[encabezado.nombreBase], term)
          );
          break;
        default:
          encontrados.push(false);
          break;
      }
    });

    return encontrados.find((e) => e === true);
  }

  validarTexto(objeto: string, term: string) {
    if (objeto !== undefined && objeto !== null) {
      return objeto.toLowerCase().includes(term.toLowerCase());
    }
    return false;
  }

  validarNumero(objeto: number, term: string) {
    if (objeto !== undefined && objeto !== null) {
      return this.decimal.transform(objeto).includes(term);
    }
    return false;
  }
}
