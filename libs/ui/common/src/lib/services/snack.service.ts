import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackService {
  constructor(private snackBar: MatSnackBar) {}

  open (msg: string) {
    this.snackBar.open(msg, '', { duration: 3_000 });
  }

  oops () {
    this.open('Please try again');
  }

  saved () {
    this.open('Saved!');
  }

  deleted () {
    this.open('Deleted!');
  }
}
