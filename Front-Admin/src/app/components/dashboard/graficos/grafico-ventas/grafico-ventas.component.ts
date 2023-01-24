import { Component, OnInit } from '@angular/core';
import { single } from './data';
import { io } from 'socket.io-client';


@Component({
  selector: 'app-grafico-ventas',
  templateUrl: './grafico-ventas.component.html',
  styleUrls: ['./grafico-ventas.component.scss']
})
export class GraficoVentasComponent implements OnInit {


  single: any;
  multi: any[];
  view: [number, number]= [700, 300];

  // options
  public socket= io('http://localhost:4201');
  gradient: boolean= true;
  showLegend: boolean= true;
  showLabels: boolean= true;
  isDoughnut: boolean= false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  

  constructor() {
    Object.assign(this, {single});
  }

  


  ngOnInit(): void {
    this.socket.on('estadoVentas', (res) => {
      this.actualizarGrafico(res);
    });    
  }


  actualizarGrafico(data): void{
      this.single[0].value= parseInt(data.completado);
      this.single[1].value= parseInt(data.procesando);
      this.single[2].value= parseInt(data.cancelado);
      this.single= [...this.single]

  }



  onSelect(data): void{
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivated(data): void{
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void{
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }



}
