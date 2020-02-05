import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarprocesoComponent } from './components/proceso/listar-proceso/listar-proceso.component';
import { EditarProcesoComponent } from './components/proceso/editar-proceso/editar-proceso.component';
import { NuevoProcesoComponent } from './components/proceso/nuevo-proceso/nuevo-proceso.component';
import { NuevoProcesosdetalleComponent } from './components/proceso-detalle/nuevo-proceso-detalle/nuevo-proceso-detalle.component';
import { ListarProcesosDetalleComponent } from './components/proceso-detalle/listar-proceso-detalle/listar-proceso-detalle.component';
import { EditarProcesoDetalleComponent } from './components/proceso-detalle/editar-proceso-detalle/editar-proceso-detalle.component';

const routes: Routes = [
    {
        path: '',
        component: ListarprocesoComponent
    }, {
        path: 'proupd/:id',
        component: EditarProcesoComponent
    }, {
        path: 'nuevo',
        component: NuevoProcesoComponent
    }

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcesoRoutingModule { }
