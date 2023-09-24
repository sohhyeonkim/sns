import { ApiResponseProperty } from '@nestjs/swagger';

export class LogoutUserResponse {
  constructor(isLoggedOut: boolean) {
    this.isLoggedOut = isLoggedOut;
  }

  @ApiResponseProperty()
  readonly isLoggedOut: boolean;
}
