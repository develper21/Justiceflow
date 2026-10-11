import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import type { User } from '../types/api.types';

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

const mockedUseAuth = vi.mocked(useAuth);

const makeUser = (role: string): User =>
  ({
    id: 'u1',
    name: 'Test User',
    email: 't@t.dev',
    role,
  }) as unknown as User;

const renderRoute = (allowedRoles?: string[]) =>
  render(
    <MemoryRouter initialEntries={['/protected']}>
      <ProtectedRoute allowedRoles={allowedRoles as never}>
        <div>SECRET CONTENT</div>
      </ProtectedRoute>
    </MemoryRouter>
  );

describe('ProtectedRoute', () => {
  it('shows loading spinner while auth is loading', () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      login: vi.fn(),
      logout: vi.fn(),
    } as never);

    renderRoute();

    expect(screen.queryByText('SECRET CONTENT')).not.toBeInTheDocument();
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
    } as never);

    renderRoute();

    expect(screen.queryByText('SECRET CONTENT')).not.toBeInTheDocument();
  });

  it('renders children for authenticated users without role restrictions', () => {
    mockedUseAuth.mockReturnValue({
      user: makeUser('POLICE'),
      isAuthenticated: true,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
    } as never);

    renderRoute();

    expect(screen.getByText('SECRET CONTENT')).toBeInTheDocument();
  });

  it('renders children when user role is allowed', () => {
    mockedUseAuth.mockReturnValue({
      user: makeUser('SHO'),
      isAuthenticated: true,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
    } as never);

    renderRoute(['SHO', 'POLICE']);

    expect(screen.getByText('SECRET CONTENT')).toBeInTheDocument();
  });

  it('shows Access Denied when role is not allowed', () => {
    mockedUseAuth.mockReturnValue({
      user: makeUser('POLICE'),
      isAuthenticated: true,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
    } as never);

    renderRoute(['JUDGE']);

    expect(screen.getByText('403')).toBeInTheDocument();
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(screen.queryByText('SECRET CONTENT')).not.toBeInTheDocument();
  });
});
