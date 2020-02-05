import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearDesplegableComponent } from './components/crear-desplegable/crear-desplegable.component';
import { EditarDesplegableComponent } from './components/editar-desplegable/editar-desplegable.component';
import { ListarDesplegableComponent } from './components/listar-desplegable/listar-desplegable.component';

const routes: Routes = [
  {
    path: 'nuevo',
    component: CrearDesplegableComponent
  },
  {
    path: 'filtro/:id',
    component: EditarDesplegableComponent
  },
  {
    path: '',
    component: ListarDesplegableComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesplegableRoutingModule { }
