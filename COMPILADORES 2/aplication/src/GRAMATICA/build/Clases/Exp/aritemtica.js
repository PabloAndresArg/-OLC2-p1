"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodo_1 = require("../../Abstracto/nodo");
const error_1 = require("./../../Errors/error_");
const tipo_1 = require("./../../Abstracto/tipo"); // siempre relativo por el build
class Aritmetica extends nodo_1.Nodo {
    constructor(izq, operacion, der, linea, col) {
        super(tipo_1.Tipo.any_, linea, col);
        this.izq = izq;
        this.der = der;
        this.operacion = operacion;
    }
    ejecucion(t) {
        if (this.der !== null) { // verificando que sean 2 operandos
            const resultadoIzq = this.izq.ejecucion(t);
            if (resultadoIzq instanceof error_1.Error_) {
                return resultadoIzq;
            }
            const resultadoDer = this.der.ejecucion(t);
            if (resultadoDer instanceof error_1.Error_) {
                return resultadoDer;
            }
            // LLEGA ACA SI NINGUNO DE LOS DOS OPERADORES ES ERROR
            switch (this.operacion) {
                case "+":
                    if (this.izq.tipo === tipo_1.Tipo.number_ && this.der.tipo === tipo_1.Tipo.number_) { // OPERACION ENTRE ENTEROS 
                        this.tipo = tipo_1.Tipo.number_; // porque opera binariamente de 2 en 2 entonces el resultado este tiene que seguirsiendo de tipo number
                        return resultadoIzq + resultadoDer;
                    }
                    else if (this.izq.tipo === tipo_1.Tipo.string_ || this.der.tipo === tipo_1.Tipo.string_) { // ES CONCATENACION DE STRINGS , por eso es un O´ logico
                        this.tipo = tipo_1.Tipo.string_;
                        return resultadoIzq + resultadoDer; // opero los que devuelve el ejecutar
                    }
                    else {
                        return new error_1.Error_('SEMANTICO', this.linea, ` error, no se puede operar ${this.izq} y ${this.der}`); // alt + 96 para comillas raras 
                    } // ¿Por que retorno un error , porque aun no se si ya se termino de ejecutar la expresion, eso se valida donde devuelva mi exp ?
                    break;
                case "-":
                    break;
                case "*":
                    break;
                case "/":
                    break;
                default:
                    console.log('operador desconocido');
                    break;
            }
        }
        else { // SOLO VIENE UN OPERADOR
        }
    }
}
exports.Aritmetica = Aritmetica;
