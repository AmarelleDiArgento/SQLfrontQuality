import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapturadorRoutingModule } from './capturador-routing.module';
import { FormulariosComponent } from './components/formularios/formularios.component';
import { CapturadorComponent } from './components/capturador/capturador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapModule } from '../ng-bootstrap/ng-bootstrap.module';


@NgModule({
  declarations: [
    FormulariosComponent,
    CapturadorComponent
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
