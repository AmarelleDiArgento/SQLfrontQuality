import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { GraphModule } from '../graph/graph.module';
import { HomeRoutingModule } from './home-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgBootstrapModule } from '../ng-bootstrap/ng-bootstrap.module';

import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    DragDropComponent,
    MainComponent,
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
