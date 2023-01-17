import { Component } from '@angular/core';

// sidenav
interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Cream Kicks';


  // sidenav
  isSidenavCollapsed= false;
  screenWidth= 0;

  // sidenav
  onToggleSideNav(data: SideNavToggle): void{
    this.screenWidth= data.screenWidth;
    this.isSidenavCollapsed= data.collapsed;
  }
}
