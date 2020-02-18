import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { GraficaInfo, Procesos, Shorts, Items } from 'src/app/shared/interfaces/grafica-info';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

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


  constructor(
    private formBuilder: FormBuilder,
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {


    this.activatedRoute.params.subscribe((params: Params) => {
      // console.log(params);
      this.titulo(params.loc);
      this.data.cargar(params.loc)
      this.Graf$ = this.data.graph$
      this.informes$ = this.data.post$
      this.cambioPoscto = this.formBuilder.group({
        seleccionado: [3, Validators.required]
      });

    })
  }

  titulo(origen: string) {
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

