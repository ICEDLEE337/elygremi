import { Injectable } from '@angular/core';
import { DefaultApi } from '@oninet/generated/account';
import { SnackService } from '@oninet/ui/common';

@Injectable({ providedIn: 'root' })
export class InvitationEmailResendService {
  constructor(private api: DefaultApi, private snackBar: SnackService) {}

  async resend(email: string) {
    try {
      await this.api.userInvitationControllerResendEmail({ email });
      this.snackBar.open(`Invitation resent to ${email}`);
    } catch (error: any) {
      this.snackBar.oops();
    }
  }
}
