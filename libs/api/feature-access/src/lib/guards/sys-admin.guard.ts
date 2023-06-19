import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { accessTokenKey, identityTokenKey } from '@onivoro/server-aws-auth';
import { decode } from '@onivoro/server-common';
import { Observable } from 'rxjs';


@Injectable()
export class SysAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const hasToken = !!request[accessTokenKey];

    if (!hasToken) {
      console.warn(`${SysAdminGuard.name}: token missing`);
    }

    const idToken: string = request[identityTokenKey];

    // todo: implement claims
    return false;
  }
}
