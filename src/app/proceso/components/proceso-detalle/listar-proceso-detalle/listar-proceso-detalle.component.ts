import { Component, OnInit, AfterContentInit, ViewChildren, QueryList } from '@angular/core';
import { ProcesosDetalleService } from '@core/services/procesodetalle.service';
import { SwalModalService } from '@core/services/swal-modal.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Procesos_Detalle } from '@shared/interfaces/procesosdetalle';
import { NgbdSortableHeader, SortEvent } from '@ngbtsp/directives/sortable.directive';

@Component({
  selector: 'app-listar-proceso-detalle',
  templateUrl: './listar-proceso-detalle.component.html',
  styleUrls: ['./listar-proceso-detalle.component.scss']
})
export class ListarProcesosDetalleComponent implements OnInit {
  procesosdetalle$: Observable<Procesos_Detalle[]>;
  total$: Observable<number>;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  data = false;
  id;
  page = 1;

  constructor(
    public service: ProcesosDetalleService,
    private sw: SwalModalService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      // console.log(this.id);
      this.service.tabla(this.id);
      this.procesosdetalle$ = this.service.procesosdetalle$;
      this.total$ = this.service.total$;

    });

  }
  ngOnInit() {

  }
  onSort({ column, direction }: SortEvent) {
    // console.log('click');
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  eliminarProcesosDetalle(id: string) {
    this.service.eliminar(id)
      .subscribe(data => {
        // console.log(data);
        const val = this.sw.modal(data);
        if (val) {
          // console.log('Cargue');
          // this.()
        }
      });

  }

}
