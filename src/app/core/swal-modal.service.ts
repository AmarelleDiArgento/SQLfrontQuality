import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { JsonRes } from '../shared/interfaces/json-res';


@Injectable({
  providedIn: 'root'
})
export class SwalModalService {

  modal(jr: JsonRes): boolean {
    switch (jr.respuesta) {
      case 'success':
        Swal.fire({
          icon: jr.respuesta,
          title: jr.output.mensaje,
          text: jr.output.detalle,
          timer: 3000
        })
        return true
      case 'error':
        Swal.fire({
          icon: jr.respuesta,
          title: jr.output.mensaje,
          text: `${JSON.stringify(jr.output.detalle)}
            C: ${jr.output.code}`,
          timer: 3000
        })
        return false

      default:
        return false
    }
  }
}
