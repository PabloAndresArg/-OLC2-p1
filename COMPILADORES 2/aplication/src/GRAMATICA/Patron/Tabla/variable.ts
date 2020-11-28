import { Tipo } from '../Abstracto/tipo';
export class Variable {
    id: string;
    tipo: Tipo; 
    reasing: boolean; 
    value: any;
    constructor(id: string, tipo: Tipo , reasing: boolean , val: any){
        this.id = id;
        this.tipo = tipo; 
        this.reasing = reasing;
        this.value = val; 
    }

    private getTipo(): Tipo{ return this.tipo;}
    private setTipo(t: Tipo): void{ this.tipo = t;}
    private getReasing():boolean{return this.reasing;} 
}