import { InventoryRepository } from './inventory.repository';
import { InvitationRepository } from './invitation.repository';
import { OrgRepository } from './org.repository';
import { PasswordResetRepository } from './password-reset.repository';
import { UserRepository } from './user.repository';

export const repositories = [
  InventoryRepository,
  InvitationRepository,
  OrgRepository,
  PasswordResetRepository,
  UserRepository,
];
