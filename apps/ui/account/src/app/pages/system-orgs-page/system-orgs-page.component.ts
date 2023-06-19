import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, Org, DefaultApi } from '@oninet/generated/account';
import { BaseComponent, SnackService } from '@oninet/ui/common';

@Component({
  templateUrl: './system-orgs-page.component.html',
})
export class SystemOrgsPageComponent extends BaseComponent implements OnInit {
  user: User;
  org: Org;
  orgs: Org[];

  constructor(
    private snackBar: SnackService,
    private api: DefaultApi,
    private router: Router
  ) {
    super();
  }

  async ngOnInit() {
    this.user = (await this.api.userControllerGet()).data;
    this.org = this.user.org as Org;
    await this.loadOrgs();
  }

  async loadOrgs() {
    this.orgs = [];
    this.orgs = (await this.api.adminOrgControllerIndex()).data;
  }

  async editOrg(org: Org) {
    if (org?.id) {
      this.router.navigate(['admin', 'org', org.id]);
    }
  }

  createOrg() {
    this.router.navigate(['system', 'create', 'org']);
  }

  async deleteOrg(org: Org) {
    this.busy$$.next(true);
    try {
      await this.api.adminOrgControllerDelete(org.id as string);
      this.busy$$.next(false);
      await this.loadOrgs();
      this.snackBar.deleted();
    } catch (error) {
      this.snackBar.oops();
    }
  }
}
