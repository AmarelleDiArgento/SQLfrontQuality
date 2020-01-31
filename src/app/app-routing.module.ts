import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



const routes: Routes = [

  {

    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(h => h.HomeModule)
      },
      {
        path: 'usuario',
        loadChildren: () => import('./usuario/usuario.module').then(u => u.UsuarioModule)
      },
      {
        path: 'proceso',
        loadChildren: () => import('./proceso/proceso.module').then(p => p.ProcesoModule)
      },
      {
        path: 'desplegable',
        loadChildren: () => import('./desplegable/desplegable.module').then(d => d.DesplegableModule)
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
