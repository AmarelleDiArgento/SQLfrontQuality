import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElitecaptureRoutingModule } from './elitecapture-routing.module';

import { AuditoriaComponent } from './components/auditoria/auditoria.component';
import { CaptureComponent } from './components/capture/capture.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { InformeComponent } from './components/informe/informe.component';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { GraphModule } from 'app/graph/graph.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapModule } from '@ngbtsp/ng-bootstrap.module';



@NgModule({
  declarations: [
    CaptureComponent,
    DetallesComponent,
    AuditoriaComponent,
    InformeComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    CommonModule,
    ElitecaptureRoutingModule,
    GraphModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapModule
  ]
})
export class ElitecaptureModule { }
