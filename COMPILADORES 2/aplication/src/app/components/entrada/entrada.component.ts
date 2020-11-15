import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {
  entrada: string;
  id: any = 1; // hacer statica
  idActual: any;
  entradas:any =[
    {id: 1 , entrada:'entrada numero 1', nameWindow: ''},
    {id:2 , entrada:'entrada numero 2' , nameWindow: ''}
  ];
  constructor() { 
    this.id = 1;
  }

  ngOnInit(): void {
  }

  public setText(formTextArea: any): any{
    console.log(formTextArea);
    this.entrada = formTextArea.value;
  }
  
  public excuteProgram(): any{
    let formTextArea:any = document.getElementById('home_').innerHTML
    console.log(formTextArea.value);
  }

  public addWindow(): any{
    let padreWindows = document.getElementById('padreWindows');
    let MIS_TEXTS = document.getElementById('MIS_TEXTS');
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
    
    let nuevoDiv = document.createElement('div');
    nuevoDiv.setAttribute('class','tab-pane');
    nuevoDiv.setAttribute('id','window_'+this.id);
      let tArea = document.createElement('textarea');
      
      tArea.value = "HAY ALGO DE TEXTO EN ---> "+ this.id;
      
      tArea.setAttribute('rows','5');
      tArea.setAttribute('class','form-control');
    nuevoDiv.appendChild(tArea);
    MIS_TEXTS.appendChild(nuevoDiv);
    
  
    this.id++;
    console.log(a.getAttribute('href'));
  }

  public verWindow(id_:any): any {
    this.idActual = id_;
    console.log('ID ACTUAl:', this.idActual);
  }

}
