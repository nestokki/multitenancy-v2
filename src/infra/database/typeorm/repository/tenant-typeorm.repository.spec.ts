import type { EntityManager, Repository } from 'typeorm';
import { TenantEntityManagerContext } from '../../context/tenant-entity-manager.context';
import { TenantTypeormRepository } from './tenant-typeorm.repository';

class TestEntity {
  idx: number;
  platformId: string;
  name: string;
}

class TestTenantTypeormRepository extends TenantTypeormRepository<TestEntity> {
  constructor(tenantEntityManagerContext: TenantEntityManagerContext) {
    super(TestEntity, tenantEntityManagerContext);
  }

  findByPlatformId(platformId: string): Promise<TestEntity | null> {
    return this.findOneByTenant({ platformId });
  }

  existsByName(name: string): Promise<boolean> {
    return this.existsByTenant({ name });
  }

  save(entity: TestEntity): Promise<TestEntity> {
    return this.saveByTenant(entity);
  }
}

describe('TenantTypeormRepository', () => {
  const tenantId = '5f0fa49b-7d99-4ec3-8ed9-5b9665171ced';
  let context: TenantEntityManagerContext;
  let typeormRepository: jest.Mocked<Repository<TestEntity>>;
  let entityManager: EntityManager;
  let repository: TestTenantTypeormRepository;
  let findOneByMock: jest.Mock;
  let existsByMock: jest.Mock;
  let saveMock: jest.Mock;
  let hasIdMock: jest.Mock;
  let getEntityIdMapMock: jest.Mock;

  beforeEach(() => {
    findOneByMock = jest.fn();
    existsByMock = jest.fn();
    saveMock = jest.fn();
    hasIdMock = jest.fn().mockReturnValue(false);
    getEntityIdMapMock = jest.fn();

    typeormRepository = {
      findOneBy: findOneByMock,
      existsBy: existsByMock,
      save: saveMock,
      hasId: hasIdMock,
      metadata: {
        getEntityIdMap: getEntityIdMapMock,
      },
    } as unknown as jest.Mocked<Repository<TestEntity>>;

    entityManager = {
      getRepository: jest.fn().mockReturnValue(typeormRepository),
    } as unknown as EntityManager;

    context = new TenantEntityManagerContext();
    repository = new TestTenantTypeormRepository(context);
  });

  it('조회 조건의 platformId를 현재 tenantId로 강제한다', async () => {
    findOneByMock.mockResolvedValue(null);

    await context.run({ tenantId, entityManager }, () =>
      repository.findByPlatformId('another-platform-id'),
    );

    expect(findOneByMock).toHaveBeenCalledWith({ platformId: tenantId });
  });

  it('일반 조회 조건에 현재 tenantId를 추가한다', async () => {
    existsByMock.mockResolvedValue(false);

    await context.run({ tenantId, entityManager }, () => repository.existsByName('platform'));

    expect(existsByMock).toHaveBeenCalledWith({
      name: 'platform',
      platformId: tenantId,
    });
  });

  it('신규 데이터에 현재 tenantId를 설정하고 저장한다', async () => {
    const entity = new TestEntity();
    entity.name = 'platform';
    saveMock.mockResolvedValue(entity);

    await context.run({ tenantId, entityManager }, () => repository.save(entity));

    expect(entity.platformId).toBe(tenantId);
    expect(saveMock).toHaveBeenCalledWith(entity);
  });

  it('다른 플랫폼에 속한 데이터 저장을 거부한다', async () => {
    const entity = new TestEntity();
    entity.platformId = 'another-platform-id';
    entity.name = 'platform';

    await expect(
      context.run({ tenantId, entityManager }, () => repository.save(entity)),
    ).rejects.toThrow('현재 테넌트와 다른 플랫폼의 데이터는 저장할 수 없습니다.');

    expect(saveMock).not.toHaveBeenCalled();
  });

  it('식별자가 다른 플랫폼의 행을 가리키면 저장을 거부한다', async () => {
    const entity: TestEntity = {
      idx: 1,
      platformId: tenantId,
      name: 'platform',
    };
    hasIdMock.mockReturnValue(true);
    getEntityIdMapMock.mockReturnValue({ idx: entity.idx });
    existsByMock.mockResolvedValue(false);

    await expect(
      context.run({ tenantId, entityManager }, () => repository.save(entity)),
    ).rejects.toThrow('현재 테넌트에 속하지 않은 데이터는 저장할 수 없습니다.');

    expect(existsByMock).toHaveBeenCalledWith({
      idx: entity.idx,
      platformId: tenantId,
    });
    expect(saveMock).not.toHaveBeenCalled();
  });
});
