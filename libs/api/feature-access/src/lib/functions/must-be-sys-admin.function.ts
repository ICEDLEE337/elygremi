import { Org, User } from '@oninet/api/repository-oninet';
import { ConflictException } from '@nestjs/common';

export function mustBeSysAdmin(user: User, org?: Org) {
  if (!user.isAdmin) {
    throw new ConflictException(
      `User ${user.id} must be an administrator to perform this function`
    );
  }

  const orgToEvaluate = org || user.org;

  if (!orgToEvaluate.isAdmin) {
    throw new ConflictException(
      `Org ${orgToEvaluate.id} must be an administrator org for user ${user.id} to perform this function`
    );
  }
}
