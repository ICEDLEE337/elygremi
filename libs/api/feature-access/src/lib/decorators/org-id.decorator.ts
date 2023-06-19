import { decode } from '@onivoro/server-common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { parseClaims } from '../functions/parse-claims.function';
import { identityTokenKey } from '@onivoro/server-aws-auth';

export const OrgId = createParamDecorator(function (
  _data: any,
  ctx: ExecutionContext
) {
  const request = ctx.switchToHttp().getRequest();

  return parseClaims(decode(request[identityTokenKey])).orgId;
});
