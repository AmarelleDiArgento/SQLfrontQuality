import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgBootstrapModule } from './ng-bootstrap/ng-bootstrap.module';

import * as Sentry from '@sentry/browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

Sentry.init({
  dsn: 'https://bba870058386450eaf2e64f49e99d91c@sentry.io/4628152'
});

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    PageNotFoundComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    NgBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
