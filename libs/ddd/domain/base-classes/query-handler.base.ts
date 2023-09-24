import type { QueryBase } from '@libs/ddd/domain/base-classes/query.base';
import type { Result } from 'oxide.ts/dist';

export abstract class QueryHandlerBase {
  // For consistency with a CommandHandlerBase and DomainEventHandler
  abstract handle(query: QueryBase): Promise<Result<unknown, Error>>;

  execute(query: QueryBase): Promise<Result<unknown, Error>> {
    return this.handle(query);
  }
}
