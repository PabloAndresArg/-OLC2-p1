"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodo_1 = require("../../Abstracto/nodo");
const error_1 = require("../../Errors/error_");
const listaErrores_1 = require("../../Errors/listaErrores");
const tipo_1 = require("../../Abstracto/tipo");
class Logica extends nodo_1.Nodo {
    // linea tipo y columna como siempre
    constructor(izq, der, op, l, c) {
        // operador izquierdo siempre esta lleno
        super(tipo_1.Tipo.boolean_, l, c);
        this.Operador = op;
        this.izq = izq;
        this.der = der;
    }
    ejecucion(t) {
        if (this.der !== null && this.der !== undefined) {
            const res_izq = this.izq.ejecucion(t);
            if (res_izq instanceof error_1.Error_) {
                return res_izq;
            }
            const res_der = this.der.ejecucion(t);
            if (res_der instanceof error_1.Error_) {
                return res_der;
            }
            // si no hay errores ya de acarreo , veo si se puede operar logicamente
            switch (this.Operador) {
                case '||':
                    if (this.der.tipo == tipo_1.Tipo.boolean_ && this.izq.tipo == tipo_1.Tipo.boolean_) {
                        return res_der || res_izq;
                    }
                    let error1 = new error_1.Error_('SEMANTICO', this.linea, `Error en OR , uno de los dos no es de tipo boolean `);
                    listaErrores_1.ListaErrores.errores.push(error1);
                    return error1;
                case '&&':
                    if (this.der.tipo == tipo_1.Tipo.boolean_ && this.izq.tipo == tipo_1.Tipo.boolean_) {
                        console.log(res_der && res_izq);
                        return res_der && res_izq;
                    }
                    let error2 = new error_1.Error_('SEMANTICO', this.linea, `Error en AND , uno de los dos no es de tipo boolean `);
                    listaErrores_1.ListaErrores.errores.push(error2);
                    return error2;
                default:
                    let error3 = new error_1.Error_('SEMANTICO', this.linea, ` Operador desconocido `);
                    listaErrores_1.ListaErrores.errores.push(error3);
                    return error3;
            }
        }
        else {
            // unario
            const res_izq = this.izq.ejecucion(t);
            if (res_izq instanceof error_1.Error_) {
                return res_izq;
            }
            switch (this.Operador) {
                case '!':
                    if (this.izq.tipo == tipo_1.Tipo.boolean_) {
                        return !(res_izq);
                    }
                    else {
                        let error4 = new error_1.Error_('SEMANTICO', this.linea, `Error en NOT ,el operando no es de tipo logico`);
                        listaErrores_1.ListaErrores.errores.push(error4);
                        return error4;
                    }
                default:
                    let error5 = new error_1.Error_('SEMANTICO', this.linea, ` Operador desconocido `);
                    listaErrores_1.ListaErrores.errores.push(error5);
                    return error5;
            }
        }
    }
}
exports.Logica = Logica;
