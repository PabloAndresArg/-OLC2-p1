"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*


    ESTA ES LA CLASE QUE SE ENCARGA DE INSERTAR UNA NUEVA  VARIABLE A LA TABLA DE SIMBOLOS


*/
const nodo_1 = require("../../Abstracto/nodo");
const tipo_1 = require("../../Abstracto/tipo");
const error_1 = require("../../Errors/error_");
const listaErrores_1 = require("../../Errors/listaErrores");
const variable_1 = require("../../Tabla/variable");
const primitivo_1 = require("../Exp/primitivo");
class Declaracion extends nodo_1.Nodo {
    // y su linea y coLUMNA QUE vienen por la herencia
    constructor(tipoDeclaracion, id, linea, col) {
        super(tipoDeclaracion, linea, col);
        this.id = id;
        this.valor = this.valor;
        this.tipoDeclaracion = tipoDeclaracion; // tal vez no sea necesario
    }
    setValor(valor) {
        this.valor = valor;
    }
    ejecucion(t) {
        let var_; // variable que voy a guardar
        if (this.valor !== null && this.valor !== undefined) {
            let valor_puro_del_id = this.valor.ejecucion(t);
            if (valor_puro_del_id instanceof error_1.Error_) {
                return valor_puro_del_id;
            } // por que los reorno ? pues si los mato de una no podre recupararme de errores de ejecucion 
            if (this.tipo != this.valor.tipo) { // si es diferente hay un error de tipos 
                let error = new error_1.Error_('SEMANTICO', this.linea, `Los tipos no coinciden en la declaracion de variables , TipoDeclaracion: ${this.tipoDeclaracion}  != TipoValor: ${this.valor.tipo}`);
                listaErrores_1.ListaErrores.errores.push(error);
                return error;
            }
            var_ = new variable_1.Variable(this.id, this.tipo, true, valor_puro_del_id);
        }
        else {
            // aun no tengo ningun valor por default
            this.valor = this.darValorPorDefault();
            var_ = new variable_1.Variable(this.id, this.tipo, true, this.valor);
        }
        const respuesta = t.saveVariable(var_); // si hay error devuleve un string de ese error , sino devuelve null 
        if (respuesta != null) {
            let error = new error_1.Error_('SEMANTICO', this.linea, ` ${respuesta}`);
            listaErrores_1.ListaErrores.errores.push(error);
        }
        return null;
    }
    darValorPorDefault() {
        if (this.tipo === tipo_1.Tipo.boolean_) {
            return new primitivo_1.Primitivo(tipo_1.Tipo.boolean_, true, this.linea, 0);
        }
        else if (this.tipo === tipo_1.Tipo.number_) {
            return new primitivo_1.Primitivo(tipo_1.Tipo.boolean_, 0, this.linea, 0);
        }
        else if (this.tipo === tipo_1.Tipo.string_) {
            return new primitivo_1.Primitivo(tipo_1.Tipo.boolean_, "valor default", this.linea, 0);
        }
    }
}
exports.Declaracion = Declaracion;
