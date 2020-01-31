import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DesplegableService } from 'src/app/core/services/desplegable.service';
import { Router } from '@angular/router';
import { SwalModalService } from 'src/app/core/swal-modal.service';

@Component({
  selector: 'app-crear-desplegable',
  templateUrl: './crear-desplegable.component.html',
  styleUrls: ['./crear-desplegable.component.scss']
})
export class CrearDesplegableComponent implements OnInit {

  nuevoDesplegable: FormGroup;
  submitted = false;
  constructor(
    private fromBuilder: FormBuilder,
    private desplegableService: DesplegableService,
    private sw: SwalModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.nuevoDesplegable = this.fromBuilder.group({
      Filtro: ['', Validators.required],
      Codigo: ['', Validators.required],
      Opcion: ['', Validators.required]
    })
  }

  get f() { return this.nuevoDesplegable.controls; }

  onSubmit(){
    // && !this.submitted
    if(this.nuevoDesplegable.valid ){
      this.submitted = true;
      this.desplegableService.crear(this.nuevoDesplegable.value)
      .subscribe(data => {
        let val = this.sw.modal(data)
        if(val){
          this.router.navigate(['desplegable'])
        }else{
          this.submitted = false;
        }
      })

    }
  }
}
