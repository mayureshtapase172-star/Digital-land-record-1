import React, { useState, useEffect } from 'react';
import { LandRecord, NavigationTab, UserProfile } from './types';
import { DEMO_USER, INITIAL_LAND_RECORDS } from './data/initialData';
import { Header } from './components/Header';
import { AuthPanel } from './components/AuthPanel';
import { Dashboard } from './components/Dashboard';
import { RegistrationForm } from './components/RegistrationForm';
import { CertificateModal } from './components/CertificateModal';
import { TechStackModal } from './components/TechStackModal';
import { ShareLinkModal } from './components/ShareLinkModal';
import { JavaProjectHub } from './components/JavaProjectHub';

const STORAGE_KEY_RECORDS = 'bhoomi_land_records_v1';
const STORAGE_KEY_USER = 'bhoomi_user_profile_v1';
const STORAGE_KEY_LOGGED_IN = 'bhoomi_user_logged_in_v1';

export default function App() {
  // Navigation: Authentication Panel is the homepage as requested in specification
  const [activeTab, setActiveTab] = useState<NavigationTab>('auth');
  
  // User state
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_LOGGED_IN) === 'true';
    } catch {
      return false;
    }
  });

  // Land Records State
  const [landRecords, setLandRecords] = useState<LandRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RECORDS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_LAND_RECORDS;
  });

  // Active selected plot in dashboard
  const [activePlotId, setActivePlotId] = useState<string>(
    INITIAL_LAND_RECORDS[0]?.id || ''
  );

  // Modals state
  const [selectedCertificateRecord, setSelectedCertificateRecord] = useState<LandRecord | null>(null);
  const [showTechStackModal, setShowTechStackModal] = useState<boolean>(false);
  const [showShareLinkModal, setShowShareLinkModal] = useState<boolean>(false);

  // Persist records
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(landRecords));
    } catch {
      // ignore
    }
  }, [landRecords]);

  // Persist user and login state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEY_LOGGED_IN, String(isLoggedIn));
    } catch {
      // ignore
    }
  }, [user, isLoggedIn]);

  const handleLoginSuccess = (partialUser: Partial<UserProfile>) => {
    const updatedUser = {
      ...user,
      ...partialUser,
    };
    setUser(updatedUser);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('auth');
  };

  const handleResetData = () => {
    setLandRecords(INITIAL_LAND_RECORDS);
    setUser(DEMO_USER);
    setActivePlotId(INITIAL_LAND_RECORDS[0]?.id || '');
    try {
      localStorage.removeItem(STORAGE_KEY_RECORDS);
      localStorage.removeItem(STORAGE_KEY_USER);
    } catch {
      // ignore
    }
  };

  const handleSaveRecord = (newRecord: LandRecord) => {
    setLandRecords((prev) => [newRecord, ...prev]);
    setActivePlotId(newRecord.id);
  };

  const handlePreviewPlot = (plotId: string) => {
    if (plotId) {
      setActivePlotId(plotId);
    }
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#85f8c4] selection:text-[#002114]">
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onOpenTechStack={() => setShowTechStackModal(true)}
        onOpenShareLink={() => setShowShareLinkModal(true)}
      />

      {/* Main Page Views */}
      <main className="flex-1 w-full pt-36 lg:pt-28">
        {activeTab === 'auth' && (
          <AuthPanel
            onLoginSuccess={handleLoginSuccess}
            onPreviewPlot={handlePreviewPlot}
            landRecords={landRecords}
            onResetData={handleResetData}
            onOpenShareLink={() => setShowShareLinkModal(true)}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            user={user}
            landRecords={landRecords}
            activePlotId={activePlotId}
            onSelectPlot={(id) => setActivePlotId(id)}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
            onOpenCertificate={(record) => setSelectedCertificateRecord(record)}
          />
        )}

        {activeTab === 'registration' && (
          <RegistrationForm
            user={user}
            onSaveRecord={handleSaveRecord}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'java' && (
          <JavaProjectHub />
        )}
      </main>

      {/* Global Academic Digitalization Footer */}
      <footer className="w-full bg-white border-t border-[#e5eeff] py-5 px-4 sm:px-10 mt-auto shadow-xs no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#565e74]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#006948]"></span>
            <span>© 2025–2026 Bhoomi Land Registry Project. Academic Digitalization Framework.</span>
          </div>
          <div className="flex items-center gap-4 font-code text-[11px] text-[#3d4a42]">
            <button
              onClick={() => setShowTechStackModal(true)}
              className="text-[#006194] hover:underline flex items-center gap-1 font-semibold"
            >
              <span className="material-symbols-outlined text-[14px]">terminal</span>
              Recommended Tech Stack &amp; Schema
            </button>
            <span className="hidden md:inline text-[#bccac0]">•</span>
            <span className="hidden md:inline">Supervised: Dept. of Computer Applications</span>
            <span className="hidden md:inline text-[#bccac0]">•</span>
            <span className="font-bold">System ID: BLR-2025-DEV</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedCertificateRecord && (
        <CertificateModal
          record={selectedCertificateRecord}
          user={user}
          onClose={() => setSelectedCertificateRecord(null)}
        />
      )}

      {showTechStackModal && (
        <TechStackModal onClose={() => setShowTechStackModal(false)} />
      )}

      {showShareLinkModal && (
        <ShareLinkModal onClose={() => setShowShareLinkModal(false)} />
      )}
    </div>
  );
}
