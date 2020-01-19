import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficaComponent } from './components/grafica/grafica.component';

@NgModule({
  declarations: [
    GraficaComponent
  ],
  imports: [
    CommonModule
  ], exports: [
    GraficaComponent
  ]
})
export class GraphModule { }
