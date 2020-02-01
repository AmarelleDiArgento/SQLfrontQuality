import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgBootstrapModule } from '../ng-bootstrap/ng-bootstrap.module';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgBootstrapModule
  ], exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
