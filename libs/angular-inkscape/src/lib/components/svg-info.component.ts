import { Component, Inject } from "@angular/core";
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
  } from '@angular/material/dialog';

@Component({
    template: `
    <div class="flex flex-col">
        <div class="text-2xl font-bold">{{data.title}}</div>
        <div class="flex flex-row justify-between"><div class="text-xl">SKU: </div><div>{{data.sku}}</div></div>
        <div class="flex flex-row justify-between"><div class="text-xl">BOM ID: </div><div>{{data.bomId}}</div></div>
        <div class="flex flex-row justify-between"><div class="text-xl">QTY: </div><div>{{data.qty}}</div></div>
    </div>
    `
})
export class SvgInfoComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}