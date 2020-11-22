"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listaErrores_1 = require("../Errors/listaErrores");
class Arbol {
    constructor(instrucciones) {
        this.hijos = instrucciones;
        this.errores = listaErrores_1.ListaErrores.errores;
    }
}
exports.Arbol = Arbol;
