import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecetarioRoutingModule } from './recetario-routing.module';
import { RecetarioComponent } from './components/recetario/recetario.component';
import { RecetaComponent } from './components/receta/receta.component';
import { NgBootstrapModule } from '@ngbtsp/ng-bootstrap.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditarRecetaComponent } from './components/editar-receta/editar-receta.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [RecetarioComponent, RecetaComponent, EditarRecetaComponent],
  imports: [
    CoreModule,
    SharedModule,
    CommonModule,
    RecetarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapModule
  ]
})
export class RecetarioModule { }
