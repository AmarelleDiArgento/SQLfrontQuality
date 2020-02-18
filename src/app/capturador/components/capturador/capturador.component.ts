import { Component, OnInit } from '@angular/core';

import { ProcesosDetalleService } from 'src/app/core/services/procesodetalle.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Procesos_Detalle } from 'src/app/shared/interfaces/procesosdetalle';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-capturador',
  templateUrl: './capturador.component.html',
  styleUrls: ['./capturador.component.scss']
})
export class CapturadorComponent implements OnInit {
  procesosdetalle$: Observable<Procesos_Detalle[]>;
  id;
  encabezado: Procesos_Detalle[] = [];
  preguntas: Procesos_Detalle[] = [];



  constructor(
    public serProDet: ProcesosDetalleService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.serProDet.tabla(this.id);
      this.procesosdetalle$ = this.serProDet.procesosdetalle$;

      this.procesosdetalle$.subscribe(data => {
        this.encabezado = [];
        this.preguntas = []
        data.map((e) => {
          if (e.tipo_M === 'H') {
            //console.log(e);
            this.encabezado.push(e);

          } else {
            this.preguntas.push(e);
          }
        })
      })
    })
  }

  ngOnInit() {
    console.log(this.procesosdetalle$);

  }

}
