import { UserService } from './user.service';
import { InvitationService } from './invitation.service';
import { PasswordResetService } from './password-reset.service';
import { OrgService } from './org.service';

export const services = [
  InvitationService,
  OrgService,
  PasswordResetService,
  UserService,
];