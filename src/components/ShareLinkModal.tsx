import React, { useState } from 'react';

interface ShareLinkModalProps {
  onClose: () => void;
}

export const ShareLinkModal: React.FC<ShareLinkModalProps> = ({ onClose }) => {
  const [copiedDev, setCopiedDev] = useState(false);
  const [copiedShared, setCopiedShared] = useState(false);

  const sharedUrl = 'https://ais-pre-xhanw2gy5wd5u3qlev4kwk-697424600841.asia-northeast1.run.app';
  const devUrl = 'https://ais-dev-xhanw2gy5wd5u3qlev4kwk-697424600841.asia-northeast1.run.app';

  const copyToClipboard = (text: string, isShared: boolean) => {
    navigator.clipboard.writeText(text);
    if (isShared) {
      setCopiedShared(true);
      setTimeout(() => setCopiedShared(false), 2000);
    } else {
      setCopiedDev(true);
      setTimeout(() => setCopiedDev(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/60 backdrop-blur-xs">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl border border-[#e5eeff] p-6 sm:p-7 flex flex-col gap-5 relative animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-[#565e74] hover:text-[#0b1c30] p-1.5 rounded-lg hover:bg-[#eff4ff] transition-colors"
          title="Close modal"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-[#eff4ff] pb-4">
          <div className="w-12 h-12 rounded-xl bg-[#85f8c4] flex items-center justify-center text-[#002114] shrink-0">
            <span className="material-symbols-outlined text-[26px]">link</span>
          </div>
          <div>
            <span className="font-code text-xs text-[#006948] font-bold uppercase tracking-wider">
              Bhoomi Portal Links
            </span>
            <h2 className="text-xl font-bold text-[#0b1c30]">
              Website Access &amp; Share Links
            </h2>
          </div>
        </div>

        {/* Primary Public / Shared URL */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006948]"></span>
              <span>Live Shared Application Link (Recommended for Evaluators)</span>
            </label>
            <span className="px-2 py-0.5 rounded bg-[#85f8c4] text-[#005137] font-code text-[10px] font-bold">
              Public Live
            </span>
          </div>
          <div className="flex rounded-lg overflow-hidden border border-[#bccac0] bg-[#f8f9ff] focus-within:ring-2 focus-within:ring-[#006948]">
            <input
              type="text"
              readOnly
              value={sharedUrl}
              className="w-full bg-transparent px-3.5 py-2.5 text-xs font-code text-[#0b1c30] focus:outline-hidden"
            />
            <button
              type="button"
              onClick={() => copyToClipboard(sharedUrl, true)}
              className="bg-[#006948] hover:bg-[#00855d] text-white px-4 text-xs font-bold flex items-center gap-1 transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedShared ? 'check' : 'content_copy'}
              </span>
              <span>{copiedShared ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#565e74]">
            <span>Use this link for college presentations and external testing</span>
            <a
              href={sharedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#006194] hover:underline font-semibold flex items-center gap-0.5"
            >
              <span>Open in new window</span>
              <span className="material-symbols-outlined text-[14px]">north_east</span>
            </a>
          </div>
        </div>

        {/* Development URL */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[#eff4ff]">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006194]"></span>
              <span>Development Workspace URL</span>
            </label>
            <span className="px-2 py-0.5 rounded bg-[#dce9ff] text-[#004b73] font-code text-[10px] font-bold">
              Development
            </span>
          </div>
          <div className="flex rounded-lg overflow-hidden border border-[#bccac0] bg-[#f8f9ff] focus-within:ring-2 focus-within:ring-[#006194]">
            <input
              type="text"
              readOnly
              value={devUrl}
              className="w-full bg-transparent px-3.5 py-2.5 text-xs font-code text-[#0b1c30] focus:outline-hidden"
            />
            <button
              type="button"
              onClick={() => copyToClipboard(devUrl, false)}
              className="bg-[#006194] hover:bg-[#007bb9] text-white px-4 text-xs font-bold flex items-center gap-1 transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedDev ? 'check' : 'content_copy'}
              </span>
              <span>{copiedDev ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Dependency Files & bun.lock Download Section */}
        <div className="p-3.5 rounded-xl bg-[#f8f9ff] border border-[#dce9ff] flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006948] text-[18px]">inventory_2</span>
              <span>Project Lockfile &amp; Dependencies</span>
            </span>
            <span className="text-[10px] font-code text-[#565e74]">Bun / Node.js</span>
          </div>
          <p className="text-[11px] text-[#565e74] leading-relaxed">
            Need <code className="font-code text-[#006948] font-bold">bun.lock</code> or <code className="font-code text-[#006948] font-bold">package.json</code> for local reproduction? Download them directly:
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <a
              href="/bun.lock"
              download="bun.lock"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#eff4ff] text-[#006948] border border-[#bccac0] rounded-lg text-xs font-code font-bold transition-colors shadow-2xs"
            >
              <span className="material-symbols-outlined text-[15px]">file_download</span>
              <span>Download bun.lock (73 KB)</span>
            </a>
            <a
              href="/package.json"
              download="package.json"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#eff4ff] text-[#0b1c30] border border-[#bccac0] rounded-lg text-xs font-code font-bold transition-colors shadow-2xs"
            >
              <span className="material-symbols-outlined text-[15px]">file_download</span>
              <span>Download package.json</span>
            </a>
          </div>
        </div>

        {/* Micro QR & Direct Launch Box */}
        <div className="p-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white p-1 rounded-lg border border-[#bccac0]/40 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[32px] text-[#0b1c30]">qr_code_2</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#0b1c30]">Mobile Testing Ready</span>
              <span className="text-[11px] text-[#565e74]">
                Directly accessible on mobile browsers and desktops without installation.
              </span>
            </div>
          </div>
          <a
            href={sharedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-white hover:bg-[#eff4ff] text-[#006948] border border-[#bccac0] rounded-lg text-xs font-bold flex items-center gap-1 transition-colors shrink-0 shadow-xs"
          >
            <span>Visit</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-bold rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
