import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerbiRoutingModule } from './powerbi-routing.module';
import { CalidadComponent } from './components/calidad/calidad.component';


@NgModule({
  declarations: [CalidadComponent],
  imports: [
    CommonModule,
    PowerbiRoutingModule
  ]
})
export class PowerbiModule { }
