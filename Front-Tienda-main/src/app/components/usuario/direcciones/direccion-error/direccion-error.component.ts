import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-direccion-error',
  templateUrl: './direccion-error.component.html',
  styleUrls: ['./direccion-error.component.css']
})
export class DireccionErrorComponent {

  @Input()
  error: Error | null = null;
}
