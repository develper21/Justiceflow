import { UserRole } from '@prisma/client';
import { requireRole, isSHO, isPolice, isJudge, isCourt, allowAll } from '../middleware/role.middleware';
import { validate } from '../middleware/validation.middleware';
import { errorHandler } from '../middleware/error.middleware';
import { ApiError } from '../utils/ApiError';

const makeRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('role.middleware', () => {
  it('rejects unauthenticated requests', () => {
    const req: any = {};
    const res = makeRes();
    const next = jest.fn();
    requireRole(UserRole.POLICE)(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 401 }));
  });

  it('allows users with the required role', () => {
    const req: any = { user: { role: UserRole.POLICE } };
    const next = jest.fn();
    requireRole(UserRole.POLICE)(req, makeRes(), next);
    expect(next).toHaveBeenCalledWith(); // no error
  });

  it('blocks users without the required role', () => {
    const req: any = { user: { role: UserRole.POLICE } };
    const next = jest.fn();
    requireRole(UserRole.JUDGE)(req, makeRes(), next);
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 403 }));
  });

  it('requireRole accepts multiple roles', () => {
    const middleware = requireRole(UserRole.COURT_CLERK, UserRole.JUDGE);

    const ok = jest.fn();
    middleware({ user: { role: UserRole.COURT_CLERK } } as any, makeRes(), ok);
    expect(ok).toHaveBeenCalledTimes(1);

    middleware({ user: { role: UserRole.JUDGE } } as any, makeRes(), ok);
    expect(ok).toHaveBeenCalledTimes(2);

    const blocked = jest.fn();
    middleware({ user: { role: UserRole.POLICE } } as any, makeRes(), blocked);
    expect(blocked).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 403 }));
  });

  it('isSHO only accepts SHO role', () => {
    const sho: any = { user: { role: UserRole.SHO } };
    const police: any = { user: { role: UserRole.POLICE } };
    const ok = jest.fn();
    isSHO(sho, makeRes(), ok);
    expect(ok).toHaveBeenCalledTimes(1);
    isSHO(police, makeRes(), ok);
    expect(ok).toHaveBeenLastCalledWith(expect.objectContaining({ statusCode: 403 }));
  });

  it('isPolice accepts POLICE and SHO', () => {
    const next = jest.fn();
    isPolice({ user: { role: UserRole.POLICE } } as any, makeRes(), next);
    isPolice({ user: { role: UserRole.SHO } } as any, makeRes(), next);
    expect(next).toHaveBeenCalledTimes(2);
  });

  it('isJudge only accepts JUDGE', () => {
    const next = jest.fn();
    isJudge({ user: { role: UserRole.JUDGE } } as any, makeRes(), next);
    expect(next).toHaveBeenCalledTimes(1);
    isJudge({ user: { role: UserRole.COURT_CLERK } } as any, makeRes(), next);
    expect(next).toHaveBeenLastCalledWith(expect.objectContaining({ statusCode: 403 }));
  });

  it('isCourt accepts COURT_CLERK and JUDGE', () => {
    const next = jest.fn();
    isCourt({ user: { role: UserRole.COURT_CLERK } } as any, makeRes(), next);
    isCourt({ user: { role: UserRole.JUDGE } } as any, makeRes(), next);
    expect(next).toHaveBeenCalledTimes(2);
  });

  it('allowAll passes any authenticated user', () => {
    const next = jest.fn();
    allowAll({ user: { role: UserRole.JUDGE } } as any, makeRes(), next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe('validation.middleware', () => {
  it('accepts requests with no validation errors', () => {
    const req: any = {};
    const next = jest.fn();
    validate(req, makeRes(), next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).not.toHaveBeenCalledWith(expect.anything());
  });
});

describe('error.middleware', () => {
  it('sends ApiError status and message', () => {
    const res = makeRes();
    errorHandler(ApiError.notFound('Case missing'), {} as any, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: 'Case missing' })
    );
  });

  it('converts generic errors to 500', () => {
    const res = makeRes();
    errorHandler(new Error('boom'), {} as any, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: 'boom' })
    );
  });

  it('uses statusCode from non-ApiError errors', () => {
    const res = makeRes();
    const err: any = new Error('bad');
    err.statusCode = 422;
    errorHandler(err, {} as any, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(422);
  });
});
