import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from './AuthContext';
import { authApi } from '../api';

vi.mock('../api', () => ({
  authApi: {
    login: vi.fn(),
    getCurrentUser: vi.fn(),
    logout: vi.fn(),
  },
}));

vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() },
}));

const mockedAuthApi = vi.mocked(authApi);

const TestConsumer = () => {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  return (
    <div>
      <div data-testid="user">{user ? user.name : 'no-user'}</div>
      <div data-testid="auth">{isAuthenticated ? 'yes' : 'no'}</div>
      <div data-testid="loading">{isLoading ? 'yes' : 'no'}</div>
      <button
        onClick={async () => {
          testHarness.lastLogin = null;
          try {
            await login('user@police.gov', 'password123');
          } catch (err) {
            testHarness.lastLogin = err;
          }
        }}
      >
        do-login
      </button>
      <button onClick={async () => {
        await logout();
      }}>do-logout</button>
    </div>
  );
};

// Shared channel between the provider tree and the test
export const testHarness: { lastLogin: unknown } = { lastLogin: null };

const renderProvider = () =>
  render(
    <AuthProvider>
      <TestConsumer />
    </AuthProvider>
  );

const makeUser = {
  id: 'u1',
  name: 'Priya Sharma',
  email: 'user@police.gov',
  role: 'POLICE',
};

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('finishes loading with no user when token is absent', async () => {
    renderProvider();

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('no');
    });
    expect(screen.getByTestId('auth')).toHaveTextContent('no');
    expect(screen.getByTestId('user')).toHaveTextContent('no-user');
    expect(mockedAuthApi.getCurrentUser).not.toHaveBeenCalled();
  });

  it('hydrates the user via getCurrentUser when a token exists', async () => {
    localStorage.setItem('token', 'tok');
    mockedAuthApi.getCurrentUser.mockResolvedValue(makeUser);

    renderProvider();

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('Priya Sharma');
    });
    expect(screen.getByTestId('auth')).toHaveTextContent('yes');
    expect(mockedAuthApi.getCurrentUser).toHaveBeenCalled();
  });

  it('clears the token when getCurrentUser fails', async () => {
    localStorage.setItem('token', 'expired');
    mockedAuthApi.getCurrentUser.mockRejectedValue(new Error('401'));

    renderProvider();

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('no');
    });
    expect(localStorage.getItem('token')).toBeNull();
    expect(screen.getByTestId('auth')).toHaveTextContent('no');
  });

  it('login stores token and sets the user', async () => {
    renderProvider();

    await waitFor(() => screen.getByTestId('loading')).then(() => {});

    mockedAuthApi.login.mockResolvedValue({ token: 'newtok', user: makeUser } as never);

    await act(async () => {
      await userEvent.click(screen.getByText('do-login'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth')).toHaveTextContent('yes');
    });
    expect(localStorage.getItem('token')).toBe('newtok');
    expect(screen.getByTestId('user')).toHaveTextContent('Priya Sharma');
  });

  it('login rethrows and does not set user on failure', async () => {
    renderProvider();

    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('no'));

    mockedAuthApi.login.mockRejectedValueOnce(new Error('Bad creds'));

    await act(async () => {
      await userEvent.click(screen.getByText('do-login'));
    });

    expect(testHarness.lastLogin).toBeTruthy();
    await waitFor(() => {
      expect(screen.getByTestId('auth')).toHaveTextContent('no');
    });
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('logout clears user state', async () => {
    localStorage.setItem('token', 'tok');
    mockedAuthApi.getCurrentUser.mockResolvedValue(makeUser);

    renderProvider();
    await waitFor(() => expect(screen.getByTestId('auth')).toHaveTextContent('yes'));

    await act(async () => {
      await userEvent.click(screen.getByText('do-logout'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth')).toHaveTextContent('no');
    });
    expect(screen.getByTestId('user')).toHaveTextContent('no-user');
  });
});
