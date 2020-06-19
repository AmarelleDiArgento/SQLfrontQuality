import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '@core/services/usuario.service';
import { SessionFull } from '@shared/interfaces/session';
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

  sessionFull: SessionFull;

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

  // onSubmit() {
  //   this.serUsuario.login(this.loginForm.value).subscribe(data => {
  //     if (data.respuesta === 'success') {
  //       this.generarSession(data.rows);
  //     } else {
  //       this.swal.modal(data)
  //     }
  //   });

  // }

  onSubmit() {
    this.serUsuario.loginSessionFull(this.loginForm.value)
      .subscribe(data => {
        this.sessionFull = data[0] as SessionFull;
        localStorage.setItem('Session', this.crypto.encriptar(JSON.stringify(this.sessionFull)));
        this.router.navigate(['home']);
      });
  }
}