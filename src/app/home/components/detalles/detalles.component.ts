import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { GraficaPostco } from 'src/app/shared/interfaces/grafica-postco';
import { DataService } from 'src/app/core/services/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Grafica } from 'src/app/graph/interfaces/grafica';
import { isNull, isUndefined } from 'util';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {

  }

  postco: number;
  Postcosecha: GraficaPostco;
  Procesos: GraficaPostco[];

  public backgroundColor = [];
  public borderColor = [];

  public grafGen: Grafica;

  private graficas: Grafica[];

  public labels = [];
  public datas = [];


  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,

  ) {

    this.backgroundColor = [
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(255, 99, 132, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
      "rgba(255, 159, 64, 0.6)"
    ];

    this.borderColor = [
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(255, 99, 132, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
      "rgba(255, 159, 64, 1)"
    ];

    this.activatedRoute.params.subscribe((params: Params) => {
      this.postco = params.id
    })


  }

  ngOnInit() {

    this.Postcosecha = this.dataService.data(this.postco)
    console.log(this.Postcosecha);

    let datos = this.optenerLabels(this.Postcosecha.procesos, 'proceso')
    this.grafGen = {
      tipo: 'radar',
      relleno: true,
      titulo: this.Postcosecha.postcosecha,
      item: 'general',
      labels: datos[0],
      series: ['cumplimiento'],
      data: [datos[1]],
      background: this.backgroundColor,
      border: this.borderColor,
    }
    this.generarGraficas(this.Postcosecha.procesos)

  }

  optenerLabels(datos, name): any[] {
    let labels = []
    let datas = []
    for (const p of datos) {
      if (!isNaN(p.cumplimiento) && !isNull(p.cumplimiento) && !isUndefined(p.cumplimiento)) {

        labels.push(p[name]);
        let porc = (p.cumplimiento * 100).toFixed(1);
        datas.push(porc);
      }
    }
    console.log(labels, datas);

    return [labels, datas]

  }

  generarGraficas(datos) {
    console.log(datos);

    let gr = []
    let id = 0;
    for (const p of datos) {

      let item = 'graf' + id++;

      console.log(p.shorts);


      let etiquetas = this.optenerLabels(p.shorts, 'short')
      let g = {
        tipo: 'radar',
        relleno: true,
        titulo: p.proceso,
        item: item,
        labels: etiquetas[0],
        series: ['cumplimiento'],
        data: [etiquetas[1]],
        background: this.backgroundColor,
        border: this.borderColor
      }
      console.log(g);

      gr.push(g)

    }
    this.graficas = gr

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
