process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

const mockFindUnique = jest.fn();
const mockAccessLogCreate = jest.fn();

jest.mock('../prisma/client', () => ({
  __esModule: true,
  prisma: {
    user: { findUnique: mockFindUnique },
    accessLog: { create: mockAccessLogCreate },
  },
  default: {
    user: { findUnique: mockFindUnique },
    accessLog: { create: mockAccessLogCreate },
  },
}));

import { AuthService } from '../modules/auth/auth.service';
import { ApiError } from '../utils/ApiError';

const mockedFindUnique = mockFindUnique;
const mockedAccessLogCreate = mockAccessLogCreate;

const makeUser = (overrides: Record<string, any> = {}) => ({
  id: 'u1',
  name: 'Test User',
  email: 'user@police.gov',
  role: 'POLICE',
  organizationType: 'POLICE_STATION',
  organizationId: 'org-1',
  isActive: true,
  ...overrides,
});

describe('AuthService.login', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
    jest.clearAllMocks();
    mockedAccessLogCreate.mockResolvedValue({});
  });

  it('logs in with valid credentials and returns token + user', async () => {
    mockedFindUnique.mockResolvedValue(makeUser());

    const result = await service.login({ email: 'user@police.gov', password: 'password123' });

    expect(result.token).toBeDefined();
    expect(typeof result.token).toBe('string');
    expect(result.user.email).toBe('user@police.gov');
    expect(result.user.role).toBe('POLICE');
    expect(result.user).not.toHaveProperty('passwordHash');
  });

  it('throws 401 for unknown email', async () => {
    mockedFindUnique.mockResolvedValue(null);

    await expect(
      service.login({ email: 'ghost@police.gov', password: 'password123' })
    ).rejects.toMatchObject({ statusCode: 401 });
  });

  it('throws 401 for wrong password', async () => {
    mockedFindUnique.mockResolvedValue(makeUser());

    await expect(
      service.login({ email: 'user@police.gov', password: 'wrongpassword' })
    ).rejects.toBeInstanceOf(ApiError);
  });

  it('throws 403 for deactivated account', async () => {
    mockedFindUnique.mockResolvedValue(makeUser({ isActive: false }));

    await expect(
      service.login({ email: 'user@police.gov', password: 'password123' })
    ).rejects.toMatchObject({ statusCode: 403 });
  });

  it('creates an access log entry on successful login', async () => {
    mockedFindUnique.mockResolvedValue(makeUser());

    await service.login({ email: 'user@police.gov', password: 'password123' });

    expect(mockedAccessLogCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ userId: 'u1', resourceAccessed: 'LOGIN' }),
      })
    );
  });
});
