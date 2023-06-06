import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Inventory } from '@oninet/generated/account';
import { InventorySearchService } from '../../services/inventory-search.service';

@Component({
  selector: 'oninet-search-form',
  templateUrl: './search-form.component.html',
})
export class SearchFormComponent implements OnInit {
  form!: FormGroup;
  isSaving!: boolean;

  constructor(public fb: FormBuilder, private inventorySearchSvc: InventorySearchService) {}

  ngOnInit(): void {
    this.form = this._buildForm();
  }

  _buildForm(): FormGroup<any> {
    const form = this.fb.group({
      term: new FormControl(null),
    });

    return form;
  }

  async search() {
    this.isSaving = true;
    this.inventorySearchSvc.term$$.next(this.form.value['term'])
    await this.inventorySearchSvc.search(0);
    this.isSaving = false;
  }

  _mapDataToFormValue(data: Inventory) {
    return data;
  }
}
