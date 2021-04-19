import { NgModule } from "@angular/core";
import { CommonModule, DecimalPipe, KeyValuePipe } from "@angular/common";

import { TestingRoutingModule } from "./testing-routing.module";
import { PaginadorPipe } from "./pipes/paginador.pipe";
import { EncabezadoComponent } from "./pages/components/encabezado/encabezado.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgBootstrapModule } from "@ngbtsp/ng-bootstrap.module";
import { PaginaDePruebasPage } from "./pages/pagina-de-pruebas/pagina-de-pruebas.page";
import { TablaComponent } from "./pages/components/tabla/tabla.component";
import { HighlightComponent } from "./pages/components/highlight/highlight.component";
import { SharedModule } from "@shared/shared.module";
import { ChecklistComponent } from "./pages/components/checklist/checklist.component";
import { TUsuarioService } from "./services/t-usuario.service";

@NgModule({
  declarations: [
    PaginaDePruebasPage,
    PaginadorPipe,
    EncabezadoComponent,
    TablaComponent,
    HighlightComponent,
    ChecklistComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TestingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapModule,
  ],
  exports: [ChecklistComponent],
  providers: [DecimalPipe, KeyValuePipe, TUsuarioService],
})
export class TestingModule {}
