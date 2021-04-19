import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-autocompletado",
  templateUrl: "./autocompletado.component.html",
  styleUrls: ["./autocompletado.component.scss"],
})
export class AutocompletadoComponent implements OnInit {
  constructor() {}

  @Input() lista: string[];
  @Input() campo: string;
  @Input() input: string;

  @Output() valor = new EventEmitter<any>();

  ngOnInit(): void {
    this.lista = this.lista.map((l) => l[this.campo]);
    console.log(this.campo, this.lista);
  }
  public model = new FormControl();

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      //debounceTime(200),
      //distinctUntilChanged(),
      map((term) =>
        term.length < 0
          ? []
          : this.lista
              .filter((v) =>
                v ? v.toLowerCase().indexOf(term.toLowerCase()) > -1 : false
              )
              .slice(0, 10)
      )
    );

  returnValue(valor) {
    console.log(this.campo, valor);
    this.valor.emit({
      campo: this.campo,
      valor: valor,
    });
  }
}

/**
 *
 *

  .filter((v => (v) ? v.toLowerCase().indexOf(term.toLowerCase()) > -1: false)
 */
