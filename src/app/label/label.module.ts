import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QRCodeModule } from 'angularx-qrcode';

import { LabelRoutingModule } from './label-routing.module';
import { LabelComponent } from './components/label/label.component';
import { LectorcsvComponent } from './components/lectorcsv/lectorcsv.component';
import { ImpresionComponent } from './components/impresion/impresion.component';


@NgModule({
  declarations: [
    LabelComponent,
    LectorcsvComponent,
    ImpresionComponent,  
  ],
  imports: [
    CommonModule,
    LabelRoutingModule,
    QRCodeModule       
  ],
  exports: [
    LectorcsvComponent,
    QRCodeModule
  ]
})
export class LabelModule { }
