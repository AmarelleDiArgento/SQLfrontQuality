import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js/';


@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  secreto = "Secretisimo!"
  constructor() { }

  encriptar(objeto: string): string {
    return AES.encrypt(objeto, this.secreto).toString();
  }

  recuperar(cryptoObjeto: string): string {
    var bytes = AES.decrypt(cryptoObjeto, this.secreto);
    return bytes.toString(enc.Utf8);
  }
}
