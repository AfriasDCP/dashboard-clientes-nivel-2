export interface Dispositivo {
    id: number;
    segmento: string;
    cliente: string;
    host: string;
    ip: string;
    estado: boolean;
    fechaCaida: string;
    fechaResolucion: string;
    noSerial: string;
    macAddress: string;
    marca: string;
}