import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarProcesoComponent } from './components/proceso/listar-proceso/listar-proceso.component';
import { EditarProcesoComponent } from './components/proceso/editar-proceso/editar-proceso.component';
import { NuevoProcesoComponent } from './components/proceso/nuevo-proceso/nuevo-proceso.component';



const routes: Routes = [

    {
        path: '',
        component: ListarProcesoComponent
    }, {
        path: ':id',
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