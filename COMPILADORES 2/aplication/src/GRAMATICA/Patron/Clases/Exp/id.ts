import { Nodo } from "../../Abstracto/nodo";
import { Tipo } from "../../Abstracto/tipo";
import { ListaErrores } from "../../Errors/listaErrores";
import { Table } from "../../Tabla/table";
import { Variable } from "../../Tabla/variable";
import { Error_ } from "../../Errors/error_";
export class Id extends Nodo{
    identificador: string; 
    constructor(identificador: string , l:Number , c: Number){
        super(Tipo.any_ , l , c);
        this.identificador = identificador;
    }
    ejecucion(t: Table) { // en ejecucion le doy su tipo de retorno y devuelvo su valor 
       let variable: Variable | null;
        // valido que  si se haya encontrado dentro de la tabla de simbolos
       variable = t.getVariable(this.identificador);
       if(variable === null){
        return this.reportarErrorSemantico(`  la variable  ${this.identificador} no ha sido  declarada`); 
       } 
       this.tipo = variable.tipo;
       return variable.value;
    }
    reportarErrorSemantico(descripcion: string): Error_ {
        let error = new Error_('SEMANTICO', this.linea, descripcion);
        ListaErrores.errores.push(error);
        return error;
    }
}