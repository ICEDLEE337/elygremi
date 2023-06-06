import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent, OninetCookieService } from '@oninet/ui/common';
import { MatDialog } from '@angular/material/dialog';
import { DefaultApi } from '@oninet/generated/account';
import { InventorySearchService } from '../../services/inventory-search.service';
import { tap } from 'rxjs';
import { InventoryDialogComponent } from '../../components/inventory-dialog/inventory-dialog.component';

@Component({
  selector: 'oninet-inventory-page',
  templateUrl: './inventory-page.component.html'
})
export class InventoryPageComponent extends BaseComponent implements OnInit {

    constructor(
      private router: Router,
      private cookieService: OninetCookieService,
      private dialog: MatDialog,
      public inventorySearchService: InventorySearchService,
      public api: DefaultApi
    ) {
      super();
      this.busy$$.next(true);
    }

  // doxUrl = `${environment.api}/dox`;
  doxUrl = `need-to-configure-thissss/dox`;
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
