import React from 'react';
import { LandRecord, UserProfile } from '../types';

interface CertificateModalProps {
  record: LandRecord;
  user: UserProfile;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  record,
  user,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border-4 border-[#006948] p-6 sm:p-8 flex flex-col gap-6 relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-[#565e74] hover:text-[#0b1c30] p-1.5 rounded-lg hover:bg-[#eff4ff] transition-colors no-print"
          title="Close modal"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        {/* Certificate Header */}
        <div className="flex flex-col items-center text-center border-b-2 border-[#dce9ff] pb-5">
          <div className="w-16 h-16 rounded-full bg-[#eff4ff] border-2 border-[#006948] flex items-center justify-center text-[#006948] mb-2 shadow-xs">
            <span className="material-symbols-outlined text-[36px]">shield</span>
          </div>
          <span className="font-code text-xs font-bold text-[#006948] uppercase tracking-widest">
            Government of Maharashtra • Cadastre &amp; Land Revenue Digitalization
          </span>
          <h2 className="text-2xl font-extrabold text-[#0b1c30] mt-1 tracking-tight">
            Certified Extract of Record of Rights (Form 7/12)
          </h2>
          <p className="text-xs text-[#565e74] font-medium mt-0.5">
            Cadastral Digital Archive • Bhoomi System Project MH-2026
          </p>
          <div className="mt-3 px-3 py-1 rounded bg-[#eff4ff] text-[#006948] font-code text-xs font-bold border border-[#bccac0]/40">
            Certificate ID: {record.certificateNo}
          </div>
        </div>

        {/* Certificate Body Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-[#f8f9ff] rounded-lg border border-[#e5eeff]">
            <span className="text-[#565e74] uppercase text-[10px] font-bold">Registered Landholder</span>
            <p className="text-sm font-bold text-[#0b1c30] mt-0.5">{user.name}</p>
            <p className="text-[11px] text-[#565e74] font-code">UIDAI: {user.uidai}</p>
          </div>

          <div className="p-3 bg-[#f8f9ff] rounded-lg border border-[#e5eeff]">
            <span className="text-[#565e74] uppercase text-[10px] font-bold">Cadastral Survey Number</span>
            <p className="text-sm font-bold text-[#006948] font-code mt-0.5">{record.surveyNo}</p>
            <p className="text-[11px] text-[#565e74]">{record.plotIdentifier}</p>
          </div>

          <div className="p-3 bg-[#f8f9ff] rounded-lg border border-[#e5eeff]">
            <span className="text-[#565e74] uppercase text-[10px] font-bold">Total Computed Area</span>
            <p className="text-base font-extrabold text-[#0b1c30] font-numeric mt-0.5">
              {record.totalAreaAcres} Acres
            </p>
            <p className="text-[11px] text-[#565e74] font-code">
              {record.totalAreaSqFt.toLocaleString()} sq. ft. ({record.length} ft × {record.width} ft)
            </p>
          </div>

          <div className="p-3 bg-[#f8f9ff] rounded-lg border border-[#e5eeff]">
            <span className="text-[#565e74] uppercase text-[10px] font-bold">Monetary Valuation</span>
            <p className="text-base font-extrabold text-[#006948] font-numeric mt-0.5">
              ₹{record.estimatedValue}
            </p>
            <p className="text-[11px] text-[#565e74] font-code">Ready Reckoner 2026 Fair Value</p>
          </div>

          <div className="p-3 bg-[#f8f9ff] rounded-lg border border-[#e5eeff]">
            <span className="text-[#565e74] uppercase text-[10px] font-bold">District &amp; Taluka</span>
            <p className="text-xs font-bold text-[#0b1c30] mt-0.5">{record.districtCity}</p>
            <p className="text-[11px] text-[#565e74]">{record.village}</p>
          </div>

          <div className="p-3 bg-[#f8f9ff] rounded-lg border border-[#e5eeff]">
            <span className="text-[#565e74] uppercase text-[10px] font-bold">Mutation &amp; Holding Status</span>
            <p className="text-xs font-bold text-[#006948] mt-0.5">{record.mutationStatus}</p>
            <p className="text-[11px] text-[#565e74]">{record.natureOfHolding}</p>
          </div>
        </div>

        {/* Security & Cryptographic Watermark */}
        <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1 text-[11px] text-[#565e74]">
            <div className="flex items-center gap-1.5 font-bold text-[#0b1c30]">
              <span className="material-symbols-outlined text-[16px] text-[#006948]">verified</span>
              <span>SHA-256 Cadastral Cryptographic Token</span>
            </div>
            <code className="font-code text-[10px] text-[#3d4a42] break-all">
              {record.blockchainHash}
            </code>
            <span>Geo Coordinate: {record.geoCenter}</span>
          </div>
          <div className="w-16 h-16 bg-white p-1 rounded-lg border border-[#bccac0]/40 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[44px] text-[#0b1c30]">qr_code_2</span>
          </div>
        </div>

        {/* Certificate Signatures */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#dce9ff] text-center text-xs">
          <div className="flex flex-col items-center">
            <span className="font-script text-lg text-[#006194] italic font-semibold">
              Mayuresh Tapase
            </span>
            <span className="text-[11px] text-[#565e74]">Student Author / Digital Registrar</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-script text-lg text-[#006948] italic font-semibold">
              Govt. Sub-Registrar
            </span>
            <span className="text-[11px] text-[#565e74]">Haveli Pune Cadastral Desk</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 no-print">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-[#565e74] hover:bg-[#eff4ff] rounded-lg transition-colors"
          >
            Dismiss
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#006948] hover:bg-[#00855d] text-white text-xs font-bold rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Print Official Deed Document</span>
          </button>
        </div>
      </div>
    </div>
  );
};
