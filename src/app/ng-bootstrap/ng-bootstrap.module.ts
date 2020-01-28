import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbCollapseModule, NgbModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './directives/sortable.directive';


@NgModule({
  declarations: [NgbdSortableHeader],
  imports: [
    NgbModule,
    NgbCollapseModule,
    NgbPaginationModule,
    NgbTypeaheadModule
  ],
  exports: [
    NgbCollapseModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
  ]
})
export class NgBootstrapModule { }
