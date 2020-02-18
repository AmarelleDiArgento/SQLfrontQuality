import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { UsuarioService } from './services/usuario.service';
import { ProcesosDetalleService } from './services/procesodetalle.service';
import { ProcesoService } from './services/proceso.service';
import { DesplegableService } from './services/desplegable.service';
import { DataService } from './services/data.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule

  ],
  providers: [
    UsuarioService,
    DecimalPipe,
    ProcesosDetalleService,
    ProcesoService,
    DesplegableService,
    DataService
  ]

})
export class CoreModule { }
