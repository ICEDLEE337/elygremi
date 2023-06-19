import { User } from '@oninet/api/repository-oninet';
import { ConflictException } from '@nestjs/common';

export function mustBeAdmin(user: User) {
  if (!user.isAdmin) {
    throw new ConflictException(
      `User ${user.id} must be an administrator to perform this function`
    );
  }
}
