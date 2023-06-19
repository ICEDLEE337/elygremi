import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { decode } from '@onivoro/server-common';
import { accessTokenKey, identityTokenKey } from '@onivoro/server-aws-auth';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const hasToken = !!request[accessTokenKey];

    if (!hasToken) {
      console.warn(`${AdminGuard.name}: token missing`);
    }

    const idToken: string = request[identityTokenKey];

    // todo: implement claims
    return false;
  }
}
