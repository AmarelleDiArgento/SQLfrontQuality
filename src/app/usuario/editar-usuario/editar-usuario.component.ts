import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SwalModalService } from 'src/app/core/services/swal-modal.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  // var form
  editarUsuario: FormGroup;
  usuario
  id
  submitted = false;
  data = false;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private sw: SwalModalService,
    private router: Router

  ) { }

  ngOnInit() {
    // init form

    this.editarUsuario = this.formBuilder.group({
      id_login: ['', Validators.required],
      id_usuario: ['', Validators.required],
      nombre_usuario: ['', Validators.required]
    });
    this.optenerUno();
  }

  // get form controls
  get f() { return this.editarUsuario.controls; }

  optenerUno() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.usuarioService.optener(this.id)
        .subscribe(data => {

          this.data = data.respuesta === 'success';
          if (this.data) {
            // console.log(data);
            this.editarUsuario = this.formBuilder.group(data.rows);
          } else {
            // console.log(data);

                this.router.navigate(['usuario']);
                        }
        })
    })

  }
  onSubmit() {
    // error here if form is invalid
    if (this.editarUsuario.valid) {
      // console.log('valido');
      this.submitted = true;
      this.usuarioService.editar(this.id, this.editarUsuario.value)
        .subscribe(data => {
          // console.log(data);
          let val = this.sw.modal(data);
          if (val) {
            // console.log('Cargue');
            this.router.navigate(['usuario']);
          }
        });
    }
  }
}

