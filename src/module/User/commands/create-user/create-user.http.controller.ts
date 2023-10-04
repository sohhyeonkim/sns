import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { match, Result } from 'oxide.ts/dist';
import { routesV1 } from '../../../../infrastructure/configs/app.routes';
import { UserEntity } from '../../domain/user.entity';
import { CreateUserCommand } from './create-user.command';
import { CreateUserDto } from './dto/create-user.request.dto';

@Controller(routesV1.version)
@ApiTags('user')
export class CreateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.user.root.create)
  @ApiOperation({ summary: '유저 회원가입' })
  @ApiOkResponse({
    description: '유저 정보와 토큰',
  })
  async createUser(@Body() body: CreateUserDto) {
    const command = new CreateUserCommand({
      ...body,
    });

    const result: Result<
      {
        user: UserEntity;
      },
      ConflictException | Error
    > = await this.commandBus.execute(command);

    return match(result, {
      Ok: ({ user }) => user,
      Err: (error) => {
        throw error;
      },
    });
  }
}
