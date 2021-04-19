import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgBootstrapModule } from '../ng-bootstrap/ng-bootstrap.module';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { SafePipe } from './pipes/safe.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HighlighttextDirective } from './directives/highlighttext.directive';
import { AutocompletadoComponent } from './components/autocompletado/autocompletado.component';



@NgModule({
  declarations: [
    NavbarComponent,
    UploadFileComponent,
    SafePipe,
    HighlighttextDirective,
    AutocompletadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgBootstrapModule
  ], exports: [
    SafePipe,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    NgBootstrapModule,
    UploadFileComponent,
    HighlighttextDirective,
    AutocompletadoComponent
  ]
})
export class SharedModule { }
