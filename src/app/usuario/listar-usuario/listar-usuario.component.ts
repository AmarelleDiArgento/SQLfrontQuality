import { Component, OnInit, AfterContentInit, ViewChildren, QueryList } from '@angular/core';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { SwalModalService } from 'src/app/core/swal-modal.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { NgbdSortableHeader, SortEvent } from 'src/app/ng-bootstrap/directives/sortable.directive';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent implements OnInit {

  usuarios$: Observable<Usuario[]>;
  total$: Observable<number>;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  data = false;

  page = 4;

  constructor(
    private service: UsuarioService,
    private sw: SwalModalService
  ) {
    this.usuarios$ = service.usuarios$;
    this.total$ = service.total$;
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
