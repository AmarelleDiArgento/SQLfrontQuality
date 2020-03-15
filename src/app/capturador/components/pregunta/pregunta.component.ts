import { Component, OnInit, Input } from '@angular/core';
import { Procesos_Detalle } from '@shared/interfaces/procesosdetalle';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.scss']
})
export class PreguntaComponent implements OnInit {

  @Input() pregunta: Procesos_Detalle;
  constructor() { }

  ngOnInit() {
  }

}
