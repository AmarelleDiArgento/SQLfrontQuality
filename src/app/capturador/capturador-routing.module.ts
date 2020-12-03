import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormulariosComponent } from './components/formularios/formularios.component';
import { CapturadorComponent } from './components/capturador/capturador.component';
import { GestionErrorComponent } from './components/gestion-error/gestion-error.component';


const routes: Routes = [{
  path: '',
  component: FormulariosComponent
}, {
  path: 'editor/:id',
  component: CapturadorComponent
}, {
  path: 'gestionerrores',
  component: GestionErrorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapturadorRoutingModule { }
