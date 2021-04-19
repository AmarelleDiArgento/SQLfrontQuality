import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { UsuarioService } from './services/usuario.service';
import { ProcesosDetalleService } from './services/procesodetalle.service';
import { ProcesoService } from './services/proceso.service';
import { DesplegableService } from './services/desplegable.service';
import { DataService } from './services/data.service';
import { SwalModalService } from './services/swal-modal.service';
import { CryptoService } from './services/crypto.service';



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
    DataService,
    SwalModalService,
    CryptoService
  ]

})
export class CoreModule { }
