import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/api.types';
import { NotificationBell } from '../common/NotificationBell';
import { SearchBar } from '../common/SearchBar';
import { GovernmentEmblem } from '../common/GovernmentLogo';
import { useEscapeKey } from '../../hooks/useEscapeKey';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu with ESC key
  useEscapeKey(() => setMobileMenuOpen(false), mobileMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/';

    switch (user.role) {
      case UserRole.POLICE:
        return '/police/dashboard';
      case UserRole.SHO:
        return '/sho/dashboard';
      case UserRole.COURT_CLERK:
        return '/court/dashboard';
      case UserRole.JUDGE:
        return '/judge/dashboard';
      default:
        return '/';
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-xl shadow-lg border-b-2 border-white/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={getDashboardLink()} className="flex items-center hover:opacity-80 transition-opacity">
              <GovernmentEmblem />
            </Link>
          </div>

          {user && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Global Search */}
                <div className="hidden lg:block">
                  <SearchBar />
                </div>

                <div className="text-sm hidden lg:block bg-gradient-to-r from-gray-50 to-slate-50 px-4 py-2 rounded-xl border border-gray-200">
                  <p className="font-bold text-navy-900">{user.name}</p>
                  <p className="text-navy-700">{user.role.replace('_', ' ')}</p>
                </div>

                {/* Notification bell */}
                <div className="ml-3">
                  <NotificationBell />
                </div>

                <button onClick={handleLogout} className="btn btn-secondary text-sm">
                  Logout
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <NotificationBell />
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="ml-2 p-2 rounded-xl text-navy-700 hover:bg-gradient-to-r from-navy-50 to-slate-50 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all"
                  aria-label="Toggle menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Desktop Role-based navigation */}
      {user && (
        <div className="border-t-2 border-gray-200/60 hidden md:block bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 h-12 items-center overflow-x-auto">
              {user.role === UserRole.POLICE && (
                <>
                  <Link to="/police/dashboard" className="text-sm font-bold text-white bg-gradient-to-r from-navy-600 to-navy-700 hover:from-navy-700 hover:to-navy-800 px-4 py-2 rounded-xl whitespace-nowrap transition-all shadow-md">
                    Dashboard
                  </Link>
                  <Link to="/police/analytics" className="text-sm font-bold text-white bg-gradient-to-r from-navy-600 to-navy-700 hover:from-navy-700 hover:to-navy-800 px-4 py-2 rounded-xl whitespace-nowrap transition-all shadow-md">
                    Analytics
                  </Link>
                  <Link to="/police/create-fir" className="text-sm font-bold text-white bg-gradient-to-r from-navy-600 to-navy-700 hover:from-navy-700 hover:to-navy-800 px-4 py-2 rounded-xl whitespace-nowrap transition-all shadow-md">
                    Create FIR
                  </Link>
                  <Link to="/police/my-cases" className="text-sm font-bold text-white bg-gradient-to-r from-navy-600 to-navy-700 hover:from-navy-700 hover:to-navy-800 px-4 py-2 rounded-xl whitespace-nowrap transition-all shadow-md">
                    My Cases
                  </Link>
                  <Link to="/police/request-documents" className="text-sm font-bold text-white bg-gradient-to-r from-navy-600 to-navy-700 hover:from-navy-700 hover:to-navy-800 px-4 py-2 rounded-xl whitespace-nowrap transition-all shadow-md">
                    Request Documents
                  </Link>
                  <Link to="/police/case-reopen" className="text-sm font-bold text-white bg-gradient-to-r from-navy-600 to-navy-700 hover:from-navy-700 hover:to-navy-800 px-4 py-2 rounded-xl whitespace-nowrap transition-all shadow-md">
                    Re-open Requests
                  </Link>
                </>
              )}

              {user.role === UserRole.SHO && (
                <>
                  <Link to="/sho/dashboard" className="text-sm font-bold text-navy-700 hover:text-navy-900 hover:bg-gradient-to-r from-navy-50 to-slate-50 px-3 py-2 rounded-xl whitespace-nowrap transition-all">
                    Dashboard
                  </Link>
                  <Link to="/sho/all-cases" className="text-sm font-bold text-navy-700 hover:text-navy-900 hover:bg-gradient-to-r from-navy-50 to-slate-50 px-3 py-2 rounded-xl whitespace-nowrap transition-all">
                    All Cases
                  </Link>
                  <Link to="/sho/document-requests" className="text-sm font-bold text-navy-700 hover:text-navy-900 hover:bg-gradient-to-r from-navy-50 to-slate-50 px-3 py-2 rounded-xl whitespace-nowrap transition-all">
                    Document Requests
                  </Link>
                </>
              )}

              {user.role === UserRole.COURT_CLERK && (
                <>
                  <Link to="/court/dashboard" className="text-sm font-bold text-navy-700 hover:text-navy-900 hover:bg-gradient-to-r from-navy-50 to-slate-50 px-3 py-2 rounded-xl whitespace-nowrap transition-all">
                    Dashboard
                  </Link>
                  <Link to="/court/incoming-cases" className="text-sm font-bold text-navy-700 hover:text-navy-900 hover:bg-gradient-to-r from-navy-50 to-slate-50 px-3 py-2 rounded-xl whitespace-nowrap transition-all">
                    Incoming Cases
                  </Link>
                  <Link to="/court/document-requests" className="text-sm font-bold text-navy-700 hover:text-navy-900 hover:bg-gradient-to-r from-navy-50 to-slate-50 px-3 py-2 rounded-xl whitespace-nowrap transition-all">
                    Document Requests
                  </Link>
                </>
              )}

              {user.role === UserRole.JUDGE && (
                <>
                  <Link to="/judge/dashboard" className="text-sm font-bold text-navy-700 hover:text-navy-900 hover:bg-gradient-to-r from-navy-50 to-slate-50 px-3 py-2 rounded-xl whitespace-nowrap transition-all">
                    Dashboard
                  </Link>
                  <Link to="/judge/cases" className="text-sm font-bold text-navy-700 hover:text-navy-900 hover:bg-gradient-to-r from-navy-50 to-slate-50 px-3 py-2 rounded-xl whitespace-nowrap transition-all">
                    Cases
                  </Link>
                  <Link to="/judge/reopen-requests" className="text-sm font-bold text-navy-700 hover:text-navy-900 hover:bg-gradient-to-r from-navy-50 to-slate-50 px-3 py-2 rounded-xl whitespace-nowrap transition-all">
                    Re-open Requests
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {user && mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-gray-200/60 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {/* User info */}
            <div className="pb-3 mb-3 border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 px-4 py-3 rounded-xl">
              <p className="font-bold text-navy-900">{user.name}</p>
              <p className="text-sm text-navy-700">{user.role.replace('_', ' ')}</p>
            </div>

            {/* Navigation links */}
            {user.role === UserRole.POLICE && (
              <>
                <Link
                  to="/police/dashboard"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-navy-700 hover:bg-gradient-to-r from-navy-50 to-slate-50 transition-all"
                >
                  Dashboard
                </Link>
                <Link
                  to="/police/create-fir"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-navy-700 hover:bg-gradient-to-r from-navy-50 to-slate-50 transition-all"
                >
                  Create FIR
                </Link>
                <Link
                  to="/police/my-cases"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-navy-700 hover:bg-gradient-to-r from-navy-50 to-slate-50 transition-all"
                >
                  My Cases
                </Link>
                <Link
                  to="/police/request-documents"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-navy-700 hover:bg-gradient-to-r from-navy-50 to-slate-50 transition-all"
                >
                  Request Documents
                </Link>
                <Link
                  to="/police/case-reopen"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-navy-700 hover:bg-gradient-to-r from-navy-50 to-slate-50 transition-all"
                >
                  Re-open Requests
                </Link>
              </>
            )}

            {user.role === UserRole.SHO && (
              <>
                <Link
                  to="/sho/dashboard"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-navy-700 hover:bg-gradient-to-r from-navy-50 to-slate-50 transition-all"
                >
                  Dashboard
                </Link>
                <Link
                  to="/sho/all-cases"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-navy-700 hover:bg-gradient-to-r from-navy-50 to-slate-50 transition-all"
                >
                  All Cases
                </Link>
                <Link
                  to="/sho/document-requests"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-navy-700 hover:bg-gradient-to-r from-navy-50 to-slate-50 transition-all"
                >
                  Document Requests
                </Link>
              </>
            )}

            {user.role === UserRole.COURT_CLERK && (
              <>
                <Link
                  to="/court/dashboard"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-navy-700 hover:bg-gradient-to-r from-navy-50 to-slate-50 transition-all"
                >
                  Dashboard
                </Link>
                <Link
                  to="/court/incoming-cases"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-navy-700 hover:bg-gradient-to-r from-navy-50 to-slate-50 transition-all"
                >
                  Incoming Cases
                </Link>
                <Link
                  to="/court/document-requests"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-navy-700 hover:bg-gradient-to-r from-navy-50 to-slate-50 transition-all"
                >
                  Document Requests
                </Link>
              </>
            )}

            {user.role === UserRole.JUDGE && (
              <>
                <Link
                  to="/judge/dashboard"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-navy-700 hover:bg-gradient-to-r from-navy-50 to-slate-50 transition-all"
                >
                  Dashboard
                </Link>
                <Link
                  to="/judge/cases"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-navy-700 hover:bg-gradient-to-r from-navy-50 to-slate-50 transition-all"
                >
                  Cases
                </Link>
                <Link
                  to="/judge/reopen-requests"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-navy-700 hover:bg-gradient-to-r from-navy-50 to-slate-50 transition-all"
                >
                  Re-open Requests
                </Link>
              </>
            )}

            {/* Logout button */}
            <button
              onClick={() => {
                closeMobileMenu();
                handleLogout();
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-base font-bold text-red-600 hover:bg-gradient-to-r from-red-50 to-rose-50 mt-3 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
