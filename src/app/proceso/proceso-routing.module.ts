import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarProcesoComponent } from './components/proceso/listar-proceso/listar-proceso.component';
import { EditarProcesoComponent } from './components/proceso/editar-proceso/editar-proceso.component';
import { NuevoProcesoComponent } from './components/proceso/nuevo-proceso/nuevo-proceso.component';
import { NuevoDesplegableComponent } from './components/desplegable/nuevo-desplegable/nuevo-desplegable.component';
import { EditarDesplegableComponent } from './components/desplegable/editar-desplegable/editar-desplegable.component';
import { ListarDesplegableComponent } from './components/desplegable/listar-desplegable/listar-desplegable.component';



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
    }, {
        path: 'desplegable/nuevo',
        component: NuevoDesplegableComponent
    }, {
        path: 'desplegable/:id',
        component: EditarDesplegableComponent
    }, {
        path: 'desplegable',
        component: ListarDesplegableComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcesoRoutingModule { }