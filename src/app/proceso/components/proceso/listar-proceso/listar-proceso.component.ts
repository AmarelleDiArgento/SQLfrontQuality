import { Component, OnInit, AfterContentInit } from '@angular/core';
import { SwalModalService } from 'src/app/core/swal-modal.service';
import { ProcesoService } from 'src/app/core/services/proceso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-proceso',
  templateUrl: './listar-proceso.component.html',
  styleUrls: ['./listar-proceso.component.scss']
})
export class ListarProcesoComponent implements OnInit, AfterContentInit {
  ngAfterContentInit() {
    this.getProcesos()
  }

  procesos: []
  data = false;

  constructor(
    private procesoService: ProcesoService,
    private sw: SwalModalService,
    private router: Router
  ) {

  }

  ngOnInit() {

  }

  getProcesos() {
    this.procesoService.todos()
      .subscribe(data => {
        // console.log(data);

        this.procesos = data.rows
        this.data = data.respuesta === 'success'
        // console.log(this.procesos);
      })

  }

  eliminarProceso(id: string) {
    this.procesoService.eliminar(id)
      .subscribe(data => {
        // console.log(data);
        let val = this.sw.modal(data)
        if (val) {
          // console.log('Cargue');

          this.getProcesos()
        }
      })

  }
}
