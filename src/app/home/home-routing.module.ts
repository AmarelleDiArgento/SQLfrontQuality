import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetallesComponent } from './components/detalles/detalles.component';
import { InformeComponent } from './components/informe/informe.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { AuditoriaComponent } from './components/auditoria/auditoria.component';
import { HomeComponent } from './components/home/home.component';
import { LaunchingComponent } from './components/launching/launching.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'detalles/:loc',
    component: InformeComponent
  },
  {
    path: 'detalles/:loc/:id',
    component: DetallesComponent
  },
  {
    path: 'drag',
    component: DragDropComponent
  },
  {
    path: 'auditoria',
    component: AuditoriaComponent
  },
  {
    path: 'construccion',
    component: LaunchingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
