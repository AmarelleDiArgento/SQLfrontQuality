import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProcesoService } from 'src/app/core/services/proceso.service';
import { SwalModalService } from 'src/app/core/swal-modal.service';
import { Router } from '@angular/router';

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
      id_proceso: ['', Validators.required],
      nombre_proceso: ['', Validators.required]
    });

  }
  // get form controls
  get f() { return this.nuevoProceso.controls; }


  onSubmit() {
    // error here if form is invalid
    if (this.nuevoProceso.valid) {
      // console.log('valido');
      this.submitted = true;
      this.procesoService.crear(this.nuevoProceso.value)
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
