import React, { useState } from 'react';
import { LandRecord, NavigationTab, UserProfile } from '../types';

interface DashboardProps {
  user: UserProfile;
  landRecords: LandRecord[];
  activePlotId: string;
  onSelectPlot: (id: string) => void;
  setActiveTab: (tab: NavigationTab) => void;
  onLogout: () => void;
  onOpenCertificate: (record: LandRecord) => void;
  onChangePassword?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  landRecords,
  activePlotId,
  onSelectPlot,
  setActiveTab,
  onLogout,
  onOpenCertificate,
  onChangePassword,
}) => {
  const [showSatelliteGrid, setShowSatelliteGrid] = useState(true);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Active selected record
  const currentRecord =
    landRecords.find((r) => r.id === activePlotId) || landRecords[0];

  const handleDownloadPdf = () => {
    setIsDownloadingPdf(true);
    setTimeout(() => {
      setIsDownloadingPdf(false);
      // Trigger a synthetic PDF download representation
      const element = document.createElement('a');
      const file = new Blob(
        [
          `BHOOMI DIGITAL LAND REGISTRY - OFFICIAL EXTRACT 7/12\n\n` +
            `Certificate No: ${currentRecord.certificateNo}\n` +
            `Survey Number: ${currentRecord.surveyNo}\n` +
            `Plot Identifier: ${currentRecord.plotIdentifier}\n` +
            `Primary Landholder: ${user.name}\n` +
            `Acreage: ${currentRecord.totalAreaAcres} Acres (${currentRecord.totalAreaSqFt.toLocaleString()} sq ft)\n` +
            `Dimensions: ${currentRecord.length} ft x ${currentRecord.width} ft\n` +
            `Valuation: ₹${currentRecord.estimatedValue}\n` +
            `District & Taluka: ${currentRecord.districtCity}\n` +
            `Village: ${currentRecord.village}\n` +
            `Mutation Status: ${currentRecord.mutationStatus}\n` +
            `Blockchain Deed Hash: ${currentRecord.blockchainHash}\n` +
            `Issued: ${currentRecord.registrationDate}\n`
        ],
        { type: 'text/plain' }
      );
      element.href = URL.createObjectURL(file);
      element.download = `Bhoomi-Land-Deed-${currentRecord.surveyNo.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  return (
    <div className="w-full pb-16">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-4 pb-2">
        <div className="flex items-center gap-1.5 text-xs text-[#565e74]">
          <span className="material-symbols-outlined text-[16px]">home_pin</span>
          <span>Portal</span>
          <span className="text-[#6d7a72]">›</span>
          <span className="text-[#0b1c30] font-semibold">Academic Land Registry</span>
          <span className="text-[#6d7a72]">›</span>
          <span className="text-[#006948] font-bold font-code">{currentRecord.surveyNo}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 py-3 flex flex-col gap-6">
        {/* Landowner Profile & Verification Banner */}
        <div className="w-full bg-white rounded-xl shadow-xs border border-[#e5eeff] p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl bg-[#e5eeff] flex items-center justify-center shrink-0 text-[#006948] overflow-hidden shadow-xs">
              <span
                className="material-symbols-outlined text-[40px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                account_circle
              </span>
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-[#00855d] border-2 border-white"></span>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold text-[#0b1c30]">
                  Welcome back, {user.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eff4ff] text-[#006948] border border-[#bccac0]/40 text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Verified Landowner
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#565e74]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#6d7a72]">mail</span>
                  {user.email}
                </span>
                <span className="hidden sm:inline text-[#bccac0]">•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#6d7a72]">call</span>
                  {user.phone}
                </span>
                <span className="hidden sm:inline text-[#bccac0]">•</span>
                <span className="font-code text-[#3d4a42] font-semibold">
                  UIDAI: {user.uidai}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {onChangePassword && (
              <button
                onClick={onChangePassword}
                type="button"
                className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-white hover:bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold rounded-lg border border-[#bccac0] transition-colors shadow-xs"
                title="Change access password"
              >
                <span className="material-symbols-outlined text-[16px] text-[#006948]">lock_reset</span>
                <span>Change Password</span>
              </button>
            )}
            <button
              onClick={() => onOpenCertificate(currentRecord)}
              type="button"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold rounded-lg border border-[#bccac0]/40 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Digital Extract</span>
            </button>
            <button
              onClick={() => setActiveTab('registration')}
              type="button"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#006948] hover:bg-[#00855d] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">add_location_alt</span>
              <span>Register New Record</span>
            </button>
          </div>
        </div>

        {/* Multi-Plot Selector Pill Bar */}
        <div className="w-full bg-white rounded-xl shadow-xs border border-[#e5eeff] p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006948] text-[20px]">layers</span>
            <span className="text-xs font-bold text-[#0b1c30] uppercase tracking-wide">
              Registered Holdings ({landRecords.length} Properties)
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {landRecords.map((plot) => (
              <button
                key={plot.id}
                onClick={() => onSelectPlot(plot.id)}
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium font-code transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  plot.id === currentRecord.id
                    ? 'bg-[#006948] text-white shadow-xs font-bold'
                    : 'bg-[#eff4ff] text-[#3d4a42] hover:bg-[#dce9ff]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {plot.id === currentRecord.id ? 'check_circle' : 'crop_square'}
                </span>
                <span>{plot.surveyNo}</span>
                <span className="opacity-80 text-[11px]">({plot.totalAreaAcres} ac)</span>
              </button>
            ))}
          </div>
        </div>

        {/* Central Land Showcase Banner (Aerial Survey Photo) */}
        <div className="w-full bg-white rounded-xl shadow-xs border border-[#e5eeff] overflow-hidden flex flex-col">
          <div className="relative w-full h-[360px] md:h-[450px] bg-[#dce9ff] group overflow-hidden">
            <img
              src={currentRecord.photoUrl}
              alt={`Aerial survey view of ${currentRecord.surveyNo}`}
              className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#213145]/70 via-[#213145]/20 to-transparent pointer-events-none"></div>

            {/* Overlaid Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-md bg-[#213145]/90 backdrop-blur-md text-white font-code text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#85f8c4]">
                    share_location
                  </span>
                  <span>PARCEL ID: #{currentRecord.id}</span>
                </span>
                <span className="px-3 py-1.5 rounded-md bg-white/95 backdrop-blur-md text-[#006948] text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse"></span>
                  <span>Survey Active</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-md bg-[#00855d] text-white text-xs font-semibold flex items-center gap-1 shadow-xs">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    lock
                  </span>
                  <span>Digitally Verified &amp; Locked</span>
                </span>
              </div>
            </div>

            {/* Survey Geofence Markers Overlay */}
            {showSatelliteGrid && (
              <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-[#85f8c4]/40 m-8 rounded-lg flex items-center justify-center">
                <div className="absolute top-2 left-2 bg-[#002114]/80 text-[#85f8c4] font-code text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
                  CORNER #1 (NW): {currentRecord.geoCenter}
                </div>
                <div className="absolute top-2 right-2 bg-[#002114]/80 text-[#85f8c4] font-code text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
                  CORNER #2 (NE)
                </div>
                <div className="absolute bottom-2 left-2 bg-[#002114]/80 text-[#85f8c4] font-code text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
                  CORNER #3 (SW)
                </div>
                <div className="absolute bottom-2 right-2 bg-[#002114]/80 text-[#85f8c4] font-code text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
                  CORNER #4 (SE)
                </div>
              </div>
            )}

            {/* Survey Boundary Corner Coordinates Markers on Image Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="p-3 rounded-lg bg-white/95 backdrop-blur-md shadow-md max-w-sm border border-[#e5eeff]">
                <div className="flex items-center gap-1.5 text-[#006948] text-xs font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px]">satellite_alt</span>
                  <span>Satellite Boundary Geofence</span>
                </div>
                <div className="font-code text-xs text-[#0b1c30] mt-1 flex items-center gap-2">
                  <span>Geo Center:</span>
                  <span className="font-bold text-[#3d4a42] bg-[#eff4ff] px-1.5 py-0.5 rounded">
                    {currentRecord.geoCenter}
                  </span>
                </div>
                <p className="text-[11px] text-[#565e74] mt-1">
                  4 Boundary corner flags verified via Bhoomi Digital DGPS Survey Module.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setShowSatelliteGrid(!showSatelliteGrid)}
                  className="px-3 py-1.5 rounded-lg bg-[#213145]/90 backdrop-blur-md text-white font-code text-xs flex items-center gap-1.5 hover:bg-[#213145] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#cce5ff]">layers</span>
                  <span>{showSatelliteGrid ? 'Hide Geofence Grid' : 'Cadastral Map Rev. 2026.4'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Inspection Micro-bar */}
          <div className="bg-[#eff4ff] px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#565e74] font-code border-t border-[#dce9ff]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[#3d4a42] font-medium">
                <span className="material-symbols-outlined text-[16px] text-[#006948]">
                  verified_user
                </span>
                Immutable Blockchain Deed Hash: {currentRecord.blockchainHash.slice(0, 10)}...
                {currentRecord.blockchainHash.slice(-4)}
              </span>
              <span className="hidden md:inline text-[#bccac0]">•</span>
              <span className="hidden md:inline">Zoning: {currentRecord.zoning}</span>
            </div>
            <div className="flex items-center gap-1 text-[#006948] font-semibold">
              <span className="material-symbols-outlined text-[16px]">cloud_done</span>
              <span>Synced to Maharashtra State Land Registry</span>
            </div>
          </div>
        </div>

        {/* The 3 Primary Numerical / Metric Info Cards (Required by Specification) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Land Area */}
          <div className="bg-white rounded-xl shadow-xs border border-[#e5eeff] p-5 sm:p-6 flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-[#565e74] font-bold uppercase tracking-wider">
                  Metric 01 • Total Parcel Area
                </span>
                <h3 className="text-base font-bold text-[#0b1c30] mt-1">
                  Registered Land Area
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#006948] shrink-0">
                <span className="material-symbols-outlined text-[26px]">square_foot</span>
              </div>
            </div>

            <div className="my-5">
              <div className="flex items-baseline gap-2">
                <span className="font-numeric font-extrabold text-3xl sm:text-4xl text-[#0b1c30] leading-none">
                  {currentRecord.totalAreaAcres}
                </span>
                <span className="text-base font-bold text-[#565e74]">Acres</span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#eff4ff] font-code text-xs text-[#3d4a42] font-medium border border-[#bccac0]/30">
                <span className="material-symbols-outlined text-[14px] text-[#006948]">
                  check_circle
                </span>
                <span>
                  {currentRecord.totalAreaSqFt.toLocaleString()} sq. ft. •{' '}
                  {(currentRecord.totalAreaSqFt * 0.092903).toFixed(1)} sq. m.
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#eff4ff] flex items-center justify-between text-xs text-[#565e74]">
              <span>Boundary Status</span>
              <span className="font-bold text-[#006948]">
                {currentRecord.boundaryStatus || 'Enclosed & Fenced'}
              </span>
            </div>
          </div>

          {/* Card 2: Land Dimensions */}
          <div className="bg-white rounded-xl shadow-xs border border-[#e5eeff] p-5 sm:p-6 flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-[#565e74] font-bold uppercase tracking-wider">
                  Metric 02 • Geometric Proportions
                </span>
                <h3 className="text-base font-bold text-[#0b1c30] mt-1">
                  Land Dimensions
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#006948] shrink-0">
                <span className="material-symbols-outlined text-[26px]">straighten</span>
              </div>
            </div>

            <div className="my-5">
              <div className="flex items-baseline gap-2 overflow-x-auto pb-0.5">
                <span className="font-numeric font-extrabold text-3xl sm:text-4xl text-[#0b1c30] leading-none">
                  {currentRecord.length}
                </span>
                <span className="text-sm font-semibold text-[#565e74]">ft</span>
                <span className="text-xl text-[#006948] font-bold mx-1">×</span>
                <span className="font-numeric font-extrabold text-3xl sm:text-4xl text-[#0b1c30] leading-none">
                  {currentRecord.width}
                </span>
                <span className="text-sm font-semibold text-[#565e74]">ft</span>
              </div>
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#eff4ff] font-code text-xs text-[#3d4a42] font-medium border border-[#bccac0]/30">
                <span className="material-symbols-outlined text-[14px] text-[#565e74]">crop_free</span>
                <span>Rectangular Quadrilateral Survey</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#eff4ff] flex items-center justify-between text-xs text-[#565e74]">
              <span>Road Frontage Access</span>
              <span className="font-semibold text-[#0b1c30]">
                {currentRecord.roadFrontage || `${currentRecord.length} ft Approach`}
              </span>
            </div>
          </div>

          {/* Card 3: Estimated Value */}
          <div className="bg-white rounded-xl shadow-xs border border-[#e5eeff] p-5 sm:p-6 flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-[#565e74] font-bold uppercase tracking-wider">
                  Metric 03 • Revenue Valuation
                </span>
                <h3 className="text-base font-bold text-[#0b1c30] mt-1">
                  Estimated Fair Value
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#85f8c4]/30 flex items-center justify-center text-[#006948] shrink-0">
                <span className="material-symbols-outlined text-[26px]">currency_rupee</span>
              </div>
            </div>

            <div className="my-5">
              <div className="flex items-baseline gap-1">
                <span className="font-numeric font-extrabold text-3xl sm:text-4xl text-[#006948] leading-none">
                  ₹{currentRecord.estimatedValue}
                </span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#eff4ff] font-code text-xs text-[#3d4a42] font-medium border border-[#bccac0]/30">
                <span className="material-symbols-outlined text-[14px] text-[#006948]">
                  trending_up
                </span>
                <span>${currentRecord.valueUsd || '45,000'} USD • Ready Reckoner 2026</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#eff4ff] flex items-center justify-between text-xs text-[#565e74]">
              <span>Official Appraisal Date</span>
              <span className="font-semibold text-[#0b1c30]">
                {currentRecord.registrationDate}
              </span>
            </div>
          </div>
        </div>

        {/* Secondary Clean Details & Official Record Extract */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Official Deed Registry Specifications (Read-Only) */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-xs border border-[#e5eeff] p-5 sm:p-6 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-[#eff4ff]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#eff4ff] text-[#006948] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">description</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0b1c30]">
                    Digital Land Record Specifications
                  </h2>
                  <p className="text-xs text-[#565e74]">
                    Official 7/12 &amp; Bhoomi Record of Rights (RoR) ledger summary
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#e5eeff] text-[#006948] font-code text-xs font-bold">
                BLR-MH-2026
              </span>
            </div>

            {/* Read-only Data Pairs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              <div className="p-3.5 rounded-lg bg-[#eff4ff] flex flex-col gap-0.5">
                <span className="text-[11px] text-[#565e74] uppercase font-semibold">
                  Survey / Gat Number
                </span>
                <span className="text-sm font-bold text-[#0b1c30] font-code">
                  {currentRecord.surveyNo}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#eff4ff] flex flex-col gap-0.5">
                <span className="text-[11px] text-[#565e74] uppercase font-semibold">
                  Plot Identifier
                </span>
                <span className="text-sm font-bold text-[#0b1c30]">
                  {currentRecord.plotIdentifier}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#eff4ff] flex flex-col gap-0.5">
                <span className="text-[11px] text-[#565e74] uppercase font-semibold">
                  Sub-District &amp; Taluka
                </span>
                <span className="text-sm font-bold text-[#0b1c30]">
                  {currentRecord.districtCity}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#eff4ff] flex flex-col gap-0.5">
                <span className="text-[11px] text-[#565e74] uppercase font-semibold">
                  Village / Locality
                </span>
                <span className="text-sm font-bold text-[#0b1c30]">
                  {currentRecord.village}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#eff4ff] flex flex-col gap-0.5">
                <span className="text-[11px] text-[#565e74] uppercase font-semibold">
                  Registration Date
                </span>
                <span className="text-sm font-bold text-[#0b1c30]">
                  {currentRecord.registrationDate}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#eff4ff] flex flex-col gap-0.5">
                <span className="text-[11px] text-[#565e74] uppercase font-semibold">
                  Mutation Status
                </span>
                <div className="flex items-center gap-1.5 text-[#006948] font-bold text-sm">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>{currentRecord.mutationStatus}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#eff4ff] flex flex-col gap-0.5">
                <span className="text-[11px] text-[#565e74] uppercase font-semibold">
                  Nature of Holding
                </span>
                <span className="text-sm font-bold text-[#0b1c30]">
                  {currentRecord.natureOfHolding}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#eff4ff] flex flex-col gap-0.5">
                <span className="text-[11px] text-[#565e74] uppercase font-semibold">
                  Encumbrance / Lien
                </span>
                <span className="text-sm font-bold text-[#006948]">
                  {currentRecord.encumbrance}
                </span>
              </div>
            </div>

            {/* Document Download Strip */}
            <div className="mt-6 p-4 rounded-lg bg-[#e5eeff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#dce9ff]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[32px] text-[#006194]">
                  article
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0b1c30]">
                    Digital Registered Deed Document (PDF • 4.2 MB)
                  </span>
                  <span className="text-[11px] text-[#565e74]">
                    Digitally counter-signed by Sub-Registrar Officer {currentRecord.districtCity}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isDownloadingPdf}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold rounded-lg shadow-xs border border-[#bccac0] transition-colors shrink-0 disabled:opacity-60"
              >
                {isDownloadingPdf ? (
                  <>
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-[#006948] border-t-transparent animate-spin"></div>
                    <span>Exporting PDF...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px] text-[#006948]">
                      file_download
                    </span>
                    <span>Download Certified PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right 1 Col: Deed Certificate Export & Security Summary Card */}
          <div className="bg-white rounded-xl shadow-xs border border-[#e5eeff] p-5 sm:p-6 flex flex-col justify-between">
            <div className="flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#006948] mb-3">
                <span className="material-symbols-outlined text-[28px]">workspace_premium</span>
              </div>
              <h3 className="text-base font-bold text-[#0b1c30]">
                Bhoomi Academic Certificate
              </h3>
              <p className="text-xs text-[#565e74] mt-0.5">
                Authorized digital land credential designed for academic submission and verification.
              </p>

              {/* Micro Certificate Graphic Box */}
              <div className="mt-4 p-4 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[#565e74] font-code text-xs">
                  <span>CERTIFICATE NO.</span>
                  <span className="text-[#0b1c30] font-bold">{currentRecord.certificateNo}</span>
                </div>
                <div className="w-full h-px bg-[#bccac0]/30"></div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#565e74]">PRIMARY HOLDER</span>
                  <span className="text-sm font-bold text-[#0b1c30]">{user.name}</span>
                </div>
                <div className="flex justify-between items-end mt-1">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-[#565e74]">REGISTERED AREA</span>
                    <span className="font-numeric font-bold text-lg text-[#0b1c30]">
                      {currentRecord.totalAreaAcres} Acres
                    </span>
                  </div>
                  <div className="w-14 h-14 rounded-lg bg-white p-1 border border-[#bccac0]/40 flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[34px] text-[#0b1c30]">
                      qr_code_2
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-1.5 text-xs text-[#565e74]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#006948]">
                    check_circle
                  </span>
                  <span>256-bit Hash Integrity Confirmed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#006948]">
                    check_circle
                  </span>
                  <span>Zero pending litigation records</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#006948]">
                    check_circle
                  </span>
                  <span>Cadastral geo-coordinates mapped</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onOpenCertificate(currentRecord)}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#006948] hover:bg-[#00855d] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span>Print Land Deed Certificate</span>
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold rounded-lg transition-colors border border-[#dce9ff]"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                <span>Sign Out Session</span>
              </button>
            </div>
          </div>
        </div>

        {/* Academic Presentation Notice */}
        <div className="w-full bg-[#e5eeff] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#565e74] font-code border border-[#dce9ff]">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="material-symbols-outlined text-[20px] text-[#006948] shrink-0">
              school
            </span>
            <span>
              Academic Project Display: Designed for Computer Applications presentation by{' '}
              {user.name}.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2 py-0.5 rounded bg-white text-[#0b1c30] font-bold shadow-xs">
              Bhoomi Ver 2.4.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
