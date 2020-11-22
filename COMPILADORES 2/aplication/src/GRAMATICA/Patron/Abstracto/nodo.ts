export abstract class Nodo{
    linea: Number; 
    column: Number; 
    tipo: any;
    constructor( tipo: any,linea: Number , columna: Number){
     this.linea =  linea;
     this.column = columna;
     this.tipo = tipo;
    }
    abstract excute():any;
}