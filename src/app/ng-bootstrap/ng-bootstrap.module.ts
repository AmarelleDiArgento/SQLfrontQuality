import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgbCollapseModule,
  NgbModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
  NgbDatepickerModule,
  NgbPopoverModule,
  NgbProgressbarModule,
  NgbTooltipModule,
  NgbDropdownModule,
  NgbAccordionModule,

} from '@ng-bootstrap/ng-bootstrap';
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
    NgbPopoverModule,
    NgbProgressbarModule,
    NgbAccordionModule,
    NgbTooltipModule,
    NgbDropdownModule

  ],
  exports: [
    NgbCollapseModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    NgbPopoverModule,
    NgbAccordionModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    NgbDropdownModule
  ]
})
export class NgBootstrapModule { }
