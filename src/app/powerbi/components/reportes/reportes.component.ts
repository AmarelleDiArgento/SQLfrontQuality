import { Component, OnInit } from '@angular/core';
import { SafePipe } from '@shared/pipes/safe.pipe';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {



  selected: number = 0;
  reporte = [
    {
      titulo: 'Seguimiento Producción Hora a Hora',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiNzU3NzZiNzQtZTU5MC00Nzg2LThlMTYtNTdhMWI4MjE3YjVlIiwidCI6IjJlMDcwNzA1LWQ1NmEtNDNhNC1hMzU3LWE2MGIwODI1NDExMyIsImMiOjR9',
      activo: false
    }, {
      titulo: 'Cumplimiento De Proyección Semanal',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiMjYyM2I2OTUtM2VkNS00ODRkLTk4YjAtOWFkZDk1NDBjZjU4IiwidCI6IjJlMDcwNzA1LWQ1NmEtNDNhNC1hMzU3LWE2MGIwODI1NDExMyIsImMiOjR9',
      activo: false

    }
  ];

  cambiarInforme(id: number) {
    this.reporte[this.selected].activo = false;
    this.selected = id;
    this.reporte[this.selected].activo = true;
  }

  ngOnInit(): void {
    this.cambiarInforme(this.selected);
  }

}
