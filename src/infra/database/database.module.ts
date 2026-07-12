import { Module } from '@nestjs/common';
import { TenantEntityManagerContext } from './context/tenant-entity-manager.context';

@Module({
  providers: [TenantEntityManagerContext],
  exports: [TenantEntityManagerContext],
})
export class DatabaseModule {}
