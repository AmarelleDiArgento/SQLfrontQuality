import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecetarioComponent } from './components/recetario/recetario.component';
import { EditarRecetaComponent } from './components/editar-receta/editar-receta.component';
import { RecetaComponent } from './components/receta/receta.component';


const routes: Routes = [
  {
    path: '',
    component: RecetarioComponent
  },
  {
    path: 'editar/:descripcion',
    component: EditarRecetaComponent
  },
  {
    path: 'receta/:descripcion',
    component: RecetaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecetarioRoutingModule { }
