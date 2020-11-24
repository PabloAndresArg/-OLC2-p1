"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodo_1 = require("../../Abstracto/nodo");
const tipo_1 = require("../../Abstracto/tipo");
const listaShowConsola_1 = require("../../Auxiliar/listaShowConsola");
class ConsoleLog extends nodo_1.Nodo {
    constructor(expr, linea, col) {
        super(tipo_1.Tipo.any_, linea, col);
        this.exp = expr;
    }
    ejecucion(t) {
        let valorImprimir = this.exp.ejecucion(t);
        console.log("CONSOLA:");
        console.log(valorImprimir);
        listaShowConsola_1.showConsola.salida += (valorImprimir) + '\n'; // SI OCURRIERA UN ERROR lo que imprimiria seria ese error  
        return null;
    }
}
exports.ConsoleLog = ConsoleLog;
