import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Eye,
  EyeOff,
  FileText,
  LandPlot,
  Lock,
  Mail,
  Scale,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/api.types';
import { GovernmentLogo } from '../../components/common/GovernmentLogo';

interface RoleOption {
  value: UserRole;
  label: string;
  hint: string;
  icon: React.ReactNode;
}

const roleMeta: Record<UserRole, { label: string; description: string; icon: React.ReactNode }> = {
  [UserRole.POLICE]: {
    label: 'Police Officer',
    description: 'Register FIRs and manage investigations',
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  [UserRole.SHO]: {
    label: 'SHO',
    description: 'Oversee cases and approve workflows',
    icon: <Building2 className="h-4 w-4" />,
  },
  [UserRole.COURT_CLERK]: {
    label: 'Court Clerk',
    description: 'Handle court submissions and records',
    icon: <FileText className="h-4 w-4" />,
  },
  [UserRole.JUDGE]: {
    label: 'Judge',
    description: 'Review matters and finalize judgments',
    icon: <Scale className="h-4 w-4" />,
  },
};

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const roleOptions: RoleOption[] = useMemo(
    () => [
      { value: UserRole.POLICE, label: 'Police Officer', hint: 'Field ops', icon: <ShieldCheck className="h-4 w-4" /> },
      { value: UserRole.SHO, label: 'SHO', hint: 'Station lead', icon: <Building2 className="h-4 w-4" /> },
      { value: UserRole.COURT_CLERK, label: 'Court Clerk', hint: 'Case records', icon: <FileText className="h-4 w-4" /> },
      { value: UserRole.JUDGE, label: 'Judge', hint: 'Judicial review', icon: <Scale className="h-4 w-4" /> },
    ],
    []
  );

  const navigateToRoleDashboard = useCallback(
    (role: UserRole) => {
      switch (role) {
        case UserRole.POLICE:
          navigate('/police/dashboard');
          break;
        case UserRole.SHO:
          navigate('/sho/dashboard');
          break;
        case UserRole.COURT_CLERK:
          navigate('/court/dashboard');
          break;
        case UserRole.JUDGE:
          navigate('/judge/dashboard');
          break;
        default:
          navigate('/login');
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (isAuthenticated && user) {
      navigateToRoleDashboard(user.role);
    }
  }, [isAuthenticated, user, navigateToRoleDashboard]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      setErrorMsg('Please select your role.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      await login(email, password);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      setErrorMsg(err?.response?.data?.message || err?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedRoleData = selectedRole ? roleMeta[selectedRole] : null;

  return (
    <div className="h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.08),_transparent_32%),linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] text-slate-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-6rem] top-[-6rem] h-72 w-72 rounded-full bg-slate-200/60 blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute right-[-5rem] top-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl animate-[pulse_12s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-7rem] left-1/3 h-80 w-80 rounded-full bg-slate-300/40 blur-3xl animate-[pulse_14s_ease-in-out_infinite]" />
      </div>

      <div className="relative mx-auto flex h-screen w-full max-w-[1600px] items-center px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid h-[calc(100vh-2rem)] w-full grid-cols-1 overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:grid-cols-[1.06fr_0.94fr]">
          <section className="relative flex h-full flex-col justify-center overflow-hidden bg-slate-950 px-6 py-8 text-white sm:px-8 lg:px-10">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%,transparent_65%,rgba(255,255,255,0.04))]" />
            <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-white/10" />
            <div className="absolute -bottom-16 -right-16 h-44 w-44 rounded-full border border-white/10" />

            <div className="relative z-10 flex items-center gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-lg backdrop-blur">
                <GovernmentLogo className="h-12 w-12" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.38em] text-white/55">JusticeFlow</p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Case Management Portal</h1>
              </div>
            </div>

            <div className="relative z-10 mt-8 max-w-xl lg:mt-12">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.3em] text-white/70">
                <Sparkles className="h-3.5 w-3.5" />
                Minimal access interface
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Clean, official, and focused login for authorized users.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/70 sm:text-base">
                Split-screen layout with a compact login form and a restrained visual panel. Built to stay inside one screen without vertical scroll on desktop.
              </p>
            </div>

            <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Role access', value: '4 tiers', icon: <UserRound className="h-4 w-4" /> },
                { label: 'Secure routing', value: 'Auto redirect', icon: <ArrowRight className="h-4 w-4" /> },
                { label: 'Workflow view', value: 'Live status', icon: <ShieldCheck className="h-4 w-4" /> },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-white/70">
                    {item.icon}
                    <span className="text-[11px] uppercase tracking-[0.26em]">{item.label}</span>
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                <LandPlot className="h-4 w-4" />
                Official portal access
              </div>
              <div className="mt-3 grid gap-2 text-sm text-white/65 sm:grid-cols-3">
                <div className="rounded-xl bg-white/5 px-3 py-2">Secure</div>
                <div className="rounded-xl bg-white/5 px-3 py-2">Government grade</div>
                <div className="rounded-xl bg-white/5 px-3 py-2">Role based</div>
              </div>
            </div>
          </section>

          <section className="flex h-full items-center justify-center px-5 py-6 sm:px-8 lg:px-10">
            <div className="w-full max-w-xl">
              <div className="flex items-center justify-between gap-4 lg:hidden">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">JusticeFlow</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Sign in</h2>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  <GovernmentLogo className="h-10 w-10" />
                </div>
              </div>

              <div className="hidden lg:block">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">JusticeFlow</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Sign in to continue</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Choose your role, enter credentials, and continue to the right dashboard.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4" aria-label="Login form">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Role</label>
                  <div className="relative">
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                      className="h-11 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-11 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
                      required
                    >
                      <option value="">Choose your role</option>
                      {roleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {roleOptions.map((option) => {
                      const active = selectedRole === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setSelectedRole(option.value)}
                          className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                            active
                              ? 'border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-200'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${active ? 'bg-white/10' : 'bg-slate-950'} text-white`}>
                            {option.icon}
                          </div>
                          <div>
                            <div className="text-sm font-semibold">{option.label}</div>
                            <div className={`text-xs ${active ? 'text-white/70' : 'text-slate-500'}`}>{option.hint}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email address</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      autoComplete="username"
                      className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <label className="flex items-center gap-2 text-slate-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-400"
                    />
                    Remember me
                  </label>
                  <a href="#" className="font-medium text-slate-700 hover:text-slate-950">
                    Forgot password?
                  </a>
                </div>

                {selectedRoleData && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <div className="flex items-center gap-2 font-medium text-slate-900">
                      {selectedRoleData.icon}
                      {selectedRoleData.label}
                    </div>
                    <p className="mt-1 text-slate-600">{selectedRoleData.description}</p>
                  </div>
                )}

                {errorMsg && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
              <div className="mt-4 text-center text-xs text-slate-500">
                Government of India · JusticeFlow Portal · Secure access only
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
