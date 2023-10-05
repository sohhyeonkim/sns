import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { match, Result } from 'oxide.ts/dist';
import { routesV1 } from '../../../../infrastructure/configs/app.routes';
import { LoginUserDto } from './dto/login-user.request.dto';
import { LoginUserCommand } from './login-user.command';

@Controller(routesV1.version)
@ApiTags('user')
export class LoginUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.user.root.login)
  @ApiOperation({ summary: '유저 로그인' })
  @ApiOkResponse({
    description: '유저 정보와 토큰',
  })
  async loginUser(@Body() body: LoginUserDto) {
    const command = new LoginUserCommand({
      ...body,
    });

    const result: Result<
      {
        isLogin: boolean;
      },
      UnauthorizedException | Error
    > = await this.commandBus.execute(command);

    return match(result, {
      Ok: (data) => data,
      Err: (error) => {
        throw error;
      },
    });
  }
}
