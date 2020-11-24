"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodo_1 = require("../../Abstracto/nodo");
class Primitivo extends nodo_1.Nodo {
    constructor(tipo, valor, linea, columna) {
        super(tipo, linea, columna);
        this.valor = valor;
    }
    ejecucion(t) {
        return this.valor;
    }
}
exports.Primitivo = Primitivo;
