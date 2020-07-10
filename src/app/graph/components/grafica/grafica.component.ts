import { Component, OnInit, Input } from '@angular/core';
import { Grafica } from '../../interfaces/grafica';
import { Chart } from 'chart.js';
import { isUndefined } from 'util';

@Component({
  selector: 'app-grafica',
  styleUrls: ['./grafica.component.scss'],
  templateUrl: 'grafica.component.html',
})

// /grafica.component.html
export class GraficaComponent implements OnInit {



  public lineal: any = null;
  private options;
  private tipo;

  @Input() dataGraf: Grafica;

  public element: HTMLElement;
  constructor() {

    // console.log('Hola :D', this.dataGraf);
  }

  ngAfterViewInit() {

    this.element = document.getElementById(this.dataGraf.item) as HTMLElement;
    this.genGrafLineal();
  }
  ngOnInit() {

    //  (this.dataGraf.tipo === 'radar') ? this.escala : {}
  }

  genGrafLineal() {
    this.tipo = this.ajuste(this.dataGraf.tipo, this.dataGraf.labels.length);
    // console.log(this.tipo);
    // console.log((isUndefined(this.dataGraf.full)) ? '' : this.dataGraf.full[0][0]);


    let dataset = this.dataSet();
    this.lineal = new Chart(this.element, {
      type: this.tipo,
      data: {
        labels: this.recortar(this.dataGraf.labels),
        datasets: dataset
      },
      options: this.options
    });
    // console.log(this.lineal);

  }

  dataSet(): any[] {
    let dataset = [];
    // console.log(this.dataGraf.series.length);

    for (let i = 0; i < this.dataGraf.series.length; i++) {

      dataset.push({
        label: this.dataGraf.series[i], // Name the series
        data: (this.tipo === 'doughnut') ? [this.dataGraf.data[i][0], (100 - this.dataGraf.data[i][0])] : this.dataGraf.data[i], // Specify the data values array
        fill: this.dataGraf.relleno,
        borderColor: (this.tipo === 'doughnut') ? [this.dataGraf.border[i], '#6c757d'] : this.dataGraf.border[i], // Add custom color border (Line)
        backgroundColor: (this.tipo === 'doughnut') ? [this.dataGraf.background[i], '#6c757d80'] : this.dataGraf.background[i], // Add custom color background (Points and Fill)
        borderWidth: 1 // Specify bar border width
      });
    }
    // console.log(dataset);

    return dataset;
  }

  recortar(labesl: string[]) {
    return labesl.map(l => l.substr(0, 10) + '...');
  }

  ajuste(tipo: string, conteo: number) {
    if (tipo === 'radar' && conteo < 3) {

      if (conteo === 1) {
        this.options = {
          maintainAspectRatio: false,
          resposive: false,

          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        };


        return 'doughnut';


      } else {
        this.options = {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        };
        return 'bar';

      }
    } else {

      this.options = {
        maintainAspectRatio: false,
        resposive: false,

        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        scale: {
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
      };
      return tipo;
    }
  }


  backgroundRow(data: any) {
    // console.log(data);
    // console.log('Menor que 60: ', data <= 0.60);
    // console.log('Entre 60 y 85: ', data > 60 && data <= 85);
    // console.log('Mayor que 85: ', data > 85);

    switch (true) {
      case data <= 79:
        return 'danger';
      case data > 79 && data <= 89:
        return 'warning';
      case data > 89:
        return 'success';
      default:
        return 'light';
    }
  }

}



