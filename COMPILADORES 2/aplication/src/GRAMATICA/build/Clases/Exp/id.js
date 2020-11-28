"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodo_1 = require("../../Abstracto/nodo");
const tipo_1 = require("../../Abstracto/tipo");
const listaErrores_1 = require("../../Errors/listaErrores");
const error_1 = require("../../Errors/error_");
class Id extends nodo_1.Nodo {
    constructor(identificador, l, c) {
        super(tipo_1.Tipo.any_, l, c);
        this.identificador = identificador;
    }
    ejecucion(t) {
        let variable;
        // valido que  si se haya encontrado dentro de la tabla de simbolos
        variable = t.getVariable(this.identificador);
        if (variable === null) {
            let error = new error_1.Error_('SEMANTICO', this.linea, `  la variable  ${this.identificador} no ha sido  declarada`);
            listaErrores_1.ListaErrores.errores.push(error);
            return error;
        }
        this.tipo = variable.tipo;
        return variable.value;
    }
}
exports.Id = Id;
