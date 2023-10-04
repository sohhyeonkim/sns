import { RepositoryPort } from '../../../../libs/ddd/domain/ports/repository.ports';
import { UserEntity, UserProps } from '../domain/user.entity';

/* Repository port belongs to application's core / domain, but since it usually
 changes together with repository it is kept in the same directory for
 convenience. */
export interface UserRepositoryPort
  extends RepositoryPort<UserEntity, UserProps> {
  findOneByEmailOrReturn(email: string): Promise<UserEntity | undefined>;
}
