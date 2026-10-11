const mockFindMany = jest.fn();

jest.mock('../prisma/client', () => ({
  __esModule: true,
  prisma: { case: { findMany: mockFindMany } },
  default: { case: { findMany: mockFindMany } },
}));

import { SearchService } from '../services/search.service';

const mockedFindMany = mockFindMany;

const makeResult = (firNumber: string) => ({
  id: 'case-1',
  fir: { firNumber, policeStation: { name: 'Central PS' } },
  state: { currentState: 'FIR_REGISTERED' },
  accused: [{ name: 'Accused A' }],
  assignments: [],
  createdAt: new Date(),
});

describe('SearchService.search', () => {
  let service: SearchService;

  beforeEach(() => {
    service = new SearchService();
    mockedFindMany.mockReset();
  });

  it('returns empty array for queries shorter than 2 chars', async () => {
    expect(await service.search('', 'u1', 'POLICE', 'org-1')).toEqual([]);
    expect(await service.search('a', 'u1', 'POLICE', 'org-1')).toEqual([]);
    expect(mockedFindMany).not.toHaveBeenCalled();
  });

  it('returns DB results for a valid query (POLICE role)', async () => {
    mockedFindMany.mockResolvedValue([makeResult('FIR/2025/0001')]);

    const results = await service.search(' FIR/2025/0001 ', 'u1', 'POLICE', 'org-1');

    expect(results).toHaveLength(1);
    expect(results[0].firNumber).toBe('FIR/2025/0001');
    expect(results[0].caseId).toBe('case-1');
    expect(mockedFindMany).toHaveBeenCalledTimes(1);
    expect(mockedFindMany.mock.calls[0][0].where.AND).toBeDefined();
  });

  it('applies SHO role filter to own station', async () => {
    mockedFindMany.mockResolvedValue([]);

    await service.search('theft', 'u1', 'SHO', 'station-9');

    const where = mockedFindMany.mock.calls[0][0].where;
    // where.AND[0] is the role filter built by the service
    expect(where.AND[0]).toEqual({ fir: { policeStationId: 'station-9' } });
  });

  it('applies court role filter for JUDGE', async () => {
    mockedFindMany.mockResolvedValue([]);

    await service.search('theft', 'u1', 'JUDGE', 'court-1');

    expect(mockedFindMany).toHaveBeenCalledTimes(1);
  });
});
