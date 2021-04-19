import { Component, OnInit } from "@angular/core";
import { DesplegableService } from "@core/services/desplegable.service";
import { CheckStatus } from "@shared/interfaces/check-status";
import { Desplegable } from "@shared/interfaces/desplegable";
import { EncabezadoTabla } from "@shared/interfaces/encabezado-tabla";
import { Usuario } from "@shared/interfaces/usuario";
import { TUsuarioService } from "app/testing/services/t-usuario.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-pagina-de-pruebas",
  templateUrl: "./pagina-de-pruebas.page.html",
  styleUrls: ["./pagina-de-pruebas.page.scss"],
})
export class PaginaDePruebasPage implements OnInit {
  public Encabezados: EncabezadoTabla[] = [
    {
      nombre: "ID",
      nombreBase: "id_login",
      pintar: true,
    },
    {
      nombre: "Codigo",
      nombreBase: "id_usuario",
      pintar: true,
    },
    {
      nombre: "Nombre",
      nombreBase: "nombre_usuario",
      pintar: true,
    },
    {
      nombre: "Pass",
      nombreBase: "password",
      pintar: true,
    },
    {
      nombre: "Grupo 1",
      nombreBase: "Grupo1",
      pintar: true,
    },
    {
      nombre: "Grupo 2",
      nombreBase: "Grupo2",
      pintar: true,
    },
    {
      nombre: "Grupo 3",
      nombreBase: "Grupo3",
      pintar: true,
    },
  ];
  usuarios$: Observable<Usuario[]>;
  lista$: Observable<any[]>;

  constructor(
    public t_UserServ: TUsuarioService,
    private desplegableServ: DesplegableService
  ) {}

  ngOnInit(): void {
    this.usuarios$ = this.t_UserServ.optenerTodos();
    this.lista$ = this.t_UserServ.optenerFincas({ id_usuario: "18923" });
  }

  eventoclic(event: CheckStatus) {
    let empleado = 18923;
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
    this.lista$ = this.t_UserServ.optenerFincas({ id_usuario: "18923" });
  }
}
