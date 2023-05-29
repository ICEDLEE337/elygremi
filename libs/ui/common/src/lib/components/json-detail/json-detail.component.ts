import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'oninet-json-detail',
  templateUrl: './json-detail.component.html',
  styleUrls: ['./json-detail.component.scss'],
})
export class JsonDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
