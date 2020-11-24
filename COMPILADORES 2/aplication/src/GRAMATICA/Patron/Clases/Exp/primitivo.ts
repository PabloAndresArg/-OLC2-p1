import { Nodo } from "../../Abstracto/nodo";
import { Tipo } from "../../Abstracto/tipo";
import { Table } from "../../Tabla/table";

export class Primitivo extends Nodo{
    valor:any;
    constructor(tipo:Tipo , valor: any , linea: Number , columna : Number){
        super(tipo, linea , columna);
        this.valor = valor;
    }

    ejecucion(t: Table) {
       return this.valor;
    }
}