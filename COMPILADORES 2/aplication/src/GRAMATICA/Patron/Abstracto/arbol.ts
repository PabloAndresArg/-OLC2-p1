import { Nodo } from "./nodo";
export class Arbol{
    hijos: Array<Nodo>;
    Errores: Array<Error>;
    constructor(instrucciones:  Array<Nodo>){// le pasare los errores
        this.hijos = instrucciones;
        this.Errores = [];
    }
}