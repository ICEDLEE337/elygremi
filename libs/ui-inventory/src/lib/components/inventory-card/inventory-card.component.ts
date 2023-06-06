import { Component, Input } from "@angular/core";
import { Inventory } from "@oninet/generated/account";

@Component({
  selector: 'oninet-inventory-card',
  templateUrl: './inventory-card.component.html'
})
export class InventoryCardComponent {
  @Input() data!: Inventory;
}