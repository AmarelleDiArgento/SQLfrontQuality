import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Router } from '@angular/router';
import { SwalModalService } from 'src/app/core/services/swal-modal.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  // var form
  nuevoUsuario: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private sw: SwalModalService,
    private router: Router
  ) { }

  ngOnInit() {
    // init form
    this.nuevoUsuario = this.formBuilder.group({
      id_usuario: ['', Validators.required],
      nombre_usuario: ['', Validators.required]
    });

  }
  // get form controls
  get f() { return this.nuevoUsuario.controls; }


  onSubmit() {
    // error here if form is invalid
    if (this.nuevoUsuario.valid) {
      // console.log('valido');
      this.submitted = true;
      this.usuarioService.crear(this.nuevoUsuario.value)
        .subscribe(data => {
          // console.log(data);
          let val = this.sw.modal(data)
          if (val) {
            // console.log('Cargue');
            this.router.navigate(['usuario'])
          } else {
            this.submitted = false;
          }
        })
    }
  }
}
