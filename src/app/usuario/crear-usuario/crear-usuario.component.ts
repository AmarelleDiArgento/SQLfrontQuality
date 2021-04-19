import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioService } from "@core/services/usuario.service";
import { Router } from "@angular/router";
import { SwalModalService } from "@core/services/swal-modal.service";
import { DesplegableService } from "@core/services/desplegable.service";
import { CheckList, CheckStatus } from "@shared/interfaces/check-status";
import { Observable } from "rxjs";
import { TUsuarioService } from "app/testing/services/t-usuario.service";
import { Usuario } from "@shared/interfaces/usuario";

@Component({
  selector: "app-crear-usuario",
  templateUrl: "./crear-usuario.component.html",
  styleUrls: ["./crear-usuario.component.scss"],
})
export class CrearUsuarioComponent implements OnInit {
  // var form
  nuevoUsuario: FormGroup;
  submitted = false;

  fincas$: Observable<any[]>;
  permisos$: Observable<any[]>;
  formularios$: Observable<any[]>;

  titulosFinca: CheckList = {
    id: "idFinca",
    nombre: "finca",
    status: "Acceso",
  };
  titulosPermiso: CheckList = {
    id: "id_Permiso",
    nombre: "nombre_permiso",
    status: "acceso",
  };
  titulosFormulario: CheckList = {
    id: "id_proceso",
    nombre: "Formulario",
    status: "Acceso",
  };

  inputs = ["Agrupador 1", "Agrupador 2", "Agrupador 3"];
  campos = ["Grupo1", "Grupo2", "Grupo3"];

  grupos$: Observable<string[]>;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private sw: SwalModalService,
    private router: Router,
    public t_UserServ: TUsuarioService,
    private desplegableServ: DesplegableService
  ) {
    this.grupos$ = this.usuarioService.grupos();
    this.fincas$ = this.t_UserServ.optenerFincas({ id_usuario: "15910" });
    this.permisos$ = this.t_UserServ.optenerPermisos({ id_usuario: "15910" });
    this.formularios$ = this.t_UserServ.optenerFormularios({
      id_usuario: "15910",
    });
  }

  ngOnInit() {
    // init form
    this.nuevoUsuario = this.formBuilder.group({
      id_usuario: ["", Validators.required],
      nombre_usuario: ["", Validators.required],
      Grupo1: [""],
      Grupo2: [""],
      Grupo3: [""],
    });
  }

  // get form controls
  get f() {
    return this.nuevoUsuario.controls;
  }

  onSubmit() {
    console.log("Submit");

    // error here if form is invalid
    if (this.nuevoUsuario.valid) {
      // console.log('valido');
      this.submitted = true;
      this.usuarioService.crear(this.nuevoUsuario.value).subscribe((data) => {
        // console.log(data);
        let val = this.sw.modal(data);
        if (val) {
          // console.log('Cargue');
          this.router.navigate(["usuario"]);
        } else {
          this.submitted = false;
        }
      });
    }
  }

  eventoClicFinca(event: CheckStatus) {
    let empleado = 15910;
    console.log("pagina", event);
    console.log(event.status, event.status !== 0);
    if (event.status !== 0) {
      this.desplegableServ
        .eliminar(event.status.toString())
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      this.desplegableServ
        .crear({
          Filtro: "loginfinca",
          Codigo: empleado,
          Opcion: event.id.toString(),
        })
        .subscribe((data) => {
          console.log(data);
        });
    }
    this.fincas$ = this.t_UserServ.optenerFincas({ id_usuario: "15910" });
  }

  eventoClicPermiso(event: CheckStatus) {
    let empleado = 15910;
    console.log("pagina", event);

    console.log(event.status, event.status !== 0);
    if (event.status !== 0) {
      this.desplegableServ
        .eliminar(event.status.toString())
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      this.desplegableServ
        .crear({
          Filtro: "loginfinca",
          Codigo: empleado,
          Opcion: event.id.toString(),
        })
        .subscribe((data) => {
          console.log(data);
        });
    }
  }

  eventoClicFormulario(event: CheckStatus) {
    let empleado = 15910;
    console.log("pagina", event);
  }

  valorAuto(event: any) {
    this.nuevoUsuario.controls[event.campo].setValue(event.valor);
  }
}
