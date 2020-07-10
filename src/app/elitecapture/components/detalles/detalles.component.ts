import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { GraficaInfo } from '@shared/interfaces/grafica-info';
import { DataService } from '@core/services/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Grafica } from 'app/graph/interfaces/grafica';
import { isNull, isUndefined, log } from 'util';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {

  }



  public Graf$: Observable<GraficaInfo[]>;


  det: number;
  loc: string;

  public datFiltro;
  public Origen;

  public backgroundColor = [
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(255, 159, 64, 0.6)"
  ];
  public borderColor = [
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(255, 159, 64, 1)"
  ];

  public grafGen: Grafica;
  public grafSuper: Grafica;

  public graficas: Grafica[];

  public supervisores: string[];

  public labels = [];
  public datas = [];
  public full = [];

  // var form
  selector: FormGroup;
  tipoDeSeleccion: string = '';
  constructor(
    private data: DataService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,

  ) {

    this.capturarParametros();
    this.validar();
    this.cargarOrigen(this.det);

    // Formulario de supervisores
    if (this.isCultivo()) {
      this.tipoDeSeleccion = (this.loc == 'C') ? 'Supervisores' : 'Productos'
      this.selector = this.formBuilder.group({
        supervisor: ['Todos', [Validators.required]]
      });
    }

  }

  validar() {
    if (this.data.graph$ !== null) {
      this.Graf$ = this.data.graph$;
    } else {
      this.data.cargar(this.loc, [], null, null);
      this.Graf$ = this.data.graph$;
    }
  }
  cargarOrigen(id) {

    this.data.graph$.subscribe(grafs => {
      this.Origen = grafs[id];

    });
  }

  capturarParametros() {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.loc = params.loc;
      this.det = params.id;
      // console.log(params);

      this.grafGen = JSON.parse(localStorage.getItem("G" + this.loc + "-" + this.det)) as Grafica;
      this.graficas = JSON.parse(localStorage.getItem(this.loc + "-" + this.det)) as Grafica[];


    });
  }

  isCultivo = () => this.loc === 'C' || this.loc === 'S' || this.loc === 'M';


  todos = (v) => (v === 'Todos') ? null : v;

  ngOnInit() {
    this.generarGraficaGlobal();

    if (this.isCultivo()) {
      this.selector.valueChanges.subscribe(s => {
        // console.log(s.supervisor);
        this.data.DataCultivo(
          this.data.Filtro(
            this.datFiltro,
            this.todos(s.supervisor),
            this.Origen.origen
          )
        );
        this.validar();
        this.cargarOrigen(0);
        this.generarGraficaGlobal();
      });
    }
  }




  generarGraficaGlobal() {
    let datos = this.optenerLabels(this.Origen.procesos, 'proceso');

    if (this.isCultivo()) {
      // console.log('Soy cultivo');

      this.datFiltro = this.data.Filtro(this.data.dat, null, this.Origen.origen);
      this.supervisores = this.data.Unicos(this.datFiltro, null, this.Origen.origen);
      var dataSuper = this.data.resultado(this.datFiltro, 'Supervisor');
      this.generarGraficaSupervisor(dataSuper);
    }

    //  =
    this.grafGen = {
      tipo: 'radar',
      relleno: true,
      titulo: this.Origen.origen,
      item: 'general',
      labels: datos[0],
      full: this.full[0],
      series: ['cumplimiento'],
      data: [datos[1]],
      background: this.backgroundColor,
      border: this.borderColor,
    };
    localStorage.setItem("G" + this.loc + "-" + this.det, JSON.stringify(this.grafGen));
    this.generarGraficas(this.Origen.procesos);
  }

  generarGraficaSupervisor(data) {
    let datos = this.optenerLabels(data, 'Supervisor');

    this.grafSuper = {
      tipo: 'radar',
      relleno: true,
      titulo: this.tipoDeSeleccion,
      item: 'sup',
      labels: datos[0],
      full: this.full[0],
      series: ['cumplimiento'],
      data: [datos[1]],
      background: this.backgroundColor,
      border: this.borderColor,
    };
  }

  optenerLabels(datos, name): any[] {

    let labels = [];
    let datas = [];
    let full = [];
    for (const p of datos) {
      // console.log(p);
      if (!isNaN(p.cumplimiento) && !isNull(p.cumplimiento) && !isUndefined(p.cumplimiento)) {

        labels.push(p[name]);
        let porc = (p.cumplimiento * 100).toFixed(1);
        datas.push(porc);
        full.push(isUndefined(p.items) ? '' : p.items[0].item);
      }
    }
    //// console.log('label', labels, 'datas', datas, 'full', full);

    return [labels, datas, full];


  }

  generarGraficas(datos) {
    // console.log(datos);

    let gr = [];
    let id = 0;
    if (this.isCultivo()) {
      gr.push(this.grafSuper);
    }
    gr.push(this.grafGen);
    for (const p of datos) {

      let item = 'graf' + id++;

      // console.log(p.shorts);
      let etiquetas = this.optenerLabels(p.shorts, 'short');
      let g = {
        tipo: 'radar',
        relleno: true,
        titulo: p.proceso,
        item: item,
        labels: etiquetas[0],
        full: etiquetas[2],
        series: ['cumplimiento'],
        data: [etiquetas[1]],
        background: this.backgroundColor,
        border: this.borderColor
      };
      // console.log(g);
      gr.push(g);

    }
    localStorage.setItem(this.loc + "-" + this.det, JSON.stringify(gr));
    this.graficas = gr;

  }

  //Data Random
  dataRandom(lim): number[] {
    let data = [];
    for (let i = 0; i < lim; i++) {
      data.push((Math.random() * 100).toFixed(1));
    }
    return data;
  }

}
