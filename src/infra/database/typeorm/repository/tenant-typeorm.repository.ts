import type {
  EntityTarget,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { TenantEntityManagerContext } from '../../context/tenant-entity-manager.context';

export interface TenantScopedEntity extends ObjectLiteral {
  platformId: string;
}

export abstract class TenantTypeormRepository<TEntity extends TenantScopedEntity> {
  protected constructor(
    private readonly entityTarget: EntityTarget<TEntity>,
    private readonly tenantEntityManagerContext: TenantEntityManagerContext,
  ) {}

  private get repository(): Repository<TEntity> {
    return this.tenantEntityManagerContext.getManager().getRepository(this.entityTarget);
  }

  private withTenantId(where: FindOptionsWhere<TEntity>): FindOptionsWhere<TEntity> {
    return { ...where, platformId: this.tenantEntityManagerContext.getTenantId() };
  }

  protected createTenantQueryBuilder(alias: string): SelectQueryBuilder<TEntity> {
    const tenantId = this.tenantEntityManagerContext.getTenantId();

    return this.repository
      .createQueryBuilder(alias)
      .andWhere(`${alias}.platformId = :tenantId`, { tenantId });
  }

  protected findOneByTenant(where: FindOptionsWhere<TEntity>): Promise<TEntity | null> {
    return this.repository.findOneBy(this.withTenantId(where));
  }

  protected findByTenant(where: FindOptionsWhere<TEntity>): Promise<TEntity[]> {
    return this.repository.findBy(this.withTenantId(where));
  }

  protected existsByTenant(where: FindOptionsWhere<TEntity>): Promise<boolean> {
    return this.repository.existsBy(this.withTenantId(where));
  }

  protected async saveByTenant(entity: TEntity): Promise<TEntity> {
    const tenantId = this.tenantEntityManagerContext.getTenantId();
    const repository = this.repository;

    // 저장할 엔티티의 platformId랑 현재 요청 컨텍스트의 tenantId가 다른지 확인하기
    if (entity.platformId && entity.platformId !== tenantId) {
      throw new Error('현재 테넌트와 다른 플랫폼의 데이터는 저장할 수 없습니다.');
    }

    // 엔티티에 PK가 들어있으면, 해당 PK가 현재 테넌트에 속하는지 확인
    if (repository.hasId(entity)) {
      const entityId = repository.metadata.getEntityIdMap(entity);

      if (!entityId) {
        throw new Error('저장할 데이터의 PK를 확인할 수 없습니다.');
      }

      const belongsToTenant = await repository.existsBy(
        this.withTenantId(entityId as FindOptionsWhere<TEntity>),
      );

      if (!belongsToTenant) {
        throw new Error('현재 테넌트에 속하지 않은 데이터는 저장할 수 없습니다.');
      }
    }

    // 엔티티의 platformId를 현재 요청 컨텍스트의 tenantId로 설정
    entity.platformId = tenantId;

    return repository.save(entity);
  }
}
