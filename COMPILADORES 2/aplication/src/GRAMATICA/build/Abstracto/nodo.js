"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Nodo {
    constructor(tipo, linea, col) {
        this.linea = linea;
        this.tipo = tipo;
        this.columna = col; // nos servira para proporcionarlo a la lista de errores si en dado caso ocurriera alguno
    }
}
exports.Nodo = Nodo;
