import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CalendarioService } from 'src/app/core/services/calendario.service';
import { Observable } from 'rxjs';
import { NgbCalendar, NgbDateParserFormatter, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.scss']
})
export class AuditoriaComponent {

  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  calendario$: Observable<any[]>

  constructor(
    public calendarioServ: CalendarioService,
    public cd: ChangeDetectorRef,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
  ) {
    this.fromDate = calendar.getNext(calendar.getToday(), 'd', -5);
    this.toDate = calendar.getToday();
  }

  small = () => {
    return (this.formatter.format(this.toDate) !== "") ?
      'Del ' + this.formatter.format(this.toDate) + ' al ' + this.formatter.format(this.toDate) :
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
    console.log(this.returnDateRange());


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
        ... this.toDate,
        formatoSql: this.formatter.format(this.toDate)
      }
    ];
  }
}