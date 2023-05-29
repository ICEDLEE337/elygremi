import { UserService } from './user.service';
import { RoleService } from './role.service';
import { InvitationService } from './invitation.service';
import { PasswordResetService } from './password-reset.service';

export const services = [
  InvitationService,
  PasswordResetService,
  RoleService,
  UserService
];