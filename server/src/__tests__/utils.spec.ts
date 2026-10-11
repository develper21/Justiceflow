import { ApiError } from '../utils/ApiError';
import { toString, toStringArray, getFirstString } from '../utils/params.helper';

describe('ApiError', () => {
  it('creates an error with statusCode and message', () => {
    const err = new ApiError(400, 'Bad thing');
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('Bad thing');
    expect(err.isOperational).toBe(true);
  });

  it('exposes static factories with correct status codes', () => {
    expect(ApiError.badRequest('x').statusCode).toBe(400);
    expect(ApiError.unauthorized().statusCode).toBe(401);
    expect(ApiError.forbidden().statusCode).toBe(403);
    expect(ApiError.notFound().statusCode).toBe(404);
    expect(ApiError.conflict('x').statusCode).toBe(409);
    expect(ApiError.internal().statusCode).toBe(500);
  });

  it('marks internal errors as non-operational', () => {
    expect(ApiError.internal().isOperational).toBe(false);
  });

  it('is an instance of Error', () => {
    expect(new ApiError(500, 'oops')).toBeInstanceOf(Error);
  });
});

describe('params.helper', () => {
  it('toString returns first element of array param', () => {
    expect(toString(['abc', 'def'])).toBe('abc');
  });

  it('toString returns empty string for empty array', () => {
    expect(toString([])).toBe('');
  });

  it('toString passes plain string through', () => {
    expect(toString('abc')).toBe('abc');
  });

  it('toStringArray wraps plain string into array', () => {
    expect(toStringArray('abc')).toEqual(['abc']);
  });

  it('toStringArray keeps arrays as-is', () => {
    expect(toStringArray(['a', 'b'])).toEqual(['a', 'b']);
  });

  it('getFirstString unwraps arrays', () => {
    expect(getFirstString(['x'])).toBe('x');
    expect(getFirstString('y')).toBe('y');
  });
});
