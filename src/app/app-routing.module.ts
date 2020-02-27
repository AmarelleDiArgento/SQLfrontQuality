import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './shared/Guards/auth.guard';



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
      },
      {
        path: 'capturador',
        loadChildren: () => import('./capturador/capturador.module').then(c => c.CapturadorModule)
      },
      {
        path: 'labels',
        loadChildren: () => import('./label/label.module').then(l => l.LabelModule)
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(a => a.AuthModule)
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
