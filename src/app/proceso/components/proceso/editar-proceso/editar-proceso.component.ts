import { Component, OnInit } from '@angular/core';
import { ProcesoService } from 'src/app/core/services/proceso.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SwalModalService } from 'src/app/core/swal-modal.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-proceso',
  templateUrl: './editar-proceso.component.html',
  styleUrls: ['./editar-proceso.component.scss']
})
export class EditarProcesoComponent implements OnInit {

  // var form
  editarProceso: FormGroup;
  proceso
  id
  submitted = false;
  data = false

  constructor(
    private formBuilder: FormBuilder,
    private procesoService: ProcesoService,
    private activatedRoute: ActivatedRoute,
    private sw: SwalModalService,
    private router: Router

  ) { }

  ngOnInit() {
    // init form

    this.editarProceso = this.formBuilder.group({
      id_Proceso: ['', Validators.required],
      codigo_proceso: ['', Validators.required],
      nombre_proceso: ['', Validators.required],
      Personalizado1: ['', Validators.required],
      Personalizado2: ['', Validators.required],
      Personalizado3: ['', Validators.required],
      Personalizado4: ['', Validators.required],
      Personalizado5: ['', Validators.required],
      Personalizado1_Valor: ['', Validators.required],
      
    });
    this.optenerUno()
  }

  // get form controls
  get f() { return this.editarProceso.controls; }

  optenerUno() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id
      this.procesoService.optener(this.id)
        .subscribe(data => {

          this.data = data.respuesta === 'success'
          if (this.data) {
            // console.log(data);
            this.editarProceso = this.formBuilder.group(data.rows);
          } else {
            // console.log(data);

            Swal.fire({
              icon: data.respuesta,
              title: data.output.mensaje,
              text: `${JSON.stringify(data.output.detalle)}
              C: ${data.output.code}`,
              timer: 3000
            })
              .then(() => {
                this.router.navigate(['proceso']);
              })
          }
        })
    })

  }
  onSubmit() {
    // error here if form is invalid
    if (this.editarProceso.valid) {
      // console.log('valido');
      this.submitted = true;
      this.procesoService.editar(this.id, this.editarProceso.value)
        .subscribe(data => {
          // console.log(data);
          let val = this.sw.modal(data)
          if (val) {
            // console.log('Cargue');
            this.router.navigate(['proceso'])
          }
        })
    }
  }
}

