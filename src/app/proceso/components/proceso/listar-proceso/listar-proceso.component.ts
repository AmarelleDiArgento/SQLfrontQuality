import { Component, OnInit, AfterContentInit, ViewChildren, QueryList } from '@angular/core';
import { ProcesoService } from 'src/app/core/services/proceso.service';
import { SwalModalService } from 'src/app/core/services/swal-modal.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Procesos } from 'src/app/shared/interfaces/proceso';
import { NgbdSortableHeader, SortEvent } from 'src/app/ng-bootstrap/directives/sortable.directive';


@Component({
  selector: 'app-listar-proceso',
  templateUrl: './listar-proceso.component.html',
  styleUrls: ['./listar-proceso.component.scss']
})

export class ListarprocesoComponent implements OnInit {

  proceso$: Observable<Procesos[]>;
  total$: Observable<number>;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  data = false;

  page = 1;

  constructor(
    public service: ProcesoService,
    private sw: SwalModalService
  ) {
    this.proceso$ = this.service.proceso$
    this.total$ = this.service.total$
   }

  ngOnInit() {
  }

  onSort({ column, direction }: SortEvent) {
    console.log('click');
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  eliminarproceso(id: string) {
    this.service.eliminar(id)
      .subscribe(data => {
        // console.log(data);
        let val = this.sw.modal(data);
        if (val) {
          // console.log('Cargue');

          // this.()
        }
      });

  }

}
