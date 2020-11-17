import { Component, OnInit } from '@angular/core';
import jison from "./../../../GRAMATICA/olc2";
import * as File_ from 'file-saver';
import {saveAs} from 'file-saver';
@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {
  public entradaAnalizar: string;
  public id = 1; 
  // -------------------
  public contentFile: any;
  public file:any; 
  public unlocown:any; 
  // -------------------
  public entradas:any = [];
  public cantidadPestanias: number = 9;
  constructor() {
    for (let i = 0 ; i < this.cantidadPestanias ; i++) {
      this.entradas.push('\t');
    } 
   
  }

  ngOnInit(): void {
    for (let i = 1 ; i < this.cantidadPestanias ; i++) {
      this.entradas[i] ='\t';
    } 
  }

  
  public excuteProgram(entrada_: string): any{
    console.log('Analizando: ' , entrada_);
    try {
      let arbol = jison.parse(entrada_);
      console.log(arbol);
    } catch (error) {
      console.log(error);
    }
  }

  public addWindow(): any{
    if(this.id < this.cantidadPestanias){
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


  // .................. ARCHIVOS 

  SA_VE(indice: any){
    try{ 
    let entrada_save = new Blob([ this.entradas[indice] ], { type: "text/csv;charset=utf-8" });
    saveAs(entrada_save, "Entrada_.txt");
    alert("Entrada guardada correctamente");
  }catch(e){
    alert("algo salio mal..");
  }
  }

  fileChanged(e , indice:any) {
  this.file = e.target.files[0];
  this.uploadDocument(indice);
  }
  uploadDocument(indice : any){
  let fileReader = new FileReader(); 
  fileReader.onload = (e) =>{
  this.entradas[indice] = fileReader.result;
  }
  fileReader.readAsText(this.file);
  }




}
