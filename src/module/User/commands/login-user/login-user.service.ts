import { CommandHandler } from '@nestjs/cqrs';
import { CommandHandlerBase } from '../../../../../libs/ddd/domain/base-classes/command-handler.base';
import { UnitOfWork } from '../../../../unit-of-work/unit-of-work';
import type { Result } from 'oxide.ts/dist';
import { UserRepositoryPort } from '../../database/user.repository.port';
import { Err, Ok } from 'oxide.ts/dist';
import { UnauthorizedException } from '@nestjs/common';
import { LoginUserCommand } from './login-user.command';

@CommandHandler(LoginUserCommand)
export class LoginUserService extends CommandHandlerBase {
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork);
  }

  async handle(command: LoginUserCommand): Promise<
    Result<
      {
        isLogin: boolean;
      },
      Error
    >
  > {
    const { email, plainPassword, correlationId } = command;
    const userRepository: UserRepositoryPort =
      this.unitOfWork.getUserRepository(correlationId);

    const foundUser = await userRepository.findOneByEmailOrReturn(email);
    if (!foundUser?.validateHash(plainPassword)) {
      return Err(new UnauthorizedException('check email or password'));
    }

    return Ok({
      isLogin: true,
    });
  }
}
