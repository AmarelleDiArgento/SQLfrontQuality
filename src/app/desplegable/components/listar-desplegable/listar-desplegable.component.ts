import { Component, OnInit, AfterContentInit, ViewChildren, QueryList } from '@angular/core';
import { DesplegableService } from 'src/app/core/services/desplegable.service'
import { SwalModalService } from 'src/app/core/swal-modal.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Desplegable } from 'src/app/shared/interfaces/desplegable';
import { NgbdSortableHeader, SortEvent } from 'src/app/ng-bootstrap/directives/sortable.directive';




@Component({
  selector: 'app-listar-desplegable',
  templateUrl: './listar-desplegable.component.html',
  styleUrls: ['./listar-desplegable.component.scss']
})
export class ListarDesplegableComponent implements OnInit {

  desplegables$: Observable<Desplegable[]>;
  total$: Observable<number>;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  data = false;

  page = 1;

  constructor(
    public service: DesplegableService,
    private sw: SwalModalService
  ) {
    this.desplegables$ = this.service.desplegables$
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
  eliminarDesplegable(id: string) {
    this.service.eliminar(id)
      .subscribe(data => {
        // console.log(data);
        let val = this.sw.modal(data)
        if (val) {
          // console.log('Cargue');

          // this.()
        }
      })

  }

}
