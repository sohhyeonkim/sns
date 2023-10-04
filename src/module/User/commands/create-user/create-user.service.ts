import { CommandBus, CommandHandler } from '@nestjs/cqrs';
import { CommandHandlerBase } from '../../../../../libs/ddd/domain/base-classes/command-handler.base';
import { UnitOfWork } from '../../../../unit-of-work/unit-of-work';
import { CreateUserCommand } from './create-user.command';
import type { Result } from 'oxide.ts/dist';
import { UserEntity } from '../../domain/user.entity';
import { UserRepositoryPort } from '../../database/user.repository.port';
import { Err, Ok } from 'oxide.ts/dist';
import { ConflictException } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserService extends CommandHandlerBase {
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork);
  }

  async handle(command: CreateUserCommand): Promise<
    Result<
      {
        user: UserEntity;
      },
      Error
    >
  > {
    const {
      email,
      password,
      birth,
      nickname,
      gender,
      correlationId,
      causationId,
      id,
    } = command;
    const userRepository: UserRepositoryPort =
      this.unitOfWork.getUserRepository(correlationId);

    const foundUser = await userRepository.findOneByEmailOrReturn(email);
    if (!foundUser) {
      return Err(new ConflictException('user exists'));
    }

    const createdUser = UserEntity.create({
      email,
      password,
      birth,
      nickname,
      gender,
    });

    await userRepository.save(createdUser);

    return Ok({
      user: createdUser,
    });
  }
}
