import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-highlight",
  templateUrl: "./highlight.component.html",
  styleUrls: ["./highlight.component.scss"],
})
export class HighlightComponent implements OnInit {
  constructor() {}

  @Input() term: string;
  @Input() texto: string;

  ngOnInit(): void {
    console.log(this.texto, this.term);
  }
}
