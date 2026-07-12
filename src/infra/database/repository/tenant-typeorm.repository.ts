import type { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { TenantEntityManagerContext } from '../context/tenant-entity-manager.context';

export abstract class TenantTypeormRepository<TEntity extends ObjectLiteral> {
  protected constructor(
    private readonly entityTarget: EntityTarget<TEntity>,
    private readonly tenantEntityManagerContext: TenantEntityManagerContext,
  ) {}

  protected get repository(): Repository<TEntity> {
    return this.tenantEntityManagerContext.getManager().getRepository(this.entityTarget);
  }
}
