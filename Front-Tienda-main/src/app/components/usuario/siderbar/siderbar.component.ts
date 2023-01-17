import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent implements OnInit {
  public token;
  public id;
  public user : any = {};
  public user_lc : any = undefined;
  
  constructor(
    private _clienteService : ClienteService
  ) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');

    // servicio para obtener cliente
    if(this.token){
      this._clienteService.obtener_cliente_guest(this.id,this.token).subscribe(
        response=>{
          this.user = response.data;
          if(localStorage.getItem('user_data')){
            this.user_lc= this.user;
          }else{
            this.user_lc= undefined;
          }
        },error=>{
          console.log(error);
          this.user = undefined;
        }
      ); 
    }
  }

  ngOnInit(): void {
  }

}
