import { Component, OnInit } from '@angular/core';
import { DefaultApi, Invitation } from '@oninet/generated/account';
import { BaseComponent, SnackService } from '@oninet/ui/common';
import { InvitationEmailResendService } from '../../services/invitation-email-resend.service';

@Component({
  templateUrl: './system-invitations-page.component.html',
})
export class SystemInvitationsPageComponent
  extends BaseComponent
  implements OnInit
{
  invitations: Invitation[];

  constructor(
    private api: DefaultApi,
    private snackBar: SnackService,
    public resendService: InvitationEmailResendService
  ) {
    super();
  }

  async deleteInvitation(invitation: Invitation) {
    this.busy$$.next(true);
    await this.api.adminInvitationControllerDelete(invitation.email);
    this.invitations = this.invitations.filter(
      (i) => i.email !== invitation.email
    );
    this.busy$$.next(false);
    this.snackBar.deleted();
  }

  async ngOnInit() {
    await this.loadInvitations();
  }

  async loadInvitations() {
    this.invitations = (await this.api.adminInvitationControllerIndex()).data;
  }
}
