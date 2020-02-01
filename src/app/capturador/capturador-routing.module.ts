import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormulariosComponent } from './components/formularios/formularios.component';
import { CapturadorComponent } from './components/capturador/capturador.component';


const routes: Routes = [{
  path: '',
  component: FormulariosComponent
}, {
  path: ':id',
  component: CapturadorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapturadorRoutingModule { }
