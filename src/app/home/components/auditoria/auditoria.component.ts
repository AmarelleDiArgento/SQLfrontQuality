import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CalendarioService } from 'src/app/core/services/calendario.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.scss']
})
export class AuditoriaComponent implements OnInit {

  calendario$: Observable<any[]>

  constructor(
    public calendarioServ: CalendarioService,
    public cd: ChangeDetectorRef
  ) {
    this.calendario$ = this.calendarioServ.$rango;
    this.cd.detach();
  }

  ngOnChanges(values) {
    this.cd.detectChanges();
    console.log(values);

  }

  ngOnInit() {

  }



}
