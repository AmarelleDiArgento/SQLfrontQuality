import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetallesComponent } from './components/detalles/detalles.component';
import { InformeComponent } from './components/informe/informe.component';
import { CaptureComponent } from './components/capture/capture.component';
import { AuditoriaComponent } from './components/auditoria/auditoria.component';

const routes: Routes = [

  {
    path: '',
    component: CaptureComponent
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
    path: 'auditoria',
    component: AuditoriaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElitecaptureRoutingModule { }
