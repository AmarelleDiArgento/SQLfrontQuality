export interface Formularios {}

export interface FormBorrable {
  unico: string;
  fecha: string | Date;
  id_procesos: number;
  proceso: string;
  id_lugar: number;
  id_terminal: string;
  lugar: string;
  id_usuario: number;
  nombre_usuario: string;
  consec_json: number;
  Encabezado: string | [{ llave: string; valor: string }];
}
