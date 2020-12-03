import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CapturadorService } from '@core/services/capturador.service';
import { CalendarioService } from '@core/services/calendario.service';
import { SwalModalService } from '@core/services/swal-modal.service';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader, SortEvent } from '@ngbtsp/directives/sortable.directive';
import { FormBorrable } from '@shared/interfaces/formularios';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestion-error',
  templateUrl: './gestion-error.component.html',
  styleUrls: ['./gestion-error.component.scss']
})
export class GestionErrorComponent implements OnInit {

  forms$: Observable<FormBorrable[]>;
  total$: Observable<number>;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  data = false;

  page = 1;

  
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  
  constructor(
    public captServ: CapturadorService,
    private sw: SwalModalService,
    
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    public calendarioServ: CalendarioService

  ) {
    
    this.fromDate = calendar.getNext(calendar.getToday(), 'd', 0);
    this.toDate = calendar.getToday();

    this.forms$ = captServ.forms$;
    this.total$ = captServ.total$;
  }

  ngOnInit() {

  }

  onSort({ column, direction }: SortEvent) {
    // console.log('click');
    
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.captServ.sortColumn = column;
    this.captServ.sortDirection = direction;
  }

  // eliminarUsuario(id: string) {
  //   this.captServ.eliminar(id)
  //     .subscribe(data => {
  //       // console.log(data);
  //       let val = this.sw.modal(data)
  //       if (val) {
  //         // console.log('Cargue');

  //         // this.()
  //       }
  //     })

  // }

  recargar(supervisor: string, finca: string) {
    // // console.log('Recargando... ');

    // this.data.cargar(this.loc, this.returnDateRange(), supervisor, finca)
    // this.Graf$ = this.data.graph$
    // this.informes$ = this.data.post$
  }


  small = () => {
    return (this.formatter.format(this.toDate) !== "") ?
      'Del ' + this.formatter.format(this.fromDate) + ' al ' + this.formatter.format(this.toDate) :
      'El ' + this.formatter.format(this.fromDate)
  };

  onDateSelection(date: NgbDate) {

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    // console.log(this.returnDateRange());
    this.recargar(null, null)

  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  returnDateRange(): any[] {

    return [
      {
        ... this.fromDate,
        formatoSql: this.formatter.format(this.fromDate)
      },
      {
        ... (this.toDate !== null) ? this.toDate : this.fromDate,
        formatoSql: this.formatter.format((this.toDate !== null) ? this.toDate : this.fromDate)
      }
    ];
  }


}
