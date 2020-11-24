import { Nodo } from "../../Abstracto/nodo";
import { Tipo } from "../../Abstracto/tipo";
import { Table } from "../../Tabla/table";
import { showConsola } from '../../Auxiliar/listaShowConsola';

export class ConsoleLog extends Nodo{
    // ¿ Que es lo unico que nos interesa en una impresion ?
    // la expresion , por ello es su atributo 
    exp: Nodo; 
    constructor(expr: Nodo , linea: Number , col: Number){
        super(Tipo.any_ , linea, col);
        this.exp = <Nodo>expr;
    }
    ejecucion(t: Table) {// solo guarda en mi showConsola 
    let valorImprimir = this.exp.ejecucion(t);
    console.log("CONSOLA:");console.log(valorImprimir);
    showConsola.salida += (valorImprimir) + '\n';// SI OCURRIERA UN ERROR lo que imprimiria seria ese error  
    return null; 
    }

}