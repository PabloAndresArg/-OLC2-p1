import { Nodo } from "./nodo";

export class Arbol{
    hijos: Array<Nodo>
    constructor(instrucciones:  Array<Nodo>){
        this.hijos = instrucciones;
    }
}