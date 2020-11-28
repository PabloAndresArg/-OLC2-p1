"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../Errors/error_");
const listaErrores_1 = require("../Errors/listaErrores");
class Auxiliar {
    tieneComillasDoblesAdentro(matched) {
        let IniciaLexema = 0;
        if (matched.length > 1) {
            for (let i = 0; i < matched.length; i++) {
                if (matched[i] == '"') {
                    IniciaLexema = i;
                    break;
                }
            }
            let contador = 0;
            for (let u = IniciaLexema; u < matched.length; u++) {
                if (matched[u] == '"' && matched[u - 1] != '\\') {
                    contador++;
                }
            }
            if (contador === 2) {
                console.log(contador);
                console.log('ok');
            }
            else {
                console.log('Error::::::');
                console.log(matched);
                console.log(contador);
                let error = new error_1.Error_('SINTACTICO', 0, ' no se cierra correctamente las comillas ');
                listaErrores_1.ListaErrores.errores.push(error);
            }
        }
    }
}
exports.Auxiliar = Auxiliar;
