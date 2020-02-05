import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, RequiredValidator } from '@angular/forms';
import { DesplegableService } from 'src/app/core/services/desplegable.service';
import { Desplegable } from 'src/app/shared/interfaces/desplegable';
import { HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { SwalModalService } from 'src/app/core/swal-modal.service';

@Component({
  selector: 'app-editar-desplegable',
  templateUrl: './editar-desplegable.component.html',
  styleUrls: ['./editar-desplegable.component.scss']
})
export class EditarDesplegableComponent implements OnInit {

  // var form
  editarDesplegable: FormGroup;
  desplegable;
  id;
  submitted = false;
  data = false;
  constructor(
    private formBuilder: FormBuilder,
    private desplegableService: DesplegableService,
    private activatedRoute: ActivatedRoute,
    private sw: SwalModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.editarDesplegable = this.formBuilder.group({
      id_Desplegable: ['', Validators.required],
      Filtro: ['', Validators.required],
      Codigo: ['', Validators.required],
      Opcion: ['', Validators.required]
    });
    this.optenerUno();
  }

  // get form controls
  get f() { return this.editarDesplegable.controls; }

  optenerUno() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.desplegableService.optener(this.id)
        .subscribe(data => {

          this.data = data.respuesta === 'success';
          if (this.data) {
            // console.log(data);
            this.editarDesplegable = this.formBuilder.group(data.rows);
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
                this.router.navigate(['desplegable']);
              });
          }
        });
    });

  }
  onSubmit() {
    // error here if form is invalid
    if (this.editarDesplegable.valid) {
      // console.log('valido');
      this.submitted = true;
      this.desplegableService.editar(this.id, this.editarDesplegable.value)
        .subscribe(data => {
          // console.log(data);
          let val = this.sw.modal(data);
          if (val) {
            // console.log('Cargue');
            this.router.navigate(['desplegable']);
          }
        });
    }
  }
}


