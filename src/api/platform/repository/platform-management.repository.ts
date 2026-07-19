import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nullable } from 'src/common/type/native';
import { Repository } from 'typeorm';
import { PlatformEntity } from '../entity/platform.entity';

@Injectable()
export class PlatformManagementRepository {
  constructor(
    @InjectRepository(PlatformEntity)
    private readonly repository: Repository<PlatformEntity>,
  ) {}

  async save(platform: PlatformEntity): Promise<PlatformEntity> {
    return this.repository.save(platform);
  }

  async findAll(): Promise<PlatformEntity[]> {
    return this.repository.find({ order: { idx: 'ASC' } });
  }

  async findByPlatformId(platformId: string): Promise<Nullable<PlatformEntity>> {
    return this.repository.findOneBy({ platformId });
  }

  async existsByPlatformId(platformId: string): Promise<boolean> {
    return this.repository.existsBy({ platformId });
  }
}
