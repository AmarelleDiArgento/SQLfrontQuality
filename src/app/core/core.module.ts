import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { UsuarioService } from './services/usuario.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule

  ],
  providers: [
    UsuarioService, DecimalPipe
  ]

})
export class CoreModule { }
