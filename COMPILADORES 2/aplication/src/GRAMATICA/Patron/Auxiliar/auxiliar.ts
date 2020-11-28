import { Error_ } from '../Errors/error_';
import { ListaErrores } from '../Errors/listaErrores';
export class Auxiliar {
    public tieneComillasDoblesAdentro(matched: string): void { // disfuncional :v 
        let IniciaLexema = 0;
        if (matched.length > 1) {
            for (let i = 0; i < matched.length; i++) {
                if (matched[i] == '"') {
                    IniciaLexema = i;
                    break;
                }
            }
            let contador: number = 0;
            for (let u = IniciaLexema; u < matched.length; u++) {
                if (matched[u] == '"' && matched[u - 1] != '\\') {
                    contador++;
                }
            }
            if (contador === 2) {
                console.log(contador);
                console.log('ok');
            } else {
                console.log('Error::::::');
                console.log(matched);
                console.log(contador);
                let error = new Error_('SINTACTICO', 0, ' no se cierra correctamente las comillas ');
                ListaErrores.errores.push(error);
            }
        }
    }


}
