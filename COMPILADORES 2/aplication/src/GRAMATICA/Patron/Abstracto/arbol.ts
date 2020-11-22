import { ListaErrores } from "../Errors/listaErrores";
import { Nodo } from "./nodo";

export class Arbol{
    
    hijos: Array<Nodo>;
    errores: any; 
    constructor(instrucciones:  Array<Nodo>){// le pasare los errores
       this.hijos = instrucciones;
       this.errores = ListaErrores.errores;
    }
} 