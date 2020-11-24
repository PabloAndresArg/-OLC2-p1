import { Nodo } from "../../Abstracto/nodo";
import { Table } from "../../Tabla/table";
import { Error_ } from  "./../../Errors/error_";
import { Tipo } from "./../../Abstracto/tipo"; // siempre relativo por el build
export class Aritmetica extends Nodo {

    izq: Nodo;
    der: Nodo;
    operacion: string;
    constructor(izq: Nodo , operacion: any , der: Nodo , linea: any  , col: any){
        super(Tipo.any_, linea , col);
        this.izq = izq;
        this.der = der;
        this.operacion = operacion; 
    }
    ejecucion(t: Table) {// el arbol no lo paso porque manejare los errores como algo independiente de mi arbol
        if(this.der !== null){// verificando que sean 2 operandos
            const resultadoIzq = this.izq.ejecucion(t);
            if (resultadoIzq instanceof Error_){
                return resultadoIzq
            }
            const resultadoDer = this.der.ejecucion(t);
            if(resultadoDer instanceof Error_){
                return resultadoDer
            }
            // LLEGA ACA SI NINGUNO DE LOS DOS OPERADORES ES ERROR
            switch (this.operacion) {
                case "+":
                    if (this.izq.tipo === Tipo.number_ && this.der.tipo === Tipo.number_ ){// OPERACION ENTRE ENTEROS 
                        this.tipo = Tipo.number_;// porque opera binariamente de 2 en 2 entonces el resultado este tiene que seguirsiendo de tipo number
                        return resultadoIzq + resultadoDer;
                    }else if(this.izq.tipo === Tipo.string_ || this.der.tipo === Tipo.string_){// ES CONCATENACION DE STRINGS , por eso es un O´ logico
                        this.tipo = Tipo.string_;
                        return resultadoIzq + resultadoDer;// opero los que devuelve el ejecutar
                    }else{
                        return new Error_('SEMANTICO' , this.linea , ` error, no se puede operar ${this.izq} y ${this.der}`); // alt + 96 para comillas raras 
                    }// ¿Por que retorno un error , porque aun no se si ya se termino de ejecutar la expresion, eso se valida donde devuelva mi exp ?
                break;
                case"-":
                    
                break;
            
                case"*":
                    
                break;
                
                case"/":
                    
                break;
                default:
                console.log('operador desconocido');
                break;
            }
        }else{// SOLO VIENE UN OPERADOR

        }
    }

}