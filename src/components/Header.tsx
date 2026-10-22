import React from 'react';
import { NavigationTab, UserProfile } from '../types';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  user: UserProfile;
  isLoggedIn: boolean;
  onLogout: () => void;
  onOpenTechStack: () => void;
  onOpenShareLink: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  user,
  isLoggedIn,
  onLogout,
  onOpenTechStack,
  onOpenShareLink,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-[#e5eeff]">
      {/* Top Academic Sub-bar */}
      <div className="bg-[#eff4ff] px-4 md:px-10 py-1.5 border-b border-[#dce9ff]">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#565e74]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#006948] inline-block animate-pulse"></span>
            <span className="font-medium text-[#0b1c30]">
              Academic Portal • Bhoomi Land Record Digitalization
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTechStack}
              className="hidden sm:flex items-center gap-1 text-[#006194] hover:underline font-code text-[11px]"
              title="View Viva Tech Stack Documentation"
            >
              <span className="material-symbols-outlined text-[14px]">school</span>
              Viva Blueprint
            </button>
            <span className="hidden sm:inline text-[#bccac0]">|</span>
            <span className="font-code text-[#3d4a42] font-medium truncate max-w-[200px] sm:max-w-none">
              {user.name} ({user.email})
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#dae2fd] text-[#131b2e] text-[10px] font-bold">
              Student Admin
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-16 max-w-7xl mx-auto px-4 md:px-10 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('auth')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#006948] to-[#00855d] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-[24px]">landscape</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-[#0b1c30] tracking-tight leading-none group-hover:text-[#006948] transition-colors">
                Bhoomi
              </span>
              <span className="text-[11px] text-[#565e74] leading-none mt-1">
                Land Registry Portal
              </span>
            </div>
          </button>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Portal Navigation">
            <button
              onClick={() => setActiveTab('auth')}
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'auth'
                  ? 'bg-[#00855d] text-white shadow-xs'
                  : 'text-[#565e74] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span>1. Auth</span>
              <span className="hidden xl:inline">entication</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-[#00855d] text-white shadow-xs'
                  : 'text-[#565e74] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              <span>2. Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('registration')}
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'registration'
                  ? 'bg-[#00855d] text-white shadow-xs'
                  : 'text-[#565e74] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">post_add</span>
              <span>3. Register</span>
              <span className="hidden xl:inline"> Plot</span>
            </button>

            <button
              onClick={() => setActiveTab('java')}
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'java'
                  ? 'bg-[#00855d] text-white shadow-xs'
                  : 'text-[#565e74] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">coffee</span>
              <span>4. Java Engine</span>
            </button>
          </nav>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            onClick={onOpenShareLink}
            type="button"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#006948] border border-[#bccac0]/40 text-xs sm:text-sm font-semibold rounded-lg transition-colors shadow-2xs whitespace-nowrap"
            title="Get Website Share Link"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span className="hidden sm:inline">Share</span>
            <span className="hidden md:inline"> Link</span>
          </button>

          <button
            onClick={() => setActiveTab('registration')}
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 bg-[#006948] hover:bg-[#00855d] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors shadow-xs whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span className="hidden sm:inline">New Plot</span>
            <span className="sm:hidden">New</span>
          </button>

          {isLoggedIn ? (
            <div className="relative group">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="w-9 h-9 rounded-full bg-[#006948] text-white flex items-center justify-center hover:ring-2 hover:ring-[#85f8c4] transition-all"
                title={`${user.name} - View Dashboard`}
              >
                <span className="material-symbols-outlined text-[20px]">person</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveTab('auth')}
              className="px-3 py-1.5 text-xs font-semibold text-[#006948] bg-[#eff4ff] hover:bg-[#dce9ff] rounded-lg transition-colors"
            >
              Sign In
            </button>
          )}

          {isLoggedIn && (
            <button
              onClick={onLogout}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-[#565e74] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>Exit</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Secondary Tab Navigation Strip */}
      <div className="flex md:hidden border-t border-[#e5eeff] bg-[#f8f9ff] px-2 py-1 justify-around text-xs">
        <button
          onClick={() => setActiveTab('auth')}
          className={`py-1.5 px-2 rounded-md font-medium flex items-center gap-1 ${
            activeTab === 'auth' ? 'bg-[#00855d] text-white' : 'text-[#565e74]'
          }`}
        >
          <span>1. Auth</span>
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`py-1.5 px-2 rounded-md font-medium flex items-center gap-1 ${
            activeTab === 'dashboard' ? 'bg-[#00855d] text-white' : 'text-[#565e74]'
          }`}
        >
          <span>2. Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('registration')}
          className={`py-1.5 px-2 rounded-md font-medium flex items-center gap-1 ${
            activeTab === 'registration' ? 'bg-[#00855d] text-white' : 'text-[#565e74]'
          }`}
        >
          <span>3. Register</span>
        </button>
        <button
          onClick={() => setActiveTab('java')}
          className={`py-1.5 px-2 rounded-md font-medium flex items-center gap-1 ${
            activeTab === 'java' ? 'bg-[#00855d] text-white' : 'text-[#565e74]'
          }`}
        >
          <span>4. Java</span>
        </button>
      </div>
    </header>
  );
};
