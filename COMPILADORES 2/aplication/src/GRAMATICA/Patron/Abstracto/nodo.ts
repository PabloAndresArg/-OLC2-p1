export abstract class Nodo{
    linea: number; 
    column: number; 
    tipo: any;
    constructor( tipo: any,linea: number , columna: number){
     this.linea =  linea;
     this.column = columna;
     this.tipo = tipo;
    }
    abstract excute():any;
}