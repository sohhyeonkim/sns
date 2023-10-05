import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryParams } from '../../../../libs/ddd/domain/ports/repository.ports';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '../../../../libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import { UserEntity, UserProps } from '../domain/user.entity';
import { UserOrmEntity } from './user.orm-entity';
import { UserOrmMapper } from './user.orm-mapper';
import { UserRepositoryPort } from './user.repository.port';

@Injectable()
export class UserRepository
  extends TypeormRepositoryBase<UserEntity, UserProps, UserOrmEntity>
  implements UserRepositoryPort
{
  protected relations: string[] = [];

  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>
  ) {
    super(
      userRepository,
      new UserOrmMapper(UserEntity, UserOrmEntity),
      new Logger('UserRepository')
    );
  }

  async findOneByEmailOrReturn(email: string) {
    const found = await this.findOne({
      email,
    });
    return found;
  }

  // Used to construct a query
  protected prepareQuery(
    params: QueryParams<UserProps>
  ): WhereCondition<UserOrmEntity> {
    const where: QueryParams<UserOrmEntity> = {};

    if (params.id) {
      where.id = params.id;
    }

    if (params.email) {
      where.email = params.email;
    }

    return where;
  }
}
