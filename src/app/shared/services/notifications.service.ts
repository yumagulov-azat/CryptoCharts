import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationsService {

  constructor(private snackBar: MatSnackBar) { }

  show(message: string = '', btnText: string = 'OK', duration: number = 3000): void {
    this.snackBar.open(message, btnText, {
      duration: duration
    });
  }
}
