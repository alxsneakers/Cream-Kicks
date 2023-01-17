import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found-item',
  template: `<div class="container">
  <h2>Oops! {{name}} no encontrado.</h2>
  <h1>404</h1>
  <a routerLink="{{ruta}}">Volver</a>
</div>
`,
  styleUrls: ['./not-found-item.component.scss']
})
export class NotFoundItemComponent {

  @Input()
  name: String | null=null;

  @Input()
  ruta: String | null=null;
}
