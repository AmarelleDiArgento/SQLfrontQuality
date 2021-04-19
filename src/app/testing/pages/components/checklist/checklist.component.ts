import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CheckList, CheckStatus } from "@shared/interfaces/check-status";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: "app-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.scss"],
})
export class ChecklistComponent implements OnInit {
  @Input() lista$: Observable<any[]>;
  @Input() multiple: Observable<boolean>;
  @Input() titulos: CheckList;

  @Output() checkStatus = new EventEmitter<CheckStatus>();

  private _items$ = new BehaviorSubject<any[]>([]);

  items: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.lista$.subscribe((data) => {
      this.items = data;
      this._items$.next(this.items);
    });
  }

  returnID(index: number, item: any) {
    console.log(item);

    let check = {
      id: item[this.titulos.id],
      status: item[this.titulos.status],
    };
    this.checkStatus.emit(check);
  }

  track(index: number): number {
    return index;
  }
  get items$() {
    return this._items$.asObservable();
  }
}
