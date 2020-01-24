import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbCollapseModule, NgbCollapse, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    NgbCollapseModule
  ],
  exports: [
    NgbCollapseModule
  ]
})
export class NgBootstrapModule { }
