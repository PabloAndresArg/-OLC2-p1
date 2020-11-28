"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodo_1 = require("../../Abstracto/nodo");
const tipo_1 = require("../../Abstracto/tipo");
const error_1 = require("../../Errors/error_");
const listaErrores_1 = require("../../Errors/listaErrores");
class Relacional extends nodo_1.Nodo {
    constructor(izq, der, op, l, c) {
        super(tipo_1.Tipo.boolean_, l, c);
        this.izq = izq;
        this.der = der;
        this.op = op;
    }
    ejecucion(t) {
        const res_izq = this.izq.ejecucion(t);
        if (res_izq instanceof error_1.Error_)
            return res_izq;
        const res_der = this.der.ejecucion(t);
        if (res_der instanceof error_1.Error_)
            return res_der;
        // si llega  aca es que todo esta correcto
        switch (this.op) {
            // ESTOS OPERADORES SOLO TRABAJAN CON NUMEROS 
            case ">":
                if (this.der.tipo == tipo_1.Tipo.number_ && this.izq.tipo == tipo_1.Tipo.number_)
                    return res_izq > res_der;
                return this.reportarErrorSemantico(` error MAYOR QUE.., no se puede operar ${res_izq} y ${res_der}`);
            case ">=":
                if (this.der.tipo == tipo_1.Tipo.number_ && this.izq.tipo == tipo_1.Tipo.number_)
                    return res_izq >= res_der;
                return this.reportarErrorSemantico(` error MAYOR o IGUAL QUE.., no se puede operar ${res_izq} y ${res_der}`);
            case "<":
                if (this.der.tipo == tipo_1.Tipo.number_ && this.izq.tipo == tipo_1.Tipo.number_)
                    return res_izq < res_der;
                return this.reportarErrorSemantico(` error MENOR QUE.., no se puede operar ${res_izq} y ${res_der}`);
            case "<=":
                if (this.der.tipo == tipo_1.Tipo.number_ && this.izq.tipo == tipo_1.Tipo.number_)
                    return res_izq <= res_der;
                return this.reportarErrorSemantico(` error MENOR O IGUAL QUE.., no se puede operar ${res_izq} y ${res_der}`);
            // aca ya pueden ser strings o incluso booleanos
            case "!=":
                if (this.der.tipo == tipo_1.Tipo.number_ && this.izq.tipo == tipo_1.Tipo.number_ || this.der.tipo == tipo_1.Tipo.string_ && this.izq.tipo == tipo_1.Tipo.string_ || this.der.tipo == tipo_1.Tipo.boolean_ && this.izq.tipo == tipo_1.Tipo.boolean_)
                    return res_izq != res_der;
                return this.reportarErrorSemantico(` error DISFERENTE A, no se puede operar ${res_izq} y ${res_der}`);
            case "==":
                if (this.der.tipo == tipo_1.Tipo.number_ && this.izq.tipo == tipo_1.Tipo.number_ || this.der.tipo == tipo_1.Tipo.string_ && this.izq.tipo == tipo_1.Tipo.string_ || this.der.tipo == tipo_1.Tipo.boolean_ && this.izq.tipo == tipo_1.Tipo.boolean_)
                    return res_izq == res_der;
                return this.reportarErrorSemantico(` error en OPERACION IGUAL , no se puede operar ${res_izq} y ${res_der}`);
            default:
                return this.reportarErrorSemantico(` error Operando desconocido`);
        }
    }
    reportarErrorSemantico(descripcion) {
        let error = new error_1.Error_('SEMANTICO', this.linea, descripcion);
        listaErrores_1.ListaErrores.errores.push(error);
        return error;
    }
}
exports.Relacional = Relacional;
