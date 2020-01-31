import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesplegableRoutingModule } from './desplegable-routing.module';
import { CrearDesplegableComponent } from './components/crear-desplegable/crear-desplegable.component';
import { EditarDesplegableComponent } from './components/editar-desplegable/editar-desplegable.component';
import { ListarDesplegableComponent } from './components/listar-desplegable/listar-desplegable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapModule } from '../ng-bootstrap/ng-bootstrap.module';


@NgModule({
  declarations: [
    CrearDesplegableComponent,
    EditarDesplegableComponent,
    ListarDesplegableComponent],
  imports: [
    CommonModule,
    DesplegableRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapModule
  ]
})
export class DesplegableModule { }
