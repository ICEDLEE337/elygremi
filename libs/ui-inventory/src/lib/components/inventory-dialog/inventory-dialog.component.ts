import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Inventory } from '@oninet/generated/account';

@Component({
  selector: 'oninet-inventory-dialog',
  templateUrl: './inventory-dialog.component.html',
})
export class InventoryDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {isEditing: boolean, value: Inventory}) {}
}
