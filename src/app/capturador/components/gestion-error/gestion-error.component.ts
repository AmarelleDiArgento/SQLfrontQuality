import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { CapturadorService } from "@core/services/capturador.service";
import { CalendarioService } from "@core/services/calendario.service";
import Swal from "sweetalert2";

export interface SweetAlertResult<T = any> {
  readonly dismiss?: Swal.DismissReason;
  readonly isConfirmed: boolean;
  readonly isDismissed: boolean;
  readonly value?: T;
}

import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import {
  NgbdSortableHeader,
  SortEvent,
} from "@ngbtsp/directives/sortable.directive";
import { FormBorrable } from "@shared/interfaces/formularios";
import { Observable } from "rxjs";

@Component({
  selector: "app-gestion-error",
  templateUrl: "./gestion-error.component.html",
  styleUrls: ["./gestion-error.component.scss"],
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
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    public calendarioServ: CalendarioService
  ) {
    this.fromDate = calendar.getNext(calendar.getToday(), "d", 0);
    this.toDate = calendar.getToday();

    this.forms$ = captServ.forms$;
    this.total$ = captServ.total$;
  }

  ngOnInit() {}

  eliminar(unico: FormBorrable, formularios: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Estas segur@?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, borralo!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          console.log(unico);

          this.eliminarFormulario(unico, swalWithBootstrapButtons);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelado!",
            "tu formulario esta a salvo! :)",
            "error"
          );
        }
      });
  }

  AjustarEncabezado(e: string): [{ llave: string; valor: string }] {
    return JSON.parse(e);
  }

  onSort({ column, direction }: SortEvent) {
    // console.log('click');

    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

    this.captServ.sortColumn = column;
    this.captServ.sortDirection = direction;
  }

  eliminarFormulario(unico: FormBorrable, swalWithBootstrapButtons: any) {
    console.log(unico);

    this.captServ.eliminar(unico).subscribe((data) => {
      console.log(data);

      swalWithBootstrapButtons.fire(
        "¡Eliminado!",
        "Formulario eliminado.",
        "success"
      );
    });
  }

  recargar() {
    console.log("Recargando... ");

    this.captServ.tabla(this.returnDateRange());
    this.forms$ = this.captServ.forms$;
    this.total$ = this.captServ.total$;
  }

  small = () => {
    return this.formatter.format(this.toDate) !== ""
      ? "Del " +
          this.formatter.format(this.fromDate) +
          " al " +
          this.formatter.format(this.toDate)
      : "El " + this.formatter.format(this.fromDate);
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
    this.recargar();
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      date.equals(this.toDate) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }

  returnDateRange(): any[] {
    return [
      {
        ...this.fromDate,
        formatoSql: this.formatter.format(this.fromDate),
      },
      {
        ...(this.toDate !== null ? this.toDate : this.fromDate),
        formatoSql: this.formatter.format(
          this.toDate !== null ? this.toDate : this.fromDate
        ),
      },
    ];
  }
}
