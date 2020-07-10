import { Component, OnInit } from "@angular/core";
import { SafePipe } from "@shared/pipes/safe.pipe";
import { SessionFull } from "../../interfaces/session";
import { Router } from "@angular/router";
import { CryptoService } from "@core/services/crypto.service";

@Component({
  selector: "app-reportes",
  templateUrl: "./reportes.component.html",
  styleUrls: ["./reportes.component.scss"],
})
export class ReportesComponent implements OnInit {
  constructor(private router: Router, private crypto: CryptoService) {
    this.session = JSON.parse(
      this.crypto.recuperar(localStorage.getItem("Session"))
    ) as SessionFull;
  }

  data = null;
  selected: number = 0;
  reporte = [];

  cambiarInforme(id: number) {
    this.reporte[this.selected].activo = false;
    this.selected = id;
    this.reporte[this.selected].activo = true;
  }

  ngOnInit(): void {
    this.optenerReportes();
    if (this.data) {
      this.cambiarInforme(this.selected);
    }
  }

  matches(reporte: permiso, term: string) {
    console.log(reporte.permiso);

    return reporte.url.toLowerCase().includes(term.toLowerCase());
  }

  optenerReportes() {
    for (const m of this.session.modulos) {
      if (m.nombre === "Reportes BI") {
        for (const p of m.permisos) {
          if (p.url === "powerbi/calidad") {
            //             for(cont r ofp.reportes){}
          }
        }
      }
    }
  }
}
