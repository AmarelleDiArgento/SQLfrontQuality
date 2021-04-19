import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
} from "@angular/core";

@Directive({
  selector: "[appHighlighttext]",
})
export class HighlighttextDirective {
  @Input() term: string;
  @Input() text: string;
  @Input() classToApply: string;
  termSplit: string[] = [];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.term !== undefined && this.term !== null) {
      this.termSplit = this.term.split(" ");
    }
    if (!this.termSplit || !this.termSplit.length || !this.classToApply) {
      this.renderer.setProperty(this.el.nativeElement, "innerHTML", this.text);
      return;
    }

    this.renderer.setProperty(
      this.el.nativeElement,
      "innerHTML",
      this.getFormattedText()
    );
  }

  getFormattedText() {
    const re = new RegExp(`(${this.termSplit.join("|")})`, "g");

    return this.text.replace(
      re,
      `<span class="${this.classToApply}">$1</span>`
    );
  }
}
