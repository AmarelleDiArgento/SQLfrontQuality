import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PaginaDePruebasPage } from "./pages/pagina-de-pruebas/pagina-de-pruebas.page";

const routes: Routes = [
  {
    path: "",
    component: PaginaDePruebasPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestingRoutingModule {}
