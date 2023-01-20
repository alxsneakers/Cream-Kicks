import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  

  @Input() collapsed= false;
  @Input() screenWidth=0;

  isSidenavCollapsed= false;




  /* Cambio el estilo de la barra lateral dependiendo 
    del tamanio de la pantalla.
  */
  // getBodyClass(): string{
  //   let styleClass = '';
  //   if(this.collapsed && this.screenWidth > 768){
  //     styleClass= 'body-mobile'
  //   }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
  //     styleClass = 'body-desktop-screen'
  //   }
  //   return styleClass;
  // }

  

}
