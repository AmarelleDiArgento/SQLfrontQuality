import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LabelComponent } from './components/label/label.component';


const routes: Routes = [
  {
    path: '',
    component: LabelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabelRoutingModule { }
