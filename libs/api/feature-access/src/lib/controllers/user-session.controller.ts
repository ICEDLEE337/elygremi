import { Controller, Get } from '@nestjs/common';
import { AccessToken, IAccessToken } from '@onivoro/server-aws-auth';
import { ApiResponse } from '@nestjs/swagger';
import { UserIdDto } from '@onivoro/server-common';

@Controller('user-session')
export class UserSessionController {
  @Get()
  @ApiResponse({ type: UserIdDto })
  get(@AccessToken() token: IAccessToken): UserIdDto {
    // This method is useful when a token is optional.
    // The purpose here is to validate the token without using the AuthGuard
    // bc AuthGuard will return 403 (lol should be 401 but it's 403) and redirect the user.
    // Nonetheless, the middleware will hydrate the source for @AccessToken if-and-only-if it's valid
    // which means that if the @AccessToken decorator supplies a value, the user is working w/ a valid token
    // from which we can pull the userId and return it.
    return { userId: token?.sub };
  }
}
