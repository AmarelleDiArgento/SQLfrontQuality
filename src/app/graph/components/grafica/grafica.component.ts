import { Component, OnInit, Input } from '@angular/core';
import { Grafica } from '../../interfaces/grafica';
import { Chart } from "chart.js";

@Component({
  selector: 'app-grafica',
  styleUrls: ['./grafica.component.scss'],
  template: `<h5>${this.titulo}</h5>
  <canvas id="${this.subtitulo}" ></canvas>`,
})
export class GraficaComponent implements OnInit {

  public lineal: any = null;

  @Input() dataGraf: Grafica;

  public element: HTMLElement;
  constructor() { }

  ngAfterViewInit() {
    console.log('Hola :D', this.dataGraf);

    this.element = document.getElementById(this.dataGraf.item) as HTMLElement;
    this.genGrafLineal(this.element)
  }
  ngOnInit() {
  }

  genGrafLineal(elemento: HTMLElement) {

    var dataset = this.dataSet()
    this.lineal = new Chart(this.element, {
      type: this.dataGraf.tipo,
      data: {
        labels: this.dataGraf.labels,
        datasets: dataset
      },
      options: {
        maintainAspectRatio: false,
        resposive: true,

        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
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

}
