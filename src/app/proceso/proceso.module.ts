import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcesoRoutingModule } from './proceso-routing.module';

import { EditarProcesoComponent } from './components/proceso/editar-proceso/editar-proceso.component';
import { NuevoProcesoComponent } from './components/proceso/nuevo-proceso/nuevo-proceso.component';
import { ListarProcesoComponent } from './components/proceso/listar-proceso/listar-proceso.component';
import { NuevoProcesoDetalleComponent } from './components/proceso-detalle/nuevo-proceso-detalle/nuevo-proceso-detalle.component';
import { EditarProcesoDetalleComponent } from './components/proceso-detalle/editar-proceso-detalle/editar-proceso-detalle.component';
import { ListarProcesoDetalleComponent } from './components/proceso-detalle/listar-proceso-detalle/listar-proceso-detalle.component';
import { NuevoDesplegableComponent } from './components/desplegable/nuevo-desplegable/nuevo-desplegable.component';
import { EditarDesplegableComponent } from './components/desplegable/editar-desplegable/editar-desplegable.component';
import { ListarDesplegableComponent } from './components/desplegable/listar-desplegable/listar-desplegable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditarProcesoComponent,
    NuevoProcesoComponent,
    ListarProcesoComponent,
    NuevoProcesoDetalleComponent,
    EditarProcesoDetalleComponent,
    ListarProcesoDetalleComponent,
    NuevoDesplegableComponent,
    EditarDesplegableComponent,
    ListarDesplegableComponent
  ],
  imports: [
    CommonModule,
    ProcesoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProcesoModule { }
