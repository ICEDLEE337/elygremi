import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultApi, Org } from '@oninet/generated/account';
import { BaseComponent, SnackService } from '@oninet/ui/common';

@Component({
  templateUrl: './system-org-create-page.component.html',
})
export class SystemOrgCreatePageComponent
  extends BaseComponent
  implements OnInit
{
  orgToCreate: Org;
  valid = false;
  dirty = false;

  constructor(
    private snackBar: SnackService,
    private api: DefaultApi,
    private router: Router
  ) {
    super();
  }

  async ngOnInit() {}

  async save() {
    try {
      this.busy$$.next(true);
      const newOrg = (await this.api.adminOrgControllerPost(this.orgToCreate))
        .data;
      this.snackBar.saved();
      this.dirty = false;
      this.router.navigate(['admin', 'org', newOrg.id]);
    } catch (error) {
      this.snackBar.oops();
    }
    this.busy$$.next(false);
  }

  back() {
    this.router.navigate(['/']);
  }

  async valueChange(org: Org) {
    this.orgToCreate = org;
    this.dirty = true;
  }
  statusChange(valid: boolean) {
    this.valid = valid;
  }
}
