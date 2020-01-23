import { Component, OnInit, Input } from '@angular/core';
import { GraficaPostco } from 'src/app/shared/interfaces/grafica-postco';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  @Input() Graf: GraficaPostco;

  constructor() { }
  
  ngOnInit() {
  }

}
