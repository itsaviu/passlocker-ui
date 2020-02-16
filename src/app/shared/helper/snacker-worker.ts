import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

export const STATUS =  {
  SUCCES: "success-snackbar",
  FAIL: "red-snackbar"
}

@Injectable()
export class SnackerWorker {

  constructor(private _snackBar: MatSnackBar ) { }
  

  
  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: [className]
    });
  }

  openAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}
