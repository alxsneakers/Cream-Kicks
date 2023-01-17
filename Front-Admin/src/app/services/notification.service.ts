import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }


  // https://stackoverflow.com/questions/52099711/how-to-add-icon-inside-the-angular-material-snackbar-in-angular-5
  openSnackBar(message:string, action){
    this.snackBar.open(message, action , {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
