export interface Marca {
    nombre: string;
    cliente: string;
    longitud: string;
    cauchos: string;
    armado: {
        tipo: string,
        url: string,
    };
    menus: Menu[];
}

export interface Menu {

    id: number;
    nombre: string;
    superior: string;
    materiales: Material[];
    productos: Producto[];
}

export interface Material {
    id: number;
    url: string;
    tipo: string;
    material: string;
    cantidad: number;
}

export interface Producto {
    id: number;
    producto: string;
    variedad: string;
    ptoCorte: string;
    grado: string;
    tallos: number;
}
