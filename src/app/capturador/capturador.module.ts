import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapturadorRoutingModule } from './capturador-routing.module';
import { FormulariosComponent } from './components/formularios/formularios.component';
import { CapturadorComponent } from './components/capturador/capturador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapModule } from '../ng-bootstrap/ng-bootstrap.module';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { CampoComponent } from './components/campo/campo.component';
import { GestionErrorComponent } from './components/gestion-error/gestion-error.component';


@NgModule({
  declarations: [
    FormulariosComponent,
    CapturadorComponent,
    EncabezadoComponent,
    PreguntaComponent,
    CampoComponent,
    GestionErrorComponent
  ],
  imports: [
    CommonModule,
    CapturadorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapModule
  ]
})
export class CapturadorModule { }
