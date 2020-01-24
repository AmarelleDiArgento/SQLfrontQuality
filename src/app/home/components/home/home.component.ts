import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Grafica } from 'src/app/graph/interfaces/grafica';
import { DataService } from 'src/app/core/services/data.service';
import { GraficaPostco, Procesos, Capitulos, Shorts, Items } from 'src/app/shared/interfaces/grafica-postco';
import { isNull, isUndefined } from 'util';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
  }

  public isCollapsed = false;

  public backgroundColor = [];
  public borderColor = [];
  public labels = [];
  public datas = [];

  public dataGraf;

  public postcosechas = [];

  public cambioPoscto: FormGroup;
  public activo: number = 3;

  public graflin: Grafica;

  public Graf: GraficaPostco[] = [];

  public postco


  constructor(
    private formBuilder: FormBuilder,
    private data: DataService,
  ) {

    this.optenerDataGraf()
    this.cambioPoscto = this.formBuilder.group({
      seleccionado: [3, Validators.required]
    });



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
  }

  ngOnInit() {

    this.graflin = {
      tipo: 'radar',
      relleno: true,
      titulo: 'General',
      item: 'gen',
      labels: this.labels,
      series: ['cumplimiento'],
      data: [this.datas],
      background: this.backgroundColor,
      border: this.borderColor
    }
    console.log(this.postcosechas);



  }


  optenerLabels(datos) {
    this.labels = []
    this.datas = []
    for (const p of datos) {
      if (!isNaN(p.cumplimiento) && !isNull(p.cumplimiento) && !isUndefined(p.cumplimiento)) {
        this.labels.push(p.proceso);
        let porc = (p.cumplimiento * 100).toFixed(1);
        this.datas.push(porc);
      }
    }
    console.log(this.labels, this.datas);

  }

  /**
   * Conexion a la base de datos:
   * Carga dataGraf
   * Empaqueta en DataPostco
   * Carga graficas 
   */

  optenerDataGraf() {
    this.data.todos()
      .subscribe(data => {
        this.dataGraf = data.rows
        this.DataPostco()
        console.log(this.dataGraf);

        this.postco = this.Graf[this.activo].postcosecha
        this.optenerLabels(this.Graf[this.activo].procesos)
      })
  }

  /**
   * Asgina poscosecha activa, precargada con el valor 0
   * Redirige a la funcion cargarGraficas()
   */
  onSubmit() {
    console.log(this.cambioPoscto.value);
    this.activo = this.cambioPoscto.get('seleccionado').value;

    this.postco = this.Graf[this.activo].postcosecha
    this.optenerLabels(this.Graf[this.activo].procesos)

    console.log(this.Graf);

    this.ngOnInit()
  }

  generarGrafica() {
  }

  /**
   * Estructurar json! inicio
   * this.Graf contiene la data agrupada general
   */

  DataPostco() {

    this.dataGraf.map(r => {
      let AgregoPostco = false;

      for (const i of this.Graf) {
        if (i.postcosecha === r.Postcosecha) {
          i.Si += r.Total_Si;
          i.No += r.Total_No;
          i.cumplimiento = i.Si / (i.No + i.Si)
          AgregoPostco = true;
          i.procesos = this.DataProceso(r, i.procesos);

        }
      }

      if (!AgregoPostco) {
        let gnew: GraficaPostco;
        let id = this.Graf.length
        this.postcosechas.push(r.Postcosecha)
        gnew = {
          id: id,
          postcosecha: r.Postcosecha,
          Si: r.Total_Si,
          No: r.Total_No,
          activo: true,
          cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
          procesos: [{
            id: 0,
            proceso: r.nombre_proceso,
            Si: r.Total_Si,
            No: r.Total_No,
            cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
            capitulos: [{
              id: 0,
              capitulo: r.Capitulo,
              Si: r.Total_Si,
              No: r.Total_No,
              cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
              shorts: [{
                id: 0,
                short: r.Short_Item,
                Si: r.Total_Si,
                No: r.Total_No,
                cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
                items: [{
                  id: 0,
                  item: r.item,
                  Si: r.Total_Si,
                  No: r.Total_No,
                  cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No))
                }]
              }]
            }]
          }]
        }
        this.Graf.push(gnew)
      }

    })
  }

  DataProceso(r, p: Procesos[]): Procesos[] {

    let AgregoProceso = false;
    for (let i = 0; i < p.length; i++) {

      if (p[i].proceso === r.nombre_proceso) {
        p[i].Si += r.Total_Si;
        p[i].No += r.Total_No;
        p[i].cumplimiento = p[i].Si / (p[i].No + p[i].Si)
        AgregoProceso = true;
        p[i].capitulos = this.DataCapitulo(r, p[i].capitulos)
      }
    }

    if (!AgregoProceso) {
      let pnew: Procesos;
      pnew = {
        id: 0,
        proceso: r.nombre_proceso,
        Si: r.Total_Si,
        No: r.Total_No,
        cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
        capitulos: [{
          id: 0,
          capitulo: r.Capitulo,
          Si: r.Total_Si,
          No: r.Total_No,
          cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
          shorts: [{
            id: 0,
            short: r.Short_Item,
            Si: r.Total_Si,
            No: r.Total_No,
            cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
            items: [{
              id: 0,
              item: r.item,
              Si: r.Total_Si,
              No: r.Total_No,
              cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No))
            }]
          }]
        }]
      }
      p.push(pnew)
    }
    return p
  }

  DataCapitulo(r, p: Capitulos[]): Capitulos[] {

    let AgregoCapitulo = false;
    for (let i = 0; i < p.length; i++) {
      if (p[i].capitulo === r.capitulo) {
        p[i].Si += r.Total_Si;
        p[i].No += r.Total_No;
        p[i].cumplimiento = p[i].Si / (p[i].No + p[i].Si)
        AgregoCapitulo = true;
        p[i].shorts = this.DataShorts(r, p[i].shorts)
      }
    }

    if (!AgregoCapitulo) {
      let cnew: Capitulos;
      cnew = {
        id: 0,
        capitulo: r.Capitulo,
        Si: r.Total_Si,
        No: r.Total_No,
        cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
        shorts: [{
          id: 0,
          short: r.Short_Item,
          Si: r.Total_Si,
          No: r.Total_No,
          cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
          items: [{
            id: 0,
            item: r.item,
            Si: r.Total_Si,
            No: r.Total_No,
            cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No))
          }]
        }]
      }
      p.push(cnew)
    }
    return p
  }

  DataShorts(r, p: Shorts[]): Shorts[] {

    let AgregoShort = false;
    for (let i = 0; i < p.length; i++) {
      if (p[i].short === r.Short_Item) {
        p[i].Si += r.Total_Si;
        p[i].No += r.Total_No;
        p[i].cumplimiento = p[i].Si / (p[i].No + p[i].Si)
        AgregoShort = true;
        p[i].items = this.DataItems(r, p[i].items)
      }
    }

    if (!AgregoShort) {
      let snew: Shorts;
      snew = {
        id: 0,
        short: r.Short_Item,
        Si: r.Total_Si,
        No: r.Total_No,
        cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No)),
        items: [{
          id: 0,
          item: r.item,
          Si: r.Total_Si,
          No: r.Total_No,
          cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No))
        }]
      }
      p.push(snew)
    }
    return p

  }

  DataItems(r, p: Items[]): Items[] {


    let AgregoShort = false;
    for (let i = 0; i < p.length; i++) {
      if (p[i].item === r.item) {
        p[i].Si += r.Total_Si;
        p[i].No += r.Total_No;
        p[i].cumplimiento = p[i].Si / (p[i].No + p[i].Si)
        AgregoShort = true;
      }
    }

    if (!AgregoShort) {
      let snew: Items;
      snew = {
        id: 0,
        item: r.item,
        Si: r.Total_Si,
        No: r.Total_No,
        cumplimiento: (r.Total_Si / (r.Total_Si + r.Total_No))
      }
      p.push(snew)
    }
    return p
  }

  /**
   * Estructurar json! Final
   */


  //Data Random
  dataRandom(lim): number[] {
    let data = [];
    for (let i = 0; i < lim; i++) {
      data.push((Math.random() * 100).toFixed(1));
    }
    return data;
  }


  backgroundRow(data: any) {

    // console.log(data);
    // console.log('Menor que 75: ', data <= 75);
    // console.log('Entre 75 y 85: ', data > 75 && data <= 85);
    // console.log('Mayor que 85: ', data > 85);

    switch (true) {
      case data <= 0.75:
        return 'danger'
      case data > 0.75 && data <= 0.85:
        return 'warning'
      case data > 0.85:
        return 'success'
      default:
        return 'light'
    }
  }
}

