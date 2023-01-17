import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CuponService } from 'src/app/services/cupon.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-update-cupon',
  templateUrl: './update-cupon.component.html',
  styleUrls: ['./update-cupon.component.scss']
})
export class UpdateCuponComponent implements OnInit {


  // variables
  formUpdateCupon!: FormGroup;
  public id;
  public cupon;

  constructor(private fb: FormBuilder, private cuponSvc: CuponService, private router: ActivatedRoute, private notificationSvc: NotificationService, private routerNormal: Router) { }


  ngOnInit(): void { // inicia la validacion
    this.formUpdateCupon= this.initForm();
    // obtengo el id del parametro url
    this.router.params.subscribe(params =>{
      this.id= params['id'];
    });
    // rellena los datos del formulario con el cupon.
    this.cuponSvc.obtenerCupon(this.id).subscribe(cupon =>{
      this.cupon=cupon;
      this.colocarInfo(cupon);
    }, error =>{
      console.log(error);
    })
  }

  // valida el formulario
  initForm(): FormGroup{
    return this.fb.group({
      codigo: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      limite: ['', [Validators.required]]
    });
  }

  // vuelve a colocar la informacion del cupon en el formulario.
  colocarInfo(data){
    this.formUpdateCupon.get('codigo').setValue(data.codigo);
    this.formUpdateCupon.get('tipo').setValue(data.tipo);
    this.formUpdateCupon.get('valor').setValue(data.valor);
    this.formUpdateCupon.get('limite').setValue(data.limite);
  }

  // actualiza el cupon
  updateCupon(){
    this.cuponSvc.actualizarCupon(this.formUpdateCupon.value, this.id).subscribe({
      next: data =>{
        this.notificationSvc.openSnackBar(data.message, 'x');
        this.routerNormal.navigate(['/cupones']);
      },
      error: error =>{
        this.notificationSvc.openSnackBar(error.error.message, 'x');        
      }
    });
  }
}
