import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficaComponent } from './components/grafica/grafica.component';
import { NgBootstrapModule } from '../ng-bootstrap/ng-bootstrap.module';

@NgModule({
  declarations: [
    GraficaComponent
  ],
  imports: [
    CommonModule,
    NgBootstrapModule
  ], exports: [
    GraficaComponent  
  ]
})
export class GraphModule { }
