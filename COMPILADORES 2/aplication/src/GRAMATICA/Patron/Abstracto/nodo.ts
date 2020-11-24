import { Table } from "../Tabla/table";
import { Tipo } from "./tipo";

export abstract class Nodo{
    linea: Number; 
    tipo: Tipo;
    columna: Number;
    constructor( tipo:Tipo , linea: Number , col: Number){
     this.linea =  linea;
     this.tipo = tipo;
     this.columna = col;// nos servira para proporcionarlo a la lista de errores si en dado caso ocurriera alguno
    }
    abstract ejecucion(t: Table): any;
}