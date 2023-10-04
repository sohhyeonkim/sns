import { Injectable } from '@nestjs/common';
import { TypeormUnitOfWork } from '../../libs/ddd/infrastructure/database/base-classes/typeorm-unit-of-work';
import { UserOrmEntity } from '../module/User/database/user.orm-entity';

@Injectable()
export class UnitOfWork extends TypeormUnitOfWork {
  getUserRepository(correlationId: string): IUserRepositoryPort {
    return new UserRepository(
      this.getOrmRepository(UserOrmEntity, correlationId)
    ).setCorrelationId(correlationId);
  }
}
