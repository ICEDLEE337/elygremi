import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Inventory } from '@oninet/generated/account';
import { InventoryDialogComponent } from '../inventory-dialog/inventory-dialog.component';

@Component({
  selector: 'oninet-inventory-table',
  templateUrl: './inventory-table.component.html',
})
export class InventoryTableComponent {
  @Input() inventory: Inventory[];
  @Input() loading: boolean;

  constructor(private router: Router, private dialog: MatDialog) {}

  async navigateTo(value: Inventory) {
    this.dialog.open(InventoryDialogComponent, {data: {value, isEditing: false}, minWidth: '300px',  maxWidth: '1000px', width: '90%', maxHeight: '98vh'})
  }
}
