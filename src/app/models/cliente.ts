import { Membresia } from "./membresia";

export interface Cliente {

    idCliente?: number;

    nombre:string;

    correo:string;

    telefono:string;

    membresia?: Membresia


}