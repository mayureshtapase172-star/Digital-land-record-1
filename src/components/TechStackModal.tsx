import React from 'react';

interface TechStackModalProps {
  onClose: () => void;
}

export const TechStackModal: React.FC<TechStackModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-[#e5eeff] p-6 sm:p-8 flex flex-col gap-6 relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-[#565e74] hover:text-[#0b1c30] p-1.5 rounded-lg hover:bg-[#eff4ff] transition-colors"
          title="Close modal"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-[#eff4ff] pb-4">
          <div className="w-12 h-12 rounded-xl bg-[#85f8c4] flex items-center justify-center text-[#002114] shrink-0">
            <span className="material-symbols-outlined text-[28px]">school</span>
          </div>
          <div>
            <span className="font-code text-xs text-[#006948] font-bold uppercase tracking-wider">
              Academic Project Submission Blueprint
            </span>
            <h2 className="text-xl font-bold text-[#0b1c30]">
              Academic Mini-Project: Digital Land Registry
            </h2>
          </div>
        </div>

        {/* Tech Stack Components */}
        <div className="space-y-4 text-xs">
          <div className="p-3.5 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-sm text-[#0b1c30] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006948] text-[18px]">devices</span>
                Frontend Core
              </span>
              <span className="px-2 py-0.5 rounded bg-[#85f8c4] text-[#005137] font-code text-[10px] font-bold">
                Client-Side Tier
              </span>
            </div>
            <p className="text-[#3d4a42] leading-relaxed">
              Standard web basics using <strong>HTML5 semantic elements</strong>, <strong>Tailwind CSS design tokens</strong> for high-contrast institutional styling, and modern <strong>Vanilla JavaScript ES6+ / React TypeScript</strong> for dynamic DOM manipulation and client-side state persistence.
            </p>
          </div>

          <div className="p-3.5 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-sm text-[#0b1c30] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006194] text-[18px]">dns</span>
                Backend Engine
              </span>
              <span className="px-2 py-0.5 rounded bg-[#dce9ff] text-[#004b73] font-code text-[10px] font-bold">
                API Gateway
              </span>
            </div>
            <p className="text-[#3d4a42] leading-relaxed">
              Enterprise REST API service built with <strong>Java Spring Boot 3.2 (Jakarta EE &amp; Java 17)</strong>, with Node.js/Express or FastAPI support. Handles deed submission, JPA entity persistence, input sanitization, and cryptographic SHA-256 token hashing for cadastral records.
            </p>
          </div>

          <div className="p-3.5 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-sm text-[#0b1c30] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#565e74] text-[18px]">database</span>
                Database &amp; GIS Storage
              </span>
              <span className="px-2 py-0.5 rounded bg-[#dce9ff] text-[#565e74] font-code text-[10px] font-bold">
                ACID Compliant
              </span>
            </div>
            <p className="text-[#3d4a42] leading-relaxed">
              Relational data store: <strong>PostgreSQL with PostGIS extension</strong> (or SQLite/MongoDB) adhering to <strong>ISO-19152 Land Administration Domain Model (LADM)</strong>. Cadastral deed photographs stored with secure object bucket storage.
            </p>
          </div>

          {/* Mathematical Conversion Engine */}
          <div className="p-3.5 bg-[#f8f9ff] rounded-xl border border-[#bccac0]/40">
            <span className="font-bold text-xs text-[#0b1c30] uppercase tracking-wider block mb-1">
              Cadastral Surface Area Computation Logic
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-code text-[11px] text-[#3d4a42] mt-1">
              <div className="bg-white p-2 rounded border border-[#e5eeff]">
                <code>Area (sq. ft.) = Length (ft) × Width (ft)</code>
              </div>
              <div className="bg-white p-2 rounded border border-[#e5eeff]">
                <code>Area (Acres) = Area (sq. ft.) / 43,560</code>
              </div>
            </div>
          </div>
        </div>

        {/* Evaluator Viva Readiness Badge */}
        <div className="p-3 bg-[#85f8c4] rounded-xl text-[#002114] flex items-center justify-between font-code text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#006948]">verified</span>
            <span>Student Registration No: 172 • Mayuresh Tapase</span>
          </div>
          <span className="bg-white px-2.5 py-1 rounded text-[#006948]">Status: Ready for Viva (100%)</span>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-[#006948] hover:bg-[#00855d] text-white text-xs font-bold rounded-lg transition-colors"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
