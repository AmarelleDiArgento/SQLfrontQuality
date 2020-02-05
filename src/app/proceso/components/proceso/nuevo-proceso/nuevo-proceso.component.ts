import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcesoService } from 'src/app/core/services/proceso.service';
import { Router } from '@angular/router';
import { SwalModalService } from 'src/app/core/swal-modal.service';
@Component({
  selector: 'app-nuevo-proceso',
  templateUrl: './nuevo-proceso.component.html',
  styleUrls: ['./nuevo-proceso.component.scss']
})
export class NuevoProcesoComponent implements OnInit {
  // var form
  nuevoProceso: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private procesoService: ProcesoService,
    private sw: SwalModalService,
    private router: Router,
  ) { }

  ngOnInit() {
    // init form
    this.nuevoProceso = this.formBuilder.group({
      codigo_proceso: ['', Validators.required],
      nombre_proceso: ['', Validators.required],
      Personalizado1: ['', Validators.required],
      Personalizado2: ['', Validators.required],
      Personalizado3: ['', Validators.required],
      Personalizado4: ['', Validators.required],
      Personalizado5: ['', Validators.required],
      Personalizado1_Valor: ['', Validators.required]

    })

  }
  // get form controls
  get f() { return this.nuevoProceso.controls; }


  onSubmit() {
    // error here if form is invalid
    if (this.nuevoProceso.valid ) {
      // console.log('valido');
      this.submitted = true;
      this.procesoService.crear(this.nuevoProceso.value)
        .subscribe(data => {
          // console.log(data);
          let val = this.sw.modal(data)
          if (val) {
            // console.log('Cargue');
            this.router.navigate(['proceso'])
          }else{
            this.submitted = false;
          }
        })
    }
  }
}
