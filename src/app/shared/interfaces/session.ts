import { Permiso } from './permiso';

export interface Session {
    usuario: string;
    nombre: string;
    grupo: string;
    area: string;
    ubicacion: string;
    permisos: Permiso[];

}




