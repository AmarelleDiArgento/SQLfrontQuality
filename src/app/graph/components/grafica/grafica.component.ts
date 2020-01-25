import { Component, OnInit, Input } from '@angular/core';
import { Grafica } from '../../interfaces/grafica';
import { Chart } from "chart.js";
import { isUndefined } from 'util';

@Component({
  selector: 'app-grafica',
  styleUrls: ['./grafica.component.scss'],
  templateUrl: 'grafica.component.html',
})

// /grafica.component.html
export class GraficaComponent implements OnInit {



  public lineal: any = null;
  private escala;

  @Input() dataGraf: Grafica;

  public element: HTMLElement;
  constructor() {

    console.log('Hola :D', this.dataGraf);
  }

  ngAfterViewInit() {

    this.element = document.getElementById(this.dataGraf.item) as HTMLElement;
    this.genGrafLineal(this.element)
  }
  ngOnInit() {

    this.escala = {
      gridLines: {
        lineWidth: 2
      },
      angleLines: {
        display: false
      },
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 100,
        stepSize: 20
      },
      pointLabels: {
        fontSize: 18
      }
    }
    // scale: (this.dataGraf.tipo === 'radar') ? this.escala : {}
  }

  genGrafLineal(elemento: HTMLElement) {

    var dataset = this.dataSet()
    this.lineal = new Chart(this.element, {
      type: this.ajuste(this.dataGraf.tipo, this.dataGraf.labels.length),
      data: {
        labels: this.recortar(this.dataGraf.labels),
        datasets: dataset
      },
      options: {
        maintainAspectRatio: false,
        resposive: false,

        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },

      }
    });
    console.log(this.lineal);

  }

  dataSet(): any[] {
    var dataset = []
    console.log(this.dataGraf.series.length);

    for (let i = 0; i < this.dataGraf.series.length; i++) {

      dataset.push({
        label: this.dataGraf.series[i], // Name the series
        data: this.dataGraf.data[i], // Specify the data values array
        fill: this.dataGraf.relleno,
        borderColor: this.dataGraf.border[i], // Add custom color border (Line)
        backgroundColor: this.dataGraf.background[i], // Add custom color background (Points and Fill)
        borderWidth: 1 // Specify bar border width
      })
    }
    console.log('dataset: ', dataset);

    return dataset
  }

  recortar(labesl: string[]) {
    return labesl.map(l => { return l.substr(0, 10) + '...' })
  }

  ajuste(tipo: string, conteo: number) {
    if (tipo === 'radar' && conteo < 3) {
      return (conteo === 1) ? 'doughnut' : 'bar';
    } else {
      return tipo;
    }
  }


  backgroundRow(data: any) {
    // console.log(data);
    // console.log('Menor que 60: ', data <= 0.60);
    // console.log('Entre 60 y 85: ', data > 60 && data <= 85);
    // console.log('Mayor que 85: ', data > 85);

    switch (true) {
      case data <= 75:
        return 'danger'
      case data > 75 && data <= 85:
        return 'warning'
      case data > 85:
        return 'success'
      default:
        return 'light'
    }
  }

}
