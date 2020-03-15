import { Component, OnInit, Input } from '@angular/core';
import { Procesos_Detalle } from '@shared/interfaces/procesosdetalle';
import { DesplegableService } from '@core/services/desplegable.service';
import { isUndefined, isNull } from 'util';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-campo',
  templateUrl: './campo.component.html',
  styleUrls: ['./campo.component.scss']
})
export class CampoComponent implements OnInit {

  desplegables = [];
  desplegable = [];


  @Input() campo: Procesos_Detalle;

  constructor(
    public servDesplegable: DesplegableService
  ) {

  }
  public model: any;
  // Esta funcion extrae el campo Opcion del objeto Desplegable
  soloOpcion = (lista: any[]) => lista.map(l => l["Opcion"])

  // Esta funcion filtra y expone las coincidencias en la lista de opciones
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.soloOpcion(this.desplegable).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )


  ngOnInit() {
    (localStorage.getItem('desplegables') === null) ? [] : this.desplegables = JSON.parse(localStorage.getItem('desplegables'));

    console.log(this.campo);
    //console.log('Dentro de campo:');
    //console.log('campo', this.campo);

    if (!isUndefined(this.campo.lista_desp)) {

      if (this.campo.lista_desp !== "" && !isNull(this.campo.lista_desp)) {
        if (this.desplegables.length === 0) {
          this.agregarLocal(this.campo.lista_desp)
          console.log(localStorage.getItem('desplegables'));

        } else {
          this.validarLocal(this.campo.lista_desp)
        }
      }
    }
  }

  validarLocal(nombre: string) {
    var encontrado = false;

    for (const d of this.desplegables) {
      if (d.nombre === nombre) {
        encontrado = true;
        this.desplegable = d.desplegable
      }
    }

    if (!encontrado) {
      this.agregarLocal(nombre);
    }

  }

  agregarLocal(nombre: string) {

    this.servDesplegable.filtro(nombre)
      .subscribe(data => {
        var desp =
          { nombre: nombre, desplegable: data.rows }
        this.desplegables.push(desp);
        localStorage.setItem('desplegables', JSON.stringify(this.desplegables))
        this.desplegable = desp.desplegable;
      })
  }


  colorLabel(num: number) {
    switch (num) {
      case 0:
        return "grey";
      case 1:
        return "green";
      case 2:
        return "red";
      default:
        return "orange";
    }
  }

}
