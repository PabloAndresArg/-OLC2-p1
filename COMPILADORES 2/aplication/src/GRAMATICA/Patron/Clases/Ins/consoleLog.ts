import { Nodo } from "../../Abstracto/nodo";
import { Tipo } from "../../Abstracto/tipo";
import { Table } from "../../Tabla/table";
import { showConsola } from '../../Auxiliar/listaShowConsola';
import { Error_ } from "../../Errors/error_";
import { ListaErrores } from "../../Errors/listaErrores";
import { Primitivo } from "../Exp/primitivo";

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
    console.log("consoleLog: " , valorImprimir);
    if ( valorImprimir instanceof Error_){
        ListaErrores.errores.push(valorImprimir);
        showConsola.salida += (valorImprimir.descripcion) + '\n';
    }else if (valorImprimir instanceof Primitivo){
        showConsola.salida += (valorImprimir.valor) + '\n';
    }else{
        showConsola.salida += (valorImprimir) + '\n'; 
    }
     return null; 
    }

}