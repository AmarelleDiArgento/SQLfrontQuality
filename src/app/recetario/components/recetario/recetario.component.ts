import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { RecetarioService } from '@core/services/recetario.service'
import { Observable } from 'rxjs';
import { RecetaList } from '@shared/interfaces/receta';
import { NgbdSortableHeader, SortEvent } from '@ngbtsp/directives/sortable.directive';
import { SwalModalService } from '@core/services/swal-modal.service';

@Component({
  selector: 'app-recetario',
  templateUrl: './recetario.component.html',
  styleUrls: ['./recetario.component.scss']
})
export class RecetarioComponent implements OnInit {

  recetas$: Observable<RecetaList[]>;
  total$: Observable<number>;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  data = false;

  page = 1;

  constructor(
    public service: RecetarioService,
    private sw: SwalModalService
  ) {
    this.recetas$ = service.recetas$;
    this.total$ = service.total$;
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


  eliminarUsuario(id: string) {
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
