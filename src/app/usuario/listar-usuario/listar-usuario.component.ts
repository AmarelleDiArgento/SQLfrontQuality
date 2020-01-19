import { Component, OnInit, AfterContentInit } from '@angular/core';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { SwalModalService } from 'src/app/core/swal-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent implements OnInit, AfterContentInit {
  ngAfterContentInit() {
    this.getUsuarios()
  }

  usuarios: []
  data = false;

  constructor(
    private usuarioService: UsuarioService,
    private sw: SwalModalService,
    private router: Router
  ) {

  }

  ngOnInit() {

  }

  getUsuarios() {
    this.usuarioService.todos()
      .subscribe(data => {
        console.log(data);

        this.usuarios = data.rows
        this.data = data.respuesta === 'success'
        console.log(this.usuarios);
      })

  }

  eliminarUsuario(id: string) {
    this.usuarioService.eliminar(id)
      .subscribe(data => {
        console.log(data);
        let val = this.sw.modal(data)
        if (val) {
          console.log('Cargue');
          
          this.getUsuarios()
        }
      })

  }

}
