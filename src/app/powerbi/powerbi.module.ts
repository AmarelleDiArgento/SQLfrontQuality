import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerbiRoutingModule } from './powerbi-routing.module';
import { CalidadComponent } from './components/calidad/calidad.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapModule } from '@ngbtsp/ng-bootstrap.module';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [CalidadComponent],
  imports: [
    CommonModule,
    SharedModule,

    PowerbiRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapModule
    
  ]
})
export class PowerbiModule { }
