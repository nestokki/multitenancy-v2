import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../infra/database/database.module';
import { PlatformEntity } from './entity/platform.entity';
import { PlatformManagementRepository } from './repository/platform-management.repository';
import { PlatformRepository } from './repository/platform.repository';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([PlatformEntity])],
  providers: [PlatformRepository, PlatformManagementRepository],
})
export class PlatformModule {}
