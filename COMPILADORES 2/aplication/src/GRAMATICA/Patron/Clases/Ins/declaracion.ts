/*


    ESTA ES LA CLASE QUE SE ENCARGA DE INSERTAR UNA NUEVA  VARIABLE A LA TABLA DE SIMBOLOS


*/
import { Nodo } from "../../Abstracto/nodo";
import { Tipo } from "../../Abstracto/tipo";
import { Error_ } from "../../Errors/error_";
import { ListaErrores } from "../../Errors/listaErrores";
import { Table } from "../../Tabla/table";
import { Variable } from "../../Tabla/variable";
import { Primitivo } from "../Exp/primitivo";

export class Declaracion extends Nodo {
    tipoDeclaracion: Tipo;
    id: string;
    valor: any;
    // y su linea y coLUMNA QUE vienen por la herencia
    constructor(tipoDeclaracion: Tipo, id: string, linea: Number, col: Number) {
        super(tipoDeclaracion, linea, col);
        this.id = id;
        this.valor = this.valor;
        this.tipoDeclaracion = tipoDeclaracion;// tal vez no sea necesario
    }
    setValor(valor: any) {
        this.valor = valor;
    }
    ejecucion(t: Table) {
        let var_: Variable;// variable que voy a guardar
        if (this.valor !== null && this.valor !== undefined) {
            let valor_puro_del_id: any = this.valor.ejecucion(t);
            if (valor_puro_del_id instanceof Error_) {
                return valor_puro_del_id;
            }// por que los reorno ? pues si los mato de una no podre recupararme de errores de ejecucion 
            if (this.tipo != this.valor.tipo) {// si es diferente hay un error de tipos 
                let error = new Error_('SEMANTICO', this.linea, `Los tipos no coinciden en la declaracion de variables , TipoDeclaracion: ${this.tipoDeclaracion}  != TipoValor: ${this.valor.tipo}`);
                ListaErrores.errores.push(error);
                return error;
            }
            var_ = new Variable(this.id, this.tipo, true, valor_puro_del_id);
        } else {
            // aun no tengo ningun valor por default
            this.valor = this.darValorPorDefault();
            var_ = new Variable(this.id, this.tipo, true, this.valor);
        }

        const respuesta = t.saveVariable(var_); // si hay error devuleve un string de ese error , sino devuelve null 
        if (respuesta != null) {
            let error = new Error_('SEMANTICO', this.linea, ` ${respuesta}`);
            ListaErrores.errores.push(error);
        }

        return null;
    }

    darValorPorDefault(): any {
        if (this.tipo === Tipo.boolean_) {
            return new Primitivo(Tipo.boolean_, true, this.linea, 0);
        } else if (this.tipo === Tipo.number_) {
            return new Primitivo(Tipo.boolean_, 0, this.linea, 0);
        } else if (this.tipo === Tipo.string_) {
            return new Primitivo(Tipo.boolean_, "valor default", this.linea, 0);
        }
    }

}