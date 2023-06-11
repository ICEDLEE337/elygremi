import { AfterViewInit, Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent, OninetCookieService } from '@oninet/ui/common';
import { MatDialog } from '@angular/material/dialog';
import { DefaultApi } from '@oninet/generated/account';
import { InventorySearchService } from '../../services/inventory-search.service';
import { tap } from 'rxjs';
import { InventoryDialogComponent } from '../../components/inventory-dialog/inventory-dialog.component';
import * as panzoom from "panzoom";
import { SvgService } from '@onivoro/angular-inkscape';

@Component({
  selector: 'oninet-schematic-page',
  templateUrl: './schematic-page.component.html'
})
export class SchematicPageComponent extends BaseComponent implements OnInit, AfterViewInit {

    constructor(
      private router: Router,
      private cookieService: OninetCookieService,
      private dialog: MatDialog,
      public inventorySearchService: InventorySearchService,
      public api: DefaultApi,
      public svgSvc: SvgService,
    ) {
      super();
      this.busy$$.next(true);
    }

  ngAfterViewInit(): void {
    panzoom.default(document.querySelector('#svg') as any);
  }

  closeModal$ = this.inventorySearchService.data$.pipe(tap(() => this.dialog.closeAll()))

  async ngOnInit() {
    this.subscriptions.push(this.closeModal$.subscribe());
    this.busy$$.next(true);
    await this.inventorySearchService.search(0);
    this.busy$$.next(false);
  }

  create() {
    this.dialog.open(InventoryDialogComponent, {data: {value: {}, isEditing: true}, minWidth: '300px',  maxWidth: '1000px', width: '90%', maxHeight: '98vh'});
  }

  async logout() {
    try {
      await this.api.authControllerLogout();
      this.cookieService.deleteSessionTokens();
      this.router.navigate(['login']);
    } catch (error: any) {
      console.warn(error);
    }
  }
}
