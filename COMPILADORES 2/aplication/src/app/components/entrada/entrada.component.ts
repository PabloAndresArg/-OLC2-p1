import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {
  entradaAnalizar: string;
  id = 1; 
  content: string; 
  constructor() { 
  }

  ngOnInit(): void {
  }

  public setText(formTextArea: any): any{
    if (formTextArea.value.length == 1){
      let aux = formTextArea.value;
      formTextArea.value = '\t';
      formTextArea.value += aux;
    }
    this.entradaAnalizar = formTextArea.value;
  }
  
  public excuteProgram(formTextArea: any): any{
    console.log('Analizando: ' , formTextArea.value);
  }

  public addWindow(): any{
    if(this.id < 9 ){
      let padreWindows = document.getElementById('padreWindows');
      // preparando el nuevo elemento
      let nuevoLI = document.createElement('li');
      nuevoLI.setAttribute('class','nav-item');
        // creamos la etiqueta a 
        let a = document.createElement('a');
        a.setAttribute('data-toggle','tab');
        a.setAttribute('class','nav-link');
        a.setAttribute('href','#window_'+this.id);
        a.innerHTML='P'+this.id;// da texto 
        nuevoLI.appendChild(a);
        padreWindows.appendChild(nuevoLI);

      
        this.id++;
        console.log(a.getAttribute('href'));
    }
  }



}
