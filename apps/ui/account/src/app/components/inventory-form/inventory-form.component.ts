import { Component, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DefaultApi, Inventory } from '@oninet/generated/account';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InventorySearchService } from '../../services/inventory-search.service';
import { BehaviorSubject } from 'rxjs';
import { Config, SnackService } from '@oninet/ui/common';
import { MultipartContentClientService } from '../../services/multipart-content-client.service';

const defaultValidators = {validators: [Validators.required, Validators.minLength(2), Validators.maxLength(64)]};

@Component({
  selector: 'oninet-inventory-form',
  templateUrl: './inventory-form.component.html',
})
export class InventoryFormComponent {
  @Input() data: Inventory;
  isSaving = false;
  private exists$$ = new BehaviorSubject<boolean>(false);
  exists$ = this.exists$$.asObservable();
  uploaderVisible!: boolean;
  formData: FormData | null;
  files: File[] | null;
  imageDirty: boolean;
  form: FormGroup;
  save = new EventEmitter();
  cancel = new EventEmitter();

  get dirty () {
    return this.form?.dirty || this.imageDirty;
  }

  constructor(
    private snackSvc: SnackService,
    public fb: FormBuilder,
    public ref: MatDialogRef<any, any>,
    private inventorySearchSvc: InventorySearchService,
    private dialog: MatDialog,
    private multipartContentClientSvc: MultipartContentClientService
    ) {
  }

  ngOnInit(): void {
    this.form = this._buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.form && changes['data']) {
      this.form.setValue(
        this._mapDataToFormValue
          ? this._mapDataToFormValue(changes['data'].currentValue)
          : changes['data'].currentValue
      );
    }
  }

  _cancel() {
    this.cancel.emit();
  }

  onAttach($event: any) {
    this.formData = $event?.formData;
    this.files = $event?.files;
    this.imageDirty = !!this.formData;
    console.warn($event)
  }

  onDetach (uploaderVisible: boolean) {
    this.uploaderVisible = uploaderVisible;
    this.formData = null;
    this.imageDirty = true;
  }

  onUpload($event: any) {
    console.warn({$event});
  }

  async _save() {
      this.isSaving = true;

      if (this.data.azVehicleId) {
        await this.multipartContentClientSvc.putFilesAndData(this.formData || new FormData(), `inventory/${this.data.azVehicleId}`, this.form.value);
      } else {
        await this.multipartContentClientSvc.postFilesAndData(this.formData || new FormData(), `inventory`, this.form.value);
      }

      await this.inventorySearchSvc.reload();

      this.isSaving = false;

      this.save.emit();
  }

  private _buildForm(): FormGroup<any> {
    this.exists$$.next(!!this.data?.azVehicleId);
    const form = this.fb.group({
      azVehicleId: new FormControl(this.data?.azVehicleId, {validators: [Validators.required]}),
      vehicleYear: new FormControl(this.data?.vehicleYear, {validators: [Validators.required, Validators.min(1964), Validators.max(new Date().getFullYear())]}),
      vehicleMakeName: new FormControl(this.data?.vehicleMakeName, defaultValidators),
      azVehicleModelName: new FormControl(this.data?.azVehicleModelName, defaultValidators),
      azVehicleEngineName: new FormControl(this.data?.azVehicleEngineName, defaultValidators),
    });

    return form;
  }

  close() {
    this.dialog.closeAll();
  }

  private _mapDataToFormValue(data: Inventory) {
    const {
      azVehicleId,
      vehicleYear,
      vehicleMakeName,
      azVehicleModelName,
      azVehicleEngineName,
    } = data || {};

    return {
      azVehicleId,
      vehicleYear,
      vehicleMakeName,
      azVehicleModelName,
      azVehicleEngineName,
    };
  }
}
