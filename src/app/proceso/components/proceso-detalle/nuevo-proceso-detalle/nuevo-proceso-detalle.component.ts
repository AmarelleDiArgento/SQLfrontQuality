import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcesosDetalleService } from '@core/services/procesodetalle.service';
import { Router } from '@angular/router';
import { SwalModalService } from '@core/services/swal-modal.service';

@Component({
  selector: 'app-nuevo-proceso-detalle',
  templateUrl: './nuevo-proceso-detalle.component.html',
  styleUrls: ['./nuevo-proceso-detalle.component.scss']
})
export class NuevoProcesosdetalleComponent implements OnInit {

  nuevoProcesosdetalle: FormGroup;
  submitted = false;
  constructor(
    private fromBuilder: FormBuilder,
    private procesoDetalleService: ProcesosDetalleService,
    private sw: SwalModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.nuevoProcesosdetalle = this.fromBuilder.group({
      id_proceso: ['', Validators.required],
      codigo_detalle: ['', Validators.required],
      nombre_detalle: ['', Validators.required],
      tipo: ['', Validators.required],
      lista_desp: ['', Validators.required],
      tipo_M: ['', Validators.required],
      porcentaje: ['', Validators.required],
      capitulo: ['', Validators.required],
      item: ['', Validators.required],
      Capitulo_Nombre: ['', Validators.required],
      grupo1: ['', Validators.required]
    })
  }

  get f() { return this.nuevoProcesosdetalle.controls; }

  onSubmit(){
    // && !this.submitted
    if(this.nuevoProcesosdetalle.valid ){
      this.submitted = true;
      this.procesoDetalleService.crear(this.nuevoProcesosdetalle.value)
      .subscribe(data => {
        let val = this.sw.modal(data)
        if(val){
          this.router.navigate(['Proceso Detalle'])
        }else{
          this.submitted = false;
        }
      })

    }
  }
}
