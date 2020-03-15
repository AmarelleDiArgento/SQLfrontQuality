import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '@core/services/usuario.service';
import { Session } from '@shared/interfaces/session';
import { Permiso } from '@shared/interfaces/permiso';
import { Router } from '@angular/router';
import { SwalModalService } from '@core/services/swal-modal.service';
import { isUndefined } from 'util';
import { CryptoService } from '@core/services/crypto.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = {
    usuario: [
      { type: "required", message: "El usuario es requerido" },
      { type: "minlength", message: "El usuario es muy corto" }
    ],

    password: [
      { type: "required", message: "El password es requerido" },
      { type: "minlength", message: "El password es muy corto" }
    ]
  }
  session: Session;

  constructor(
    private form: FormBuilder,
    private serUsuario: UsuarioService,
    private swal: SwalModalService,
    private crypto: CryptoService,
    private router: Router
  ) {

    this.loginForm = this.form.group({
      usuario: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    })

  }

  get f() { return this.loginForm.controls }

  ngOnInit() {

  }

  onSubmit() {
    this.serUsuario.login(this.loginForm.value).subscribe(data => {
      if (data.respuesta === 'success') {
        this.generarSession(data.rows);
      } else {
        this.swal.modal(data)
      }
    })

  }

  generarSession(data: any[]) {
    var arr: boolean = !isUndefined(data.length);
      console.log(arr);

    this.session = {
      usuario: (arr) ? data[0].id_usuario : data['id_usuario'],
      nombre: (arr) ? data[0].nombre_usuario : data['nombre_usuario'],
      grupo: (arr) ? data[0].Grupo1 : data['Grupo1'],
      area: (arr) ? data[0].Grupo2 : data['Grupo2'],
      ubicacion: (arr) ? data[0].Grupo3 : data['Grupo3'],
      permisos: this.empaquetarPermisos(data, arr)
    }
    localStorage.setItem('Session', this.crypto.encriptar(JSON.stringify(this.session)))
    console.log(this.session);
    
    this.router.navigate(['home']);


  }

  empaquetarPermisos(data: any[], arreglo: boolean): Permiso[] {
    var pers: Permiso[] = [];
    var permisos = (arreglo) ? data : [data];

    if (permisos[0].nombre_permiso === null) {
      return null;
    } else {
      permisos.forEach(p => {
        pers.push({
          permiso: p.nombre_permiso.trim(),
          url: p.url.trim(),
          estado: p.estado === 1
        })
      })
    }

    return pers
  }

}
