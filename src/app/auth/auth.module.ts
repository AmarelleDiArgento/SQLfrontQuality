import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { NgBootstrapModule } from '../ng-bootstrap/ng-bootstrap.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import {NgxWebstorageModule} from 'ngx-webstorage';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapModule,
    NgxWebstorageModule.forRoot(),
  ]
})
export class AuthModule { }
