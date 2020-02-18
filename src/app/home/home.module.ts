import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { GraphModule } from '../graph/graph.module';
import { HomeRoutingModule } from './home-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgBootstrapModule } from '../ng-bootstrap/ng-bootstrap.module';

import { HomeComponent } from './components/home/home.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { AuditoriaComponent } from './components/auditoria/auditoria.component';
import { SharedModule } from '../shared/shared.module';
import { InformeComponent } from './components/informe/informe.component';
import { LaunchingComponent } from './components/launching/launching.component';


@NgModule({
  declarations: [
    HomeComponent,
    DetallesComponent,
    DragDropComponent,
    AuditoriaComponent,
    InformeComponent,
    HomeComponent,
    LaunchingComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    DragDropModule,
    CommonModule,
    HomeRoutingModule,
    GraphModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapModule
  ]
})
export class HomeModule { }
