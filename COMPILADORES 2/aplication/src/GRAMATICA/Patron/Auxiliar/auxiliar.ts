import {Error_} from '../Errors/error_';
import {ListaErrores} from '../Errors/listaErrores';
export  class Auxiliar{
    public  tieneComillasDoblesAdentro(matched : string): void{
        if (matched.length > 1){
            let contador: number = 1 ;
            for (let u = 1; u < matched.length; u++) {
            if (matched[u] == '"' && matched[u-1] != '\\'){
                contador++;
            }
            }
            if (contador === 2){
                console.log(contador);
                console.log('ok');
            }else{
                console.log(contador);
                console.log('Error::::::');
                let error = new Error_('SINTACTICO' , 0 ,' no se cierra correctamente las comillas ');
                ListaErrores.errores.push(error);
            }
        }
    }


}
