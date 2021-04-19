import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "paginador",
  pure: false
})
export class PaginadorPipe implements PipeTransform {
  transform(array: any, tamaño: number, pagina: number): any[] {
    if (!array.length) return [];
    if (tamaño === 0) return array;

    tamaño = tamaño || 10;
    pagina = pagina || 1;
    --pagina;

    return array.slice(pagina * tamaño, (pagina + 1) * tamaño);
  }
}
