import { Injectable } from '@nestjs/common';
import { Nullable } from 'src/common/type/native';
import { TenantEntityManagerContext } from 'src/infra/database/context/tenant-entity-manager.context';
import { TenantTypeormRepository } from 'src/infra/database/repository/tenant-typeorm.repository';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserRepository extends TenantTypeormRepository<UserEntity> {
  constructor(tenantEntityManagerContext: TenantEntityManagerContext) {
    super(UserEntity, tenantEntityManagerContext);
  }

  async findByIdx(idx: number): Promise<Nullable<UserEntity>> {
    return this.repository.findOneBy({ idx });
  }

  async findByEmail(email: string): Promise<Nullable<UserEntity>> {
    return this.repository.findOneBy({ email });
  }

  async existsByIdx(idx: number): Promise<boolean> {
    return this.repository.existsBy({ idx });
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.repository.existsBy({ email });
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.repository.save(user);
  }
}
