import type { EntityManager } from 'typeorm';

export interface TenantEntityManagerStore {
  readonly tenantId: string;
  readonly entityManager: EntityManager;
}
