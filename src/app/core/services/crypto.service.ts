import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  secreto = 'Secretisimo!';
  constructor() {}

  encriptar(objeto: string): string {
    return CryptoJS.AES.encrypt(objeto, this.secreto).toString();
  }

  recuperar(cryptoObjeto: string): string {
    return CryptoJS.AES.decrypt(cryptoObjeto, this.secreto).toString(
      CryptoJS.enc.Utf8
    );
  }
}
