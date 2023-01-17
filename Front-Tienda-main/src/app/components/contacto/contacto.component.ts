import { Component, OnInit } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {


  public contacto: any= {};
  public load_btn: boolean= false;

  constructor(private _guestService: GuestService) { }

  ngOnInit(): void {
  }


  registro(registroForm){
    if(registroForm.valid){
      this.load_btn= true;
      this._guestService.enviar_mensaje_contacto(this.contacto).subscribe(
        response =>{
          this.contacto= ''; // vacio el formulario
          this.load_btn=false;
        }
      )
    }
  }

}
