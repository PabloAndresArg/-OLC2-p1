import { showConsola } from "../Auxiliar/listaShowConsola";
import { ListaErrores } from "../Errors/listaErrores";
import { Table } from "../Tabla/table";
import { Nodo } from "./nodo";

export class Arbol{
    
    hijos: Array<Nodo>;
    errores: any; 
    constructor(instrucciones:  Array<Nodo>){// le pasare los errores
       this.hijos = instrucciones;
       this.errores = ListaErrores.errores;
       showConsola.salida = "";// cada vez que genere un arbol nuevo haré una nueva ejecucion
    }

    ejecutarArbol():string{ 
         const t:Table = new Table(null);
         this.hijos.map((m:any) =>{  
           const res = m.ejecucion(t);
         });
         return showConsola.salida; 
     }
} 