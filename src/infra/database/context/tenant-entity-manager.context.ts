import { AsyncLocalStorage } from 'node:async_hooks';
import { Injectable } from '@nestjs/common';
import type { EntityManager } from 'typeorm';
import type { TenantEntityManagerStore } from './interface/tenant-entity-manager-store.interface';

@Injectable()
export class TenantEntityManagerContext {
  private readonly als = new AsyncLocalStorage<TenantEntityManagerStore>();

  // TODO: 요청 컨텍스트 주입 미들웨어 만들기
  run<T>(store: TenantEntityManagerStore, callback: () => T): T {
    return this.als.run(store, callback);
  }

  getManager(): EntityManager {
    return this.getStore().entityManager;
  }

  getTenantId(): string {
    return this.getStore().tenantId;
  }

  private getStore(): TenantEntityManagerStore {
    const store = this.als.getStore() ?? null;

    if (!store) {
      throw new Error('테넌트 컨텍스트가 현재 요청에 존재하지 않습니다.');
    }

    return store;
  }
}
