import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'detalles/:id',
    component: DetallesComponent
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
