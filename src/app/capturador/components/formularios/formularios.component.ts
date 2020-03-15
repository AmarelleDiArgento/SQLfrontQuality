import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '@core/services/proceso.service';
import { Observable } from 'rxjs';
import { Procesos } from '@shared/interfaces/proceso';
import { SwalModalService } from '@core/services/swal-modal.service';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.scss']
})
export class FormulariosComponent implements OnInit {

  proceso$: Observable<Procesos[]>;
  total$: Observable<number>;

  data = false;

  page = 1;

  constructor(

    public serProceso: ProcesoService,
    private sw: SwalModalService
  ) {
    this.proceso$ = this.serProceso.proceso$
    this.total$ = this.serProceso.total$
  }

  ngOnInit() {
  }
}
