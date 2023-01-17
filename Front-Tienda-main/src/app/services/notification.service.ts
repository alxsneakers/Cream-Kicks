import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message:string, action){
    this.snackBar.open(message, action , {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
}
