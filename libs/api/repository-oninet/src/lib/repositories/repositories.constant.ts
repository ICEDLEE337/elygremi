import { InventoryRepository } from './inventory.repository';
import { InvitationRepository } from './invitation.repository';
import { PasswordResetRepository } from './password-reset.repository';
import { RoleRepository } from './role.repository';
import { UserRepository } from './user.repository';
import { VideoRepository } from './video.repository';

export const repositories = [
  InventoryRepository,
  InvitationRepository,
  PasswordResetRepository,
  RoleRepository,
  UserRepository,
  VideoRepository
];
