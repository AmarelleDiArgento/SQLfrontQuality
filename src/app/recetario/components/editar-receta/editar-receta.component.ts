import { Component, OnInit } from '@angular/core';
import { RecetarioService } from '@core/services/recetario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editar-receta',
  templateUrl: './editar-receta.component.html',
  styleUrls: ['./editar-receta.component.scss']
})
export class EditarRecetaComponent implements OnInit {

  marca$: Observable<any>;
  marca;
  id;
  constructor(
    public service: RecetarioService,
    private activatedRoute: ActivatedRoute,
    private route: Router

  ) {
    this.marca$ = this.activatedRoute.params
      .pipe(switchMap((params: Params) => {
        this.id = params.descripcion;
        return this.service.optener(this.id);
      }));

  }

  ngOnInit(): void {
  }

  archivo(event, id) {
    // console.log(event, id, this.id);

  }


}
