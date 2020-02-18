import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbCollapseModule, NgbModule, NgbPaginationModule, NgbTypeaheadModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './directives/sortable.directive';
import { CalendarioComponent } from './components/calendario/calendario.component';


@NgModule({
  declarations: [
    NgbdSortableHeader,
    CalendarioComponent
  ],
  imports: [
    NgbModule,
    NgbCollapseModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDatepickerModule
  ],
  exports: [
    CalendarioComponent,
    NgbCollapseModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDatepickerModule
  ]
})
export class NgBootstrapModule { }
