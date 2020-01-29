import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { GraficaPostco, Procesos, Shorts, Items } from 'src/app/shared/interfaces/grafica-postco';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
  }


  public cambioPoscto: FormGroup;

  public Graf$: Observable<GraficaPostco[]>;


  public postcosechas$: Observable<any[]>;


  public activo: number = 3;



  public postco


  constructor(
    private formBuilder: FormBuilder,
    private data: DataService,
  ) {
    this.data.cargar()
    this.Graf$ = this.data.graph$
    this.postcosechas$ = this.data.post$
    this.cambioPoscto = this.formBuilder.group({
      seleccionado: [3, Validators.required]
    });

  }

  ngOnInit() {
    console.log(this.Graf$);



  }




  /**
   * Conexion a la base de datos:
   * Carga dataGraf
   * Empaqueta en DataPostco
   * Carga graficas 
   */


  /**
   * Asgina poscosecha activa, precargada con el valor 0
   * Redirige a la funcion cargarGraficas()
   */
  onSubmit() {
    console.log(this.cambioPoscto.value);
    this.activo = this.cambioPoscto.get('seleccionado').value;

    console.log(this.Graf$);

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

