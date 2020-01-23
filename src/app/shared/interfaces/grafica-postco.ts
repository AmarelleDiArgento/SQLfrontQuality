
export interface GraficaPostco {
    id: number
    postcosecha: string,
    Si: number,
    No: number,
    cumplimiento: number,
    procesos: Procesos[]
}

export interface Procesos {
    id: number
    proceso: string,
    Si: number,
    No: number,
    cumplimiento: number,
    capitulos: Capitulos[]
}

export interface Capitulos {
    id: number
    capitulo: string,
    Si: number,
    No: number,
    cumplimiento: number,
    shorts: Shorts[]
}

export interface Shorts {
    id: number
    short: string,
    Si: number,
    No: number,
    cumplimiento: number,
    items: Items[]
}

export interface Items {
    id: number
    item: string,
    Si: number,
    No: number,
    cumplimiento: number,
}