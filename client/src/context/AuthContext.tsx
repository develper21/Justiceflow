import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authApi } from '../api';
import type { User } from '../types/api.types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check authentication on app load
  const checkAuth = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const currentUser = await authApi.getCurrentUser();
        setUser(currentUser);
      } catch {
        localStorage.removeItem('token');
        setUser(null);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const authCheck = window.setTimeout(() => {
      void checkAuth();
    }, 0);
    return () => clearTimeout(authCheck);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });

      localStorage.setItem('token', response.token);

      setUser(response.user);

      toast.success('Login successful!');
    } catch (err: unknown) {
      toast.error(getErrorMessage(err) || 'Login failed');
      throw err;
    };
  }

  const logout = () => {
    authApi.logout();
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function getErrorMessage(err: unknown): string | undefined {
  if (!err || typeof err !== 'object') return undefined;
  return (err as { response?: { data?: { message?: string } } }).response?.data?.message;
}
