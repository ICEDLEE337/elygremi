import { decode } from '@onivoro/server-common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { identityTokenKey } from '@onivoro/server-aws-auth';
import { parseClaims } from '../functions/parse-claims.function';

export const IsSysAdmin = createParamDecorator(function (
  _data: any,
  ctx: ExecutionContext
) {
  const request = ctx.switchToHttp().getRequest();

  return parseClaims(decode(request[identityTokenKey])).isSysAdmin;
});
