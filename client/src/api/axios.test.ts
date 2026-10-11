import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

vi.mock('react-hot-toast', () => ({
  default: { error: vi.fn() },
}));

describe('axios client', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetModules();
  });

  it('uses the expected default base URL', async () => {
    const { default: apiClient } = await import('./axios');
    expect(apiClient.defaults.baseURL).toBe('http://localhost:5000/api');
    expect(apiClient.defaults.timeout).toBe(30000);
  });

  it('adds Authorization header when token exists in localStorage', async () => {
    localStorage.setItem('token', 'jwt-token-abc');
    const { default: apiClient } = await import('./axios');

    const config = await apiClient.interceptors.request.handlers[0].fulfilled({
      headers: {} as axios.InternalAxiosRequestHeaders,
    });

    expect(config.headers.Authorization).toBe('Bearer jwt-token-abc');
  });

  it('does not add Authorization header when token is absent', async () => {
    const { default: apiClient } = await import('./axios');

    const config = await apiClient.interceptors.request.handlers[0].fulfilled({
      headers: {} as axios.InternalAxiosRequestHeaders,
    });

    expect(config.headers.Authorization).toBeUndefined();
  });

  it('removes token and exposes 401 handling on response errors', async () => {
    localStorage.setItem('token', 'jwt-token-abc');
    const { default: apiClient } = await import('./axios');

    const handler = apiClient.interceptors.response.handlers[0].rejected;
    const error = { response: { status: 401, data: {} }, request: {} };

    // Should reject (toast/redirect mocked via jsdom)
    await expect(handler(error)).rejects.toBe(error);
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('rejects other error responses without clearing token when not 401', async () => {
    localStorage.setItem('token', 'jwt-token-abc');
    const { default: apiClient } = await import('./axios');

    const handler = apiClient.interceptors.response.handlers[0].rejected;
    const error = { response: { status: 403, data: {} }, request: {} };

    await expect(handler(error)).rejects.toBe(error);
    expect(localStorage.getItem('token')).toBe('jwt-token-abc');
  });
});
