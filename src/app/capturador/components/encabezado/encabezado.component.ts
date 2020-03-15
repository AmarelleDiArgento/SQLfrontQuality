import { Component, OnInit, Input } from '@angular/core';
import { Procesos_Detalle } from '@shared/interfaces/procesosdetalle';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  @Input() encabezado: Procesos_Detalle[];
  constructor() { }

  ngOnInit() {

  }

}
