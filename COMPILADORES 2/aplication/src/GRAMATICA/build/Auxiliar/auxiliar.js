"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../Errors/error_");
const listaErrores_1 = require("../Errors/listaErrores");
class Auxiliar {
    tieneComillasDoblesAdentro(matched) {
        if (matched.length > 1) {
            let contador = 1;
            for (let u = 1; u < matched.length; u++) {
                if (matched[u] == '"' && matched[u - 1] != '\\') {
                    contador++;
                }
            }
            if (contador === 2) {
                console.log(contador);
                console.log('ok');
            }
            else {
                console.log(contador);
                console.log('Error::::::');
                let error = new error_1.Error_('SINTACTICO', 0, ' no se cierra correctamente las comillas ');
                listaErrores_1.ListaErrores.errores.push(error);
            }
        }
    }
}
exports.Auxiliar = Auxiliar;
