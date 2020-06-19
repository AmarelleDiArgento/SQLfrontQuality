export interface SessionFull {
    key: string;
    codigo: number;
    nombre: string;
    g1?: string;
    g2?: string;
    g3?: string;
    modulos: Modulos[];
}

export interface Modulos {
    id: number;
    nombre: string;
    permisos?: Permisos[];
    estado: boolean;
}

export interface Permisos {
    id: number;
    permiso: string;
    url: string;
    reportes?: Reportes[];
    estado: boolean;
}

export interface Reportes {
    id: number;
    reporte: string;
    descripcion: string;
    url: string;
    estado: boolean;
}






