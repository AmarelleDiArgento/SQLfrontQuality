import { Component, OnInit, Input } from '@angular/core';
import { Grafica } from '../../interfaces/grafica';
import { Chart } from "chart.js";
import { isUndefined } from 'util';

@Component({
  selector: 'app-grafica',
  styleUrls: ['./grafica.component.scss'],
  templateUrl: '/grafica.component.html',
})
export class GraficaComponent implements OnInit {

  public lineal: any = null;
  public valido: boolean = false;
  @Input() dataGraf: Grafica;

  public element: HTMLElement;
  constructor() { }

  ngAfterViewInit() {
    // console.log('Hola :D', this.dataGraf);

    if (!isUndefined(this.dataGraf.data)) {
      if (this.dataGraf.data.length > 0) {

        console.log(this.dataGraf.data.length);
        this.valido = true;
        this.element = document.getElementById(this.dataGraf.item) as HTMLElement;
        this.genGrafLineal(this.element)
        console.log(this.lineal);

      } else {
        this.valido = false;
        console.log('Data vacia...');
      }
    }

  }
  ngOnInit() {

  }

  genGrafLineal(elemento: HTMLElement) {

    var dataset = this.dataSet()
    console.log(dataset);


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
    // console.log(this.lineal);

  }

  dataSet(): any[] {
    var dataset = []
    // console.log(this.dataGraf.series.length);

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
    // console.log('dataset: ', dataset);

    return dataset
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
