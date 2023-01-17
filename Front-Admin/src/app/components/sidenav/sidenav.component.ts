import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { INavbarData } from './helper';
import { navbarData } from './nav-data';


interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInout', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed= true;
  screenWidth= 0;
  navData= navbarData;
  multiple: boolean= false;

  @Input()
    userName: any;


  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.screenWidth = window.innerHeight;
    if(this.screenWidth <= 768){
      this.collapsed= false;
    }
  }

  ngOnInit(): void{
    this.screenWidth = window.innerHeight;
  }




  constructor(private loginSvc: LoginService) { }
 

  // indica si la barra lateral se encuentra open/close.
  closeSidenav() :void {
    this.collapsed= false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  // cambia el estado de la barra lateral.
  toggleCollapsed() : void{
    this.collapsed= !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  handleClick(item: INavbarData): void{
    if(!this.multiple){
      for(let modelItem of this.navData){
        if(item !== modelItem && modelItem.expanded){
          modelItem.expanded= false;
        }
      }
    }
    item.expanded = !item.expanded; 
  }


  
  // cierra la sesión actual
  logout(){
    this.loginSvc.logOut()
  }

  

  
  
  



  

}


