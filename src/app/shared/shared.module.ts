import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgBootstrapModule } from '../ng-bootstrap/ng-bootstrap.module';
import { UploadFileComponent } from './components/upload-file/upload-file.component';



@NgModule({
  declarations: [
    NavbarComponent,
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgBootstrapModule
  ], exports: [
    NavbarComponent,
    NgBootstrapModule,
    UploadFileComponent
  ]
})
export class SharedModule { }
