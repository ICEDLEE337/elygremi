import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, Org, DefaultApi } from '@oninet/generated/account';
import { BaseComponent, SnackService } from '@oninet/ui/common';

@Component({
  templateUrl: './system-users-page.component.html',
})
export class SystemUsersPageComponent extends BaseComponent implements OnInit {
  user: User;
  org: Org;
  users: User[];

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
    await this.loadUsers();
  }

  async loadUsers() {
    this.users = [];
    this.users = (await this.api.adminUserControllerIndex()).data.filter(
      (u) => u.id !== this.user.id
    );
  }

  editUser(user: User) {
    if (user?.id) {
      this.router.navigateByUrl(`admin/user/${user.id}`);
    }
  }

  async deleteUser(user: User) {
    this.busy$$.next(true);
    try {
      await this.api.adminUserControllerDelete(user.id as string);
      this.busy$$.next(false);
      await this.loadUsers();
      this.snackBar.deleted();
    } catch (error) {
      this.snackBar.oops();
    }
  }

  create() {
    this.router.navigateByUrl(`admin/create/user`);
  }
}
