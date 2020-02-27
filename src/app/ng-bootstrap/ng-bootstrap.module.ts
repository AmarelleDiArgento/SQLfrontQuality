import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbCollapseModule, NgbModule, NgbPaginationModule, NgbTypeaheadModule, NgbDatepickerModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './directives/sortable.directive';
import { CalendarioComponent } from './components/calendario/calendario.component';


@NgModule({
  declarations: [
    NgbdSortableHeader,
    CalendarioComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    NgbCollapseModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    NgbPopoverModule
  ],
  exports: [
    CalendarioComponent,
    NgbCollapseModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    NgbPopoverModule
  ]
})
export class NgBootstrapModule { }
