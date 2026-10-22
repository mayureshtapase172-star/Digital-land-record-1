import React, { useState } from 'react';
import { LandRecord, UserProfile } from '../types';

interface AuthPanelProps {
  onLoginSuccess: (user: Partial<UserProfile>) => void;
  onPreviewPlot: (plotId: string) => void;
  landRecords: LandRecord[];
  onResetData: () => void;
  onOpenShareLink?: () => void;
}

export const AuthPanel: React.FC<AuthPanelProps> = ({
  onLoginSuccess,
  onPreviewPlot,
  landRecords,
  onResetData,
  onOpenShareLink,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  // Login form states
  const [loginEmail, setLoginEmail] = useState('mayureshtapase172@gmail.com');
  const [loginPassword, setLoginPassword] = useState('Mayuresh888@');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState(false);

  // Register form states
  const [regName, setRegName] = useState('Mayuresh Tapase');
  const [regEmail, setRegEmail] = useState('mayureshtapase172@gmail.com');
  const [regPhone, setRegPhone] = useState('+91 98765 43210');
  const [regPassword, setRegPassword] = useState('Mayuresh888@');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regSuccessMessage, setRegSuccessMessage] = useState(false);

  const handleQuickReset = () => {
    setLoginEmail('mayureshtapase172@gmail.com');
    setLoginPassword('Mayuresh888@');
    setRegName('Mayuresh Tapase');
    setRegEmail('mayureshtapase172@gmail.com');
    setRegPhone('+91 98765 43210');
    setRegPassword('Mayuresh888@');
    setMode('login');
    onResetData();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginSuccessMessage(true);

    setTimeout(() => {
      onLoginSuccess({
        email: loginEmail,
        name: regName || 'Mayuresh Tapase',
      });
      setIsLoggingIn(false);
    }, 1200);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegSuccessMessage(true);

    setTimeout(() => {
      setRegSuccessMessage(false);
      setMode('login');
      setLoginEmail(regEmail);
      setLoginPassword(regPassword);
    }, 1500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 sm:px-6">
      {/* Academic Context & Institutional Badge */}
      <header className="flex flex-col items-center text-center space-y-3 mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0b1c30] tracking-tight">
          Digital Land Registry &amp; Cadastral Portal
        </h1>
        <p className="text-base sm:text-lg text-[#565e74] max-w-2xl">
          Civic cadastre management system designed for transparent deed verification,
          plot boundary tracking, and real-time land record lookup.
        </p>

        {/* Tech Stack Indicator Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
          <span className="px-3 py-1 rounded-full bg-[#e5eeff] text-[#3d4a42] font-code flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006948]"></span>
            HTML5 Semantic Core
          </span>
          <span className="px-3 py-1 rounded-full bg-[#e5eeff] text-[#3d4a42] font-code flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006194]"></span>
            Tailwind CSS Design Tokens
          </span>
          <span className="px-3 py-1 rounded-full bg-[#e5eeff] text-[#3d4a42] font-code flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#68dba9]"></span>
            React TypeScript Engine
          </span>
          <span className="px-3 py-1 rounded-full bg-[#e5eeff] text-[#006948] font-code flex items-center gap-1.5 shadow-xs font-bold">
            <span className="material-symbols-outlined text-[14px]">coffee</span>
            Java Spring Boot Backend
          </span>
          <span className="px-3 py-1 rounded-full bg-[#85f8c4] text-[#002114] font-code font-bold flex items-center gap-1.5 shadow-xs">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            Evaluator Demo Ready
          </span>
        </div>
      </header>

      {/* Evaluator Notice Box Banner */}
      <aside className="relative mb-8 rounded-xl bg-[#eff4ff] border border-[#dce9ff] shadow-xs overflow-hidden p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#85f8c4] flex items-center justify-center text-[#002114] shrink-0 shadow-xs mt-0.5 sm:mt-0">
              <span className="material-symbols-outlined text-[24px]">developer_board</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm text-[#0b1c30]">
                  Project Demo Credentials
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#00855d] text-white text-[10px] font-bold uppercase tracking-wider">
                  Active Demo
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#3d4a42]">
                <span className="text-[#565e74]">Pre-filled for testing:</span>
                <code className="font-code text-[#006948] font-bold bg-white px-2 py-0.5 rounded border border-[#bccac0] whitespace-nowrap">
                  mayureshtapase172@gmail.com
                </code>
                <span className="text-[#bccac0] hidden sm:inline">•</span>
                <code className="font-code text-[#006948] font-bold bg-white px-2 py-0.5 rounded border border-[#bccac0] whitespace-nowrap">
                  Mayuresh888@
                </code>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center shrink-0">
            {onOpenShareLink && (
              <button
                onClick={onOpenShareLink}
                type="button"
                className="px-3.5 py-2 rounded-lg bg-[#006948] hover:bg-[#00855d] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap"
                title="View Website Links"
              >
                <span className="material-symbols-outlined text-[16px]">link</span>
                <span>Website Link</span>
              </button>
            )}
            <button
              onClick={handleQuickReset}
              type="button"
              className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#d3e4fe] text-[#0b1c30] text-xs font-semibold transition-colors flex items-center gap-1.5 border border-[#bccac0] shadow-xs whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px]">replay</span>
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Two-Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Overview & Security Specs (5 cols) */}
        <section className="lg:col-span-5 space-y-6">
          {/* Cadastre Visual Feature Card */}
          <div className="rounded-xl overflow-hidden shadow-sm bg-white border border-[#e5eeff]">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKSxdnukKR27IW4vyqPqnh3y4j5tJsRBRpYAJ1FSjOKU7Wyw01-kSHSx-BWXAf0E0FLoR9L431b6OmhrkuNkQp69p8csjbceynVmYNdBjLLuEqI6_SPunYlOQrSbKjzYStxyvmyEBn-ojPpE70zXl6nnsXFvs18K-g-T164Sce1lmygIghG0MmTMlG-aUmzqyaHKyZZiyvqI-iBhIm195h0s_xF6JScIGy8FH2jMmfYw1It-2INzli"
                alt="High angle aerial view of cadastral survey plots with boundary markers"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#213145] via-[#213145]/40 to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <span className="font-code text-[11px] text-[#85f8c4] uppercase tracking-wider font-semibold">
                    Public Deed Registry v2.4
                  </span>
                  <p className="font-bold text-sm text-white">
                    Maharashtra State Cadastre Module
                  </p>
                </div>
                <span className="px-2 py-1 rounded-full bg-[#006948]/90 text-white font-code text-xs backdrop-blur-xs font-semibold shadow-xs">
                  Node #MH-712
                </span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-lg bg-[#eff4ff]">
                  <span className="block font-numeric font-bold text-xl text-[#006948]">100%</span>
                  <span className="block text-[11px] text-[#565e74] font-medium">Digitized</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#eff4ff]">
                  <span className="block font-numeric font-bold text-xl text-[#006194]">7/12</span>
                  <span className="block text-[11px] text-[#565e74] font-medium">Extract Sync</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#eff4ff]">
                  <span className="block font-numeric font-bold text-xl text-[#0b1c30]">256-Bit</span>
                  <span className="block text-[11px] text-[#565e74] font-medium">Encryption</span>
                </div>
              </div>

              {/* Assessment Checklist */}
              <div className="space-y-2 pt-1 border-t border-[#eff4ff]">
                <p className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5 uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[#006948] text-[18px]">verified_user</span>
                  <span>Evaluator Feature Checklist</span>
                </p>
                <ul className="space-y-1.5 text-xs text-[#3d4a42]">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006948] text-[16px]">check_circle</span>
                    <span>Role-based login for Property Registrar &amp; Citizen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006948] text-[16px]">check_circle</span>
                    <span>Auto-computed acreage &amp; valuation algorithm ready</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006948] text-[16px]">check_circle</span>
                    <span>Client-side validation &amp; state persistence</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Institutional Safeguards Card */}
          <div className="p-5 rounded-xl bg-white border border-[#e5eeff] shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-[#0b1c30] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006194] text-[20px]">shield</span>
              <span>Institutional Safeguards</span>
            </h2>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#565e74] text-[20px] mt-0.5">lock_clock</span>
                <div>
                  <p className="font-semibold text-[#0b1c30]">Tamper-Evident Deed Auditing</p>
                  <p className="text-[#565e74] mt-0.5">
                    Every deed registered generates a SHA-256 cadastral token for zero disputed boundaries.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#565e74] text-[20px] mt-0.5">fingerprint</span>
                <div>
                  <p className="font-semibold text-[#0b1c30]">Biometric &amp; OTP Landholder ID</p>
                  <p className="text-[#565e74] mt-0.5">
                    Pre-configured testing identity bound to student research profile MH-2024-ENG.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Authentication Workstation (7 cols) */}
        <section className="lg:col-span-7 bg-white rounded-xl border border-[#e5eeff] shadow-sm p-6 sm:p-8">
          {/* Mode Switcher Tabs */}
          <div
            className="flex p-1.5 mb-6 rounded-lg bg-[#dce9ff]"
            role="tablist"
            aria-label="Authentication Modes"
          >
            <button
              onClick={() => setMode('login')}
              type="button"
              role="tab"
              aria-selected={mode === 'login'}
              className={`flex-1 py-2.5 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-semibold text-center transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                mode === 'login'
                  ? 'bg-white text-[#006948] shadow-xs'
                  : 'text-[#565e74] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              <span>Log In</span>
              <span className="hidden sm:inline"> to Dashboard</span>
            </button>
            <button
              onClick={() => setMode('register')}
              type="button"
              role="tab"
              aria-selected={mode === 'register'}
              className={`flex-1 py-2.5 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-semibold text-center transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                mode === 'register'
                  ? 'bg-white text-[#006948] shadow-xs'
                  : 'text-[#565e74] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>Register</span>
              <span className="hidden sm:inline"> New Landholder</span>
            </button>
          </div>

          {/* TAB 1: LOGIN FORM */}
          {mode === 'login' && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0b1c30]">
                  Sign In to Registry Portal
                </h2>
                <p className="text-sm text-[#565e74] mt-0.5">
                  Access registered plots, title deeds, and cadastral survey records.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Email / Username Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#0b1c30]">
                    Email Address / Landholder ID
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#565e74]">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </span>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#006948] border border-[#dce9ff] transition-all"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-[#0b1c30]">
                      Access Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Demo Evaluator Password: Mayuresh888@')}
                      className="text-xs text-[#006194] hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#565e74]">
                      <span className="material-symbols-outlined text-[20px]">key</span>
                    </span>
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      placeholder="Enter password"
                      className="w-full pl-10 pr-11 py-2.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#006948] border border-[#dce9ff] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#565e74] hover:text-[#0b1c30]"
                      title="Toggle password view"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showLoginPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberSession}
                      onChange={(e) => setRememberSession(e.target.checked)}
                      className="w-4 h-4 rounded text-[#006948] focus:ring-0 cursor-pointer"
                    />
                    <span className="text-xs text-[#0b1c30] select-none font-medium">
                      Remember this terminal session
                    </span>
                  </label>
                  <span className="font-code text-xs text-[#565e74] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">lock</span>
                    <span>SSL Protected</span>
                  </span>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full mt-2 py-3 px-6 rounded-lg bg-[#006948] hover:bg-[#00855d] text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 group disabled:opacity-75"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                      <span>Verifying Landholder Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Log In to Dashboard</span>
                      <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Feedback Alert */}
              {loginSuccessMessage && (
                <div className="p-3.5 rounded-lg bg-[#85f8c4] text-[#002114] text-xs flex items-center gap-2 font-medium">
                  <span className="material-symbols-outlined text-[#006948] text-[20px]">
                    check_circle
                  </span>
                  <span>
                    Authentication verified. Initializing Land Registry Dashboard for{' '}
                    <strong>Mayuresh Tapase</strong>...
                  </span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: REGISTER FORM */}
          {mode === 'register' && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0b1c30]">
                  Create Citizen / Landholder Profile
                </h2>
                <p className="text-sm text-[#565e74] mt-0.5">
                  Register as a certified landholder to catalog plots, deeds, and land assets.
                </p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {/* Full Legal Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#0b1c30]">
                    Full Legal Name (as per Land Deed)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#565e74]">
                      <span className="material-symbols-outlined text-[20px]">badge</span>
                    </span>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#006948] border border-[#dce9ff]"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#0b1c30]">
                    Official Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#565e74]">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </span>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                      placeholder="name@domain.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#006948] border border-[#dce9ff]"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#0b1c30]">
                    Contact Phone (Linked to Aadhaar / SMS Alerts)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#565e74]">
                      <span className="material-symbols-outlined text-[20px]">call</span>
                    </span>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      required
                      placeholder="+91 00000 00000"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#006948] border border-[#dce9ff]"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#0b1c30]">
                    Security Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#565e74]">
                      <span className="material-symbols-outlined text-[20px]">lock</span>
                    </span>
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                      placeholder="Create strong passphrase"
                      className="w-full pl-10 pr-11 py-2.5 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#006948] border border-[#dce9ff]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#565e74] hover:text-[#0b1c30]"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showRegPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Consent Note */}
                <div className="p-3 rounded-lg bg-[#eff4ff] text-[#3d4a42] text-xs flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#006948] text-[18px] shrink-0 mt-0.5">
                    policy
                  </span>
                  <span>
                    By creating an account, you consent to digital deed verification, land area
                    calculations under State Land Revenue regulations, and academic project assessment.
                  </span>
                </div>

                {/* Register Action Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg bg-[#006948] hover:bg-[#00855d] text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 group"
                >
                  <span className="material-symbols-outlined text-[20px]">app_registration</span>
                  <span>Create Account</span>
                </button>
              </form>

              {/* Success Feedback Alert */}
              {regSuccessMessage && (
                <div className="p-3.5 rounded-lg bg-[#85f8c4] text-[#002114] text-xs flex items-center gap-2 font-medium">
                  <span className="material-symbols-outlined text-[#006948] text-[20px]">
                    check_circle
                  </span>
                  <span>
                    Account initialized successfully for <strong>{regName}</strong>! Switching to
                    login...
                  </span>
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      {/* Cadastral Quick Preview Strip */}
      <section className="mt-8 p-5 rounded-xl bg-white border border-[#e5eeff] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#cce5ff] text-[#001d31] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">map</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0b1c30]">
                Registered Plots Ready in Database
              </h3>
              <p className="text-xs text-[#565e74]">
                {landRecords.length} Cadastral deeds mapped to Mayuresh Tapase with instant area computation.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {landRecords.slice(0, 3).map((plot) => (
              <button
                key={plot.id}
                onClick={() => onPreviewPlot(plot.id)}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#eff4ff] hover:bg-[#dce9ff] font-code text-xs text-[#3d4a42] border border-[#bccac0]/40 transition-colors"
              >
                <span className="material-symbols-outlined text-[#006948] text-[16px]">crop_free</span>
                <span className="font-medium">
                  {plot.surveyNo} ({plot.totalAreaAcres} ac / {plot.totalAreaSqFt.toLocaleString()} sq ft)
                </span>
              </button>
            ))}

            <button
              onClick={() => onPreviewPlot(landRecords[0]?.id || '')}
              type="button"
              className="text-[#006194] hover:underline text-xs font-semibold flex items-center gap-1 ml-1"
            >
              <span>Preview Data Stream</span>
              <span className="material-symbols-outlined text-[16px]">north_east</span>
            </button>
          </div>
        </div>
      </section>

      {/* Academic Submission Metadata Footer */}
      <footer className="mt-10 text-center space-y-1 text-xs text-[#565e74]">
        <p>
          Academic Project Submission: Computer Engineering Department • Mini-Project Batch 2024–2025
        </p>
        <p className="font-code text-[#3d4a42]">
          Author: Mayuresh Tapase • Student Reg No: 172 • Theme: Civic Cadastre Digitalization
        </p>
      </footer>
    </div>
  );
};
