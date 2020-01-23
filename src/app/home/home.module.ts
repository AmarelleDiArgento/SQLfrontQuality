import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphModule } from '../graph/graph.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DetallesComponent } from './components/detalles/detalles.component';


@NgModule({
  declarations: [
    HomeComponent,
    DetallesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    GraphModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
