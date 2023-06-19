import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { DefaultApi, Invitation, Org, User } from '@oninet/generated/account';
import { BaseComponent, SnackService } from '@oninet/ui/common';

@Component({
  templateUrl: './admin-org-page.component.html',
})
export class AdminOrgPageComponent extends BaseComponent implements OnInit {
  user: User;
  org: Org;
  updatedOrg: Org;
  valid = false;
  dirty = false;
  orgId: string;
  invites: Invitation[];
  claims: any;
  users: User[];
  anonUsers: User[];

  constructor(
    private snackBar: SnackService,
    private api: DefaultApi,
    private router: Router,
    private route: ActivatedRoute,
    // private claimsSvc: ClaimService
  ) {
    super();
  }

  async ngOnInit() {
    this.claims = {isSysAdmin: true}; //this.claimsSvc.get();
    this.orgId = this.route.snapshot.paramMap.get('id') as string;
    this.filterInvites((await this.api.adminInvitationControllerIndex()).data);
    this.org = (await this.api.adminOrgControllerGet(this.orgId)).data;
  }

  filterInvites(invites: Invitation[]) {
    this.invites = invites.filter((i) => i.orgId === this.orgId);
  }

  async save() {
    this.busy$$.next(true);
    try {
      this.busy$$.next(true);
      await this.api.adminOrgControllerPut(this.orgId, this.updatedOrg);
      this.snackBar.saved();
      this.dirty = false;
    } catch (error) {
      this.snackBar.oops();
    }
    this.busy$$.next(false);
  }

  async deleteOrg(org: Org) {
    this.busy$$.next(true);
    await this.api.adminOrgControllerDelete(org.id);
    this.router.navigateByUrl('system/orgs');
  }

  async valueChange(org: Org) {
    this.updatedOrg = org;
    this.dirty = true;
  }

  statusChange(valid: boolean) {
    this.valid = valid;
  }

  editUser(user: User) {
    if (user?.id) {
      this.router.navigateByUrl(`admin/user/${user.id}`);
    }
  }

  async deleteUser(user: User) {
    this.busy$$.next(true);
    try {
      await this.api.adminUserControllerDelete(user.id);
      this.snackBar.deleted();
      this.org.users = this.org.users?.filter((u) => u.id !== user.id);
    } catch (error) {
      console.warn({ error, msg: `failed to delete user ${user?.id}` });
      this.snackBar.oops();
    }
    this.busy$$.next(false);
  }

  addUser() {
    this.router.navigateByUrl(`admin/add/user/${this.orgId}`);
  }

  async deleteInvite(invite: Invitation) {
    this.busy$$.next(true);
    try {
      await this.api.adminInvitationControllerDelete(invite.email);
      this.snackBar.deleted();
      this.filterInvites(this.invites.filter((i) => i.email !== invite.email));
    } catch (error) {
      console.warn({ error, msg: `failed to delete invite ${invite?.email}` });
      this.snackBar.oops();
    }
    this.busy$$.next(false);
  }

  createUser() {
    this.router.navigateByUrl(`admin/create/user/${this.orgId}`);
  }
}
