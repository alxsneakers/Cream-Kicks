import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  

  @Input() collapsed= false;
  @Input() screenWidth=0;

  isSidenavCollapsed= false;




  /* Cambio el estilo de la barra lateral dependiendo 
    del tamanio de la pantalla.
  */
  getBodyClass(): string{
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768){
      styleClass= 'body-mobile'
    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = 'body-desktop-screen'
    }
    return styleClass;
  }

  

}
