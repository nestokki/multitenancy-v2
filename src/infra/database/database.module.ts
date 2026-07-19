import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntityManagerContext } from './context/tenant-entity-manager.context';
import { TypeOrmModuleOptionsConfig } from './typeorm/config/typeorm-module-options.config';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeOrmModuleOptionsConfig })],
  providers: [TenantEntityManagerContext],
  exports: [TenantEntityManagerContext],
})
export class DatabaseModule {}
