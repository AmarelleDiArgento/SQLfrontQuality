import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphModule } from '../graph/graph.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DetallesComponent } from './components/detalles/detalles.component';
import { NgBootstrapModule } from '../ng-bootstrap/ng-bootstrap.module';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    HomeComponent,
    DetallesComponent,
    DragDropComponent
  ],
  imports: [
    DragDropModule,
    NgbTabsetModule,
    CommonModule,
    HomeRoutingModule,
    GraphModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapModule
  ]
})
export class HomeModule { }
