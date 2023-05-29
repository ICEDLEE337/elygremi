import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'oninet-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
