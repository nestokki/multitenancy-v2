import { AsyncLocalStorage } from 'node:async_hooks';
import { Injectable } from '@nestjs/common';
import type { EntityManager } from 'typeorm';

@Injectable()
export class TenantEntityManagerContext {
  private readonly als = new AsyncLocalStorage<EntityManager>();

  // TODO: 요청 컨텍스트 주입 미들웨어 만들기
  run<T>(entityManager: EntityManager, callback: () => T): T {
    return this.als.run(entityManager, callback);
  }

  getManager(): EntityManager {
    const entityManager = this.als.getStore() ?? null;

    if (!entityManager) {
      throw new Error('테넌트 EntityManager가 요청 컨텍스트에 존재하지 않습니다.');
    }

    return entityManager;
  }
}
