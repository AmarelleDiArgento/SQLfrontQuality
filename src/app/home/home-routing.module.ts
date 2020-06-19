import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { MainComponent } from './components/main/main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'drag',
    component: DragDropComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
