"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodo_1 = require("../../Abstracto/nodo");
const tipo_1 = require("../../Abstracto/tipo");
const listaShowConsola_1 = require("../../Auxiliar/listaShowConsola");
const error_1 = require("../../Errors/error_");
const listaErrores_1 = require("../../Errors/listaErrores");
const primitivo_1 = require("../Exp/primitivo");
class ConsoleLog extends nodo_1.Nodo {
    constructor(expr, linea, col) {
        super(tipo_1.Tipo.any_, linea, col);
        this.exp = expr;
    }
    ejecucion(t) {
        let valorImprimir = this.exp.ejecucion(t);
        console.log("consoleLog: ", valorImprimir);
        if (valorImprimir instanceof error_1.Error_) {
            listaErrores_1.ListaErrores.errores.push(valorImprimir);
            listaShowConsola_1.showConsola.salida += (valorImprimir.descripcion) + '\n';
        }
        else if (valorImprimir instanceof primitivo_1.Primitivo) {
            listaShowConsola_1.showConsola.salida += (valorImprimir.valor) + '\n';
        }
        else {
            listaShowConsola_1.showConsola.salida += (valorImprimir) + '\n';
        }
        return null;
    }
}
exports.ConsoleLog = ConsoleLog;
