import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { GraficaInfo, Procesos, Shorts, Items } from 'src/app/shared/interfaces/grafica-info';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbCalendar, NgbDateParserFormatter, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CalendarioService } from 'src/app/core/services/calendario.service';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.scss']
})
export class InformeComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
  }

  public cambioPoscto: FormGroup;

  public Graf$: Observable<GraficaInfo[]>;


  public informes$: Observable<any[]>;


  public activo: number = 3;



  public Origen
  public loc;


  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;



  constructor(
    private formBuilder: FormBuilder,
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    public calendarioServ: CalendarioService
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      // console.log(params);
      this.loc = params.loc
      this.titulo(this.loc);

      this.fromDate = calendar.getNext(calendar.getToday(), 'd', (this.loc == 'C') ? -6 : 0);
      this.toDate = calendar.getToday();

      this.data.cargar(this.loc, this.returnDateRange())
      this.Graf$ = this.data.graph$
      this.informes$ = this.data.post$

      this.cambioPoscto = this.formBuilder.group({
        seleccionado: [3, Validators.required]
      });

    })
  }

  recargar() {
console.log('Recargando... ');

    this.data.cargar(this.loc, this.returnDateRange())
    this.Graf$ = this.data.graph$
    this.informes$ = this.data.post$
  }

  titulo(origen: string) {
    console.log(origen);
    
    switch (origen) {
      case 'C':
        this.Origen = "CULTIVO"
        break;
      case 'P':
        this.Origen = "POSTCOSECHA"
        break;
      case 'B':
        this.Origen = "BOUQUETERA"
        this.router.navigate(['/home/construccion'])
        break;

      default:
        break;
    }
  }
  ngOnInit() {
    // console.log(this.Graf$);



  }

  onSubmit() {
    // console.log(this.cambioPoscto.value);
    this.activo = this.cambioPoscto.get('seleccionado').value;
    // console.log(this.Graf$);
    this.ngOnInit()
  }

  generarGrafica() {
  }




  //Data Random
  dataRandom(lim): number[] {
    let data = [];
    for (let i = 0; i < lim; i++) {
      data.push((Math.random() * 100).toFixed(1));
    }
    return data;
  }


  backgroundRow(data: any) {

    // // console.log(data);
    // // console.log('Menor que 75: ', data <= 75);
    // // console.log('Entre 75 y 85: ', data > 75 && data <= 85);
    // // console.log('Mayor que 85: ', data > 85);
    switch (true) {
      case data <= 0.79:
        return 'danger'
      case data > 0.79 && data <= 0.89:
        return 'warning'
      case data > 0.89:
        return 'success'
      default:
        return 'light'

    }
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
    this.recargar()

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

