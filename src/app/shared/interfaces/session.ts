import { Permiso } from './permiso';

export interface Session {
    usuario: string;
    nombre: string;
    grupo: string;
    permisos: Permiso[];

}




