import { Injectable } from '@nestjs/common';
import { Nullable } from 'src/common/type/native';
import { TenantEntityManagerContext } from 'src/infra/database/context/tenant-entity-manager.context';
import { TenantTypeormRepository } from 'src/infra/database/typeorm/repository/tenant-typeorm.repository';
import { PlatformEntity } from '../entity/platform.entity';

@Injectable()
export class PlatformRepository extends TenantTypeormRepository<PlatformEntity> {
  constructor(tenantEntityManagerContext: TenantEntityManagerContext) {
    super(PlatformEntity, tenantEntityManagerContext);
  }

  async save(platform: PlatformEntity): Promise<PlatformEntity> {
    return this.saveByTenant(platform);
  }

  async findCurrent(): Promise<Nullable<PlatformEntity>> {
    return this.findOneByTenant({});
  }

  async existsCurrent(): Promise<boolean> {
    return this.existsByTenant({});
  }
}
