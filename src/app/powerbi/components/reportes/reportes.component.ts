import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CryptoService } from "@core/services/crypto.service";
import { SessionFull, Reportes, Permisos } from "@shared/interfaces/session";

@Component({
  selector: "app-reportes",
  templateUrl: "./reportes.component.html",
  styleUrls: ["./reportes.component.scss"],
})
export class ReportesComponent implements OnInit {
  data = false;
  selected: number = 0;
  proceso: string;
  reporte: Reportes[];
  session: SessionFull;

  constructor(
    private router: Router,
    private crypto: CryptoService,
    private activatedRoute: ActivatedRoute
  ) {
    this.session = JSON.parse(
      this.crypto.recuperar(localStorage.getItem("Session"))
    ) as SessionFull;

    this.activatedRoute.params.subscribe((params: Params) => {
      this.proceso = params.id;
      // console.log(this.proceso);

      this.optenerReportes();
      if (this.data) {
        this.cambiarInforme(this.selected);
      }
    });
  }

  cambiarInforme(id: number) {
    this.reporte[this.selected].activo = false;
    this.selected = id;
    this.reporte[this.selected].activo = true;
  }

  ngOnInit(): void {}

  matches(permiso: Permisos, term: string) {
    return permiso.url.toLowerCase().includes(term.toLowerCase());
  }

  optenerReportes() {
    let per: Permisos[];
    for (const m of this.session.modulos) {
      if (m.nombre === "Reportes BI") {
        per = m.permisos.filter((repo) => this.matches(repo, this.proceso));
        per.map((p) => {
          this.reporte = p.reportes;
        });
      }
    }

    this.data = this.reporte.length > 0;
    // console.log(this.reporte);
  }
}
