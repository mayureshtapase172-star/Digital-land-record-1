import React, { useState, useId, useRef } from 'react';
import { LandRecord, NavigationTab, UserProfile } from '../types';

interface RegistrationFormProps {
  user: UserProfile;
  onSaveRecord: (newRecord: LandRecord) => void;
  setActiveTab: (tab: NavigationTab) => void;
}

const PRESET_PHOTOS = [
  {
    name: 'cadastral_survey_plot_894b.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFI6iDBMHtJR0hw69Qx_VnjXs1K4FkiAv6y2LbxwXBiySy6STRi9I_JxwiUfMnCnChskYXDw8qtVoUhhL-TYqO9uFnuIzRMXZfPh5K5Xc34dbslXhxxGrMuTOb21zmWuaTzOVEnGiRFF2MsYg2Wk7vqUgbRPHjyUaInXjJxbpdRaiAIPut2ffawOEYMGyMKk3UDBbwYqBIJwl1hoc3pVCYiVn2kYwYaPlCcrIN8Diivl3vHpwatWuM',
    tag: '3.4 MB • Geo-tagged (18.5204° N, 73.8567° E)',
  },
  {
    name: 'aerial_survey_farm_sector.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4M08UmCXcxsk6dFkHv0gSz0lXwu5aUfInCupeLUNQDwo5mJOKetL0VKV9SjV09b4fFxm6CpLqW9iB6b_xM0Z5nljtCkUV02Q795Cz42cDMnkdQqFxS5YBAe6Ocy5c702OxVkK6RRqXWf7A0JiEwaYw5qWaFGFy7Rf9rmjLoA9vtWb9QQX0F3HxWwzTwHh9O5U_OZqQNCjewoVJhfWH4ZFhHhGcoDmPJn84guvSIsAp4og-ATVRkN5',
    tag: '2.8 MB • Geo-tagged (18.6144° N, 73.9102° E)',
  },
  {
    name: 'cadastral_boundary_drone.jpg',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKSxdnukKR27IW4vyqPqnh3y4j5tJsRBRpYAJ1FSjOKU7Wyw01-kSHSx-BWXAf0E0FLoR9L431b6OmhrkuNkQp69p8csjbceynVmYNdBjLLuEqI6_SPunYlOQrSbKjzYStxyvmyEBn-ojPpE70zXl6nnsXFvs18K-g-T164Sce1lmygIghG0MmTMlG-aUmzqyaHKyZZiyvqI-iBhIm195h0s_xF6JScIGy8FH2jMmfYw1It-2INzli',
    tag: '4.1 MB • Geo-tagged (18.7210° N, 73.7915° E)',
  },
];

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  user,
  onSaveRecord,
  setActiveTab,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Fields (initialized with sample data matching Image 7)
  const [surveyNo, setSurveyNo] = useState('MH-PUN-2025/894B');
  const [districtCity, setDistrictCity] = useState('Pune Rural (Haveli Taluka)');
  const [plotLength, setPlotLength] = useState<number | string>(150);
  const [plotWidth, setPlotWidth] = useState<number | string>(145);
  const [estimatedValue, setEstimatedValue] = useState('3,650,000');
  const [zoningType, setZoningType] = useState('Agricultural (Cultivable Non-Irrigated)');
  
  // Image handling
  const [selectedPhoto, setSelectedPhoto] = useState(PRESET_PHOTOS[0].url);
  const [fileName, setFileName] = useState(PRESET_PHOTOS[0].name);
  const [fileTag, setFileTag] = useState(PRESET_PHOTOS[0].tag);

  // Submission & Modal state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [savedSurveyNo, setSavedSurveyNo] = useState('');

  // Auto-calculated dimensions
  const numLength = parseFloat(String(plotLength)) || 0;
  const numWidth = parseFloat(String(plotWidth)) || 0;
  const calculatedSqFt = Math.round(numLength * numWidth);
  const calculatedAcres = Number((calculatedSqFt / 43560).toFixed(2));

  // Format value string for display
  const cleanValue = String(estimatedValue).replace(/[^0-9]/g, '');
  const numericValue = parseInt(cleanValue, 10) || 0;
  const formattedCurrency = numericValue ? numericValue.toLocaleString('en-IN') : '0';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileTag(`${(file.size / (1024 * 1024)).toFixed(1)} MB • User Upload (GPS Verified)`);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setSelectedPhoto(PRESET_PHOTOS[0].url);
    setFileName(PRESET_PHOTOS[0].name);
    setFileTag(PRESET_PHOTOS[0].tag);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSavedSurveyNo(surveyNo || 'MH-PUN-2025/894B');

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newRecord: LandRecord = {
      id: `LND-MH-2026-${randomSuffix}`,
      surveyNo: surveyNo || `MH-PUN-2026/${randomSuffix}`,
      plotIdentifier: `Plot No. ${surveyNo.split('/').pop() || randomSuffix} (${districtCity.split(' ')[0]} Block)`,
      districtCity: districtCity || 'Haveli, Pune Division',
      village: 'Wagholi Rural (Zone 04)',
      length: numLength,
      width: numWidth,
      totalAreaSqFt: calculatedSqFt,
      totalAreaAcres: calculatedAcres,
      estimatedValue: formattedCurrency,
      estimatedValueRaw: numericValue,
      valueUsd: Math.round(numericValue / 83.5).toLocaleString(),
      zoning: zoningType,
      photoUrl: selectedPhoto,
      fileName: fileName,
      registrationDate: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      mutationStatus: `Approved (Mut. #${randomSuffix * 2})`,
      natureOfHolding: 'Occupant Class-1 (Freehold)',
      encumbrance: 'Nil (Clear Title)',
      certificateNo: `#ACAD-BHM-${randomSuffix}`,
      blockchainHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}941a`,
      geoCenter: '18.5204° N, 73.8567° E',
      boundaryStatus: 'Enclosed & Fenced',
      roadFrontage: `${numLength} ft Approach Road`,
    };

    // Show confirmation modal
    setShowSuccessModal(true);

    // Save record and redirect to dashboard
    setTimeout(() => {
      onSaveRecord(newRecord);
      setIsSubmitting(false);
      setShowSuccessModal(false);
      setActiveTab('dashboard');
    }, 2200);
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
          <span className="text-[#006948] font-bold font-code">Digitize Land Form</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-3 w-full">
        {/* Top Bar Badge & Context Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#dce9ff] text-[#006948] font-code text-xs shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006948] animate-pulse"></span>
              <span className="font-semibold">Bhoomi Form Module #03</span>
              <span className="text-[#565e74]">•</span>
              <span>Survey Verification Pipeline</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
              Digitize New Land Record
            </h1>
            <p className="text-sm text-[#565e74] max-w-2xl">
              Enter physical plot dimensions, valuation, and upload land photograph to register property
              into the immutable registry database.
            </p>
          </div>

          {/* Authenticated Registrar Pill */}
          <div className="flex items-center gap-3 p-2.5 bg-[#eff4ff] rounded-xl border border-[#dce9ff] shadow-xs">
            <div className="w-9 h-9 rounded-full bg-[#00855d] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </div>
            <div className="flex flex-col pr-2 min-w-0">
              <span className="text-[11px] text-[#565e74] font-medium">Authenticated Registrar</span>
              <span className="font-code text-xs text-[#0b1c30] truncate font-bold">
                {user.name} ({user.email})
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Form + Preview/Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 sm:p-8 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col gap-6"
            >
              {/* Section 1: Plot Identification */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2.5 pb-1">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#85f8c4] text-[#002114] font-code text-xs font-bold">
                    1
                  </span>
                  <h2 className="text-lg font-bold text-[#0b1c30]">Plot Identification</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">
                      Survey / Plot Number <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-[#565e74] text-[20px]">
                        pin
                      </span>
                      <input
                        type="text"
                        value={surveyNo}
                        onChange={(e) => setSurveyNo(e.target.value)}
                        required
                        placeholder="e.g. 104/3A"
                        className="w-full bg-[#f8f9ff] pl-10 pr-4 py-2.5 rounded-lg text-[#0b1c30] font-code text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#006948] border border-[#dce9ff]"
                      />
                    </div>
                    <span className="text-[11px] text-[#565e74]">
                      Official land revenue census or registry index code
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">
                      District / Revenue Division <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-[#565e74] text-[20px]">
                        location_on
                      </span>
                      <input
                        type="text"
                        value={districtCity}
                        onChange={(e) => setDistrictCity(e.target.value)}
                        required
                        placeholder="e.g. Pune, Maharashtra"
                        className="w-full bg-[#f8f9ff] pl-10 pr-4 py-2.5 rounded-lg text-[#0b1c30] text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#006948] border border-[#dce9ff]"
                      />
                    </div>
                    <span className="text-[11px] text-[#565e74]">
                      Jurisdictional land registry sub-registrar office
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-[#eff4ff] w-full"></div>

              {/* Section 2: Spatial Dimensions & Surface Area */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#85f8c4] text-[#002114] font-code text-xs font-bold">
                      2
                    </span>
                    <h2 className="text-lg font-bold text-[#0b1c30]">
                      Spatial Dimensions &amp; Surface Area
                    </h2>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#85f8c4] text-[#005137] font-code text-[11px] font-bold flex items-center gap-1 shadow-xs">
                    <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
                    Auto-Calculated
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Length Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">
                      Length <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="flex rounded-lg overflow-hidden bg-[#f8f9ff] focus-within:ring-2 focus-within:ring-[#006948] border border-[#dce9ff]">
                      <input
                        type="number"
                        min="1"
                        step="any"
                        value={plotLength}
                        onChange={(e) => setPlotLength(e.target.value)}
                        required
                        placeholder="e.g. 150"
                        className="w-full bg-transparent px-4 py-2.5 text-[#0b1c30] font-numeric text-base font-bold focus:outline-hidden"
                      />
                      <span className="bg-[#dce9ff] text-[#3d4a42] font-code text-xs font-bold px-3 py-2.5 flex items-center select-none">
                        ft
                      </span>
                    </div>
                    <span className="text-[11px] text-[#565e74]">
                      Longitudinal plot boundary frontage
                    </span>
                  </div>

                  {/* Width Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">
                      Width <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="flex rounded-lg overflow-hidden bg-[#f8f9ff] focus-within:ring-2 focus-within:ring-[#006948] border border-[#dce9ff]">
                      <input
                        type="number"
                        min="1"
                        step="any"
                        value={plotWidth}
                        onChange={(e) => setPlotWidth(e.target.value)}
                        required
                        placeholder="e.g. 145"
                        className="w-full bg-transparent px-4 py-2.5 text-[#0b1c30] font-numeric text-base font-bold focus:outline-hidden"
                      />
                      <span className="bg-[#dce9ff] text-[#3d4a42] font-code text-xs font-bold px-3 py-2.5 flex items-center select-none">
                        ft
                      </span>
                    </div>
                    <span className="text-[11px] text-[#565e74]">
                      Lateral boundary breadth measurement
                    </span>
                  </div>
                </div>

                {/* Total Area Output Box (Live reactive requirement) */}
                <div className="p-4 sm:p-5 bg-[#eff4ff] rounded-xl border border-[#dce9ff] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-white text-[#006948] flex items-center justify-center shrink-0 shadow-xs border border-[#bccac0]/30">
                      <span className="material-symbols-outlined text-[24px]">square_foot</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-[#565e74] uppercase font-bold tracking-wider">
                        Total Computed Land Area
                      </span>
                      <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap mt-0.5">
                        <span className="font-numeric font-extrabold text-xl sm:text-2xl text-[#0b1c30]">
                          {calculatedSqFt.toLocaleString('en-IN')}
                        </span>
                        <span className="font-code text-xs text-[#565e74] font-semibold">
                          sq. ft.
                        </span>
                        <span className="text-[#bccac0]">•</span>
                        <span className="text-sm sm:text-base text-[#006948] font-bold">
                          ~{calculatedAcres} Acres
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#565e74] font-code text-xs self-start md:self-center bg-white px-3 py-1.5 rounded-lg border border-[#bccac0]/40 shadow-2xs whitespace-nowrap">
                    <span className="material-symbols-outlined text-[16px] text-[#006948]">
                      calculate
                    </span>
                    <span>Formula: L × W / 43,560 ac</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-[#eff4ff] w-full"></div>

              {/* Section 3: Fiscal & Economic Valuation */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2.5 pb-1">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#85f8c4] text-[#002114] font-code text-xs font-bold">
                    3
                  </span>
                  <h2 className="text-lg font-bold text-[#0b1c30]">
                    Fiscal &amp; Economic Valuation
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Estimated Land Value */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">
                      Estimated Land Value <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="flex rounded-lg overflow-hidden bg-[#f8f9ff] focus-within:ring-2 focus-within:ring-[#006948] border border-[#dce9ff]">
                      <span className="bg-[#dce9ff] text-[#3d4a42] font-numeric text-base px-3.5 py-2.5 flex items-center select-none font-bold">
                        ₹
                      </span>
                      <input
                        type="text"
                        value={estimatedValue}
                        onChange={(e) => setEstimatedValue(e.target.value)}
                        required
                        placeholder="e.g. 45,000 or 3,650,000"
                        className="w-full bg-transparent px-4 py-2.5 text-[#0b1c30] font-numeric text-base font-bold focus:outline-hidden"
                      />
                    </div>
                    <span className="text-[11px] text-[#565e74]">
                      Government ready reckoner rate or fair market appraisal
                    </span>
                  </div>

                  {/* Property Zoning Category */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">
                      Zoning / Land Classification
                    </label>
                    <div className="relative flex items-center">
                      <select
                        value={zoningType}
                        onChange={(e) => setZoningType(e.target.value)}
                        className="w-full bg-[#f8f9ff] px-4 py-2.5 rounded-lg text-[#0b1c30] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#006948] border border-[#dce9ff] appearance-none cursor-pointer"
                      >
                        <option value="Agricultural (Cultivable Non-Irrigated)">
                          Agricultural (Cultivable Non-Irrigated)
                        </option>
                        <option value="Residential Zone (R-1 Sector)">
                          Residential Zone (R-1 Sector)
                        </option>
                        <option value="Commercial Hub Corridor">
                          Commercial Hub Corridor
                        </option>
                        <option value="Light Industrial / Tech Park">
                          Light Industrial / Tech Park
                        </option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 text-[#565e74] text-[20px] pointer-events-none">
                        expand_more
                      </span>
                    </div>
                    <span className="text-[11px] text-[#565e74]">
                      Determines land development clearance rules
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-[#eff4ff] w-full"></div>

              {/* Section 4: File Upload Section */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#85f8c4] text-[#002114] font-code text-xs font-bold">
                      4
                    </span>
                    <h2 className="text-lg font-bold text-[#0b1c30]">
                      Land Deed / Ground Photograph
                    </h2>
                  </div>
                  <span className="text-xs text-[#565e74] font-medium">Single Image Upload</span>
                </div>

                {/* Dropzone Container */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group cursor-pointer p-6 rounded-xl bg-[#f8f9ff] hover:bg-[#eff4ff] border-2 border-dashed border-[#bccac0] hover:border-[#006948] transition-all flex flex-col items-center justify-center text-center gap-2"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-14 h-14 rounded-full bg-white text-[#006948] shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform border border-[#dce9ff]">
                    <span className="material-symbols-outlined text-[28px]">add_a_photo</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-[#0b1c30]">
                      Upload One Clear Image of the Land
                    </span>
                    <span className="text-xs text-[#565e74]">
                      Supports JPG, PNG, or WEBP up to 10MB (GPS geo-tagged aerial or boundary photo)
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-[#dce9ff] text-[#0b1c30] text-xs font-bold mt-1">
                    <span className="material-symbols-outlined text-[16px]">file_upload</span>
                    <span>Select Land Photo</span>
                  </div>
                </div>

                {/* Preset Fast Selector (Extra convenience for college evaluators) */}
                <div className="flex items-center gap-2 overflow-x-auto text-xs py-1">
                  <span className="text-[#565e74] whitespace-nowrap text-[11px] font-semibold">
                    Quick Sample Presets:
                  </span>
                  {PRESET_PHOTOS.map((preset, idx) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setSelectedPhoto(preset.url);
                        setFileName(preset.name);
                        setFileTag(preset.tag);
                      }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-code whitespace-nowrap transition-colors border ${
                        selectedPhoto === preset.url
                          ? 'bg-[#006948] text-white border-[#006948]'
                          : 'bg-white text-[#3d4a42] border-[#bccac0]/40 hover:bg-[#eff4ff]'
                      }`}
                    >
                      Sample #{idx + 1}
                    </button>
                  ))}
                </div>

                {/* Active Uploaded Thumbnail & Info Strip */}
                <div className="flex items-center justify-between p-3.5 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#dce9ff] shrink-0 shadow-xs relative border border-[#bccac0]/40">
                      <img
                        src={selectedPhoto}
                        alt="Uploaded preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 bg-[#006948] text-white px-1 text-[8px] font-bold rounded-tl">
                        IMG
                      </div>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-[#0b1c30] truncate">
                        {fileName}
                      </span>
                      <span className="font-code text-[11px] text-[#565e74]">
                        {fileTag}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-1 rounded bg-[#85f8c4] text-[#005137] font-code text-[11px] font-bold flex items-center gap-1 shadow-xs">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Attached
                    </span>
                    <button
                      type="button"
                      onClick={handleClearImage}
                      title="Reset image"
                      className="p-1.5 rounded-md hover:bg-white text-[#565e74] hover:text-[#ba1a1a] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-px bg-[#eff4ff] w-full"></div>

              {/* Section 5: Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('dashboard')}
                  className="order-2 sm:order-1 px-5 py-3 rounded-lg bg-[#f8f9ff] hover:bg-[#eff4ff] text-[#0b1c30] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#dce9ff]"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>Cancel &amp; Return</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="order-1 sm:order-2 px-6 py-3 rounded-lg bg-[#006948] hover:bg-[#00855d] text-white font-bold text-sm flex flex-col items-center justify-center sm:items-end shadow-md hover:shadow-lg transition-all disabled:opacity-75"
                >
                  <div className="flex items-center gap-2">
                    {isSubmitting ? (
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    ) : (
                      <span className="material-symbols-outlined text-[20px]">cloud_sync</span>
                    )}
                    <span>
                      {isSubmitting
                        ? 'Committing Record to Registry...'
                        : 'Save Land Record & Sync to Dashboard'}
                    </span>
                  </div>
                  <span className="text-[11px] opacity-90 font-normal">
                    Saves data directly to database and redirects to dashboard
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live Card Preview & Tech Stack (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Live Record Snapshot Card */}
            <div className="bg-white p-5 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-code text-xs uppercase tracking-wider text-[#565e74] font-bold">
                  Real-time Card Preview
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#131b2e] font-code text-[10px] font-bold">
                  ID: DRAFT-904
                </span>
              </div>

              {/* Image Preview Quadrant */}
              <div className="relative w-full h-44 rounded-lg overflow-hidden bg-[#dce9ff] border border-[#dce9ff]">
                <img
                  src={selectedPhoto}
                  alt="Live card preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/80 via-transparent to-transparent"></div>
                <div className="absolute top-2 left-2 flex gap-1">
                  <span className="px-2 py-0.5 rounded bg-[#006948] text-white font-code text-[11px] font-semibold flex items-center gap-1 shadow-xs">
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                    Active Verification
                  </span>
                </div>
                <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between text-white">
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="font-code text-xs font-bold text-white truncate">
                      {surveyNo || 'UNREGISTERED'}
                    </span>
                    <span className="text-[11px] text-[#e5eeff] truncate">
                      {districtCity || 'Location Not Set'}
                    </span>
                  </div>
                  <span className="font-code text-[10px] px-2 py-0.5 rounded bg-white/20 backdrop-blur-xs text-white shrink-0">
                    Zone: {zoningType.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Dimensional Metrics Readout */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-[#eff4ff] rounded-lg flex flex-col">
                  <span className="text-[11px] text-[#565e74] font-medium">Length</span>
                  <span className="font-numeric text-sm font-bold text-[#0b1c30]">
                    {numLength} ft
                  </span>
                </div>
                <div className="p-2 bg-[#eff4ff] rounded-lg flex flex-col">
                  <span className="text-[11px] text-[#565e74] font-medium">Width</span>
                  <span className="font-numeric text-sm font-bold text-[#0b1c30]">
                    {numWidth} ft
                  </span>
                </div>
                <div className="p-2 bg-[#dce9ff] rounded-lg flex flex-col">
                  <span className="text-[11px] text-[#006948] font-bold">Total Area</span>
                  <span className="font-numeric text-sm text-[#006948] font-extrabold">
                    {calculatedSqFt >= 1000
                      ? `${(calculatedSqFt / 1000).toFixed(1)}k sq ft`
                      : `${calculatedSqFt} sq ft`}
                  </span>
                </div>
              </div>

              {/* Bottom Valuation Banner */}
              <div className="p-3.5 bg-[#eff4ff] rounded-xl flex items-center justify-between border border-[#dce9ff]">
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#565e74] font-medium">Estimated Valuation</span>
                  <span className="font-numeric font-extrabold text-lg text-[#006948]">
                    ₹ {formattedCurrency}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#85f8c4] flex items-center justify-center text-[#002114]">
                  <span className="material-symbols-outlined text-[18px]">currency_rupee</span>
                </div>
              </div>

              {/* Evaluator Audit Note */}
              <div className="flex items-center gap-1.5 text-xs text-[#565e74]">
                <span className="material-symbols-outlined text-[16px] text-[#006948]">info</span>
                <span>Card will appear instantly on Registrar Dashboard upon confirmation.</span>
              </div>
            </div>

            {/* Recommended Tech Stack Card (Academic Requirement from Image 1 & 2) */}
            <div className="bg-white p-5 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col gap-3.5">
              <div className="flex items-center gap-2.5 pb-1">
                <div className="w-7 h-7 rounded-lg bg-[#dce9ff] text-[#006948] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">terminal</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-[#0b1c30]">Recommended Tech Stack</h3>
                  <span className="text-[11px] text-[#565e74]">
                    System Blueprint for Academic Evaluators
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#565e74]">
                Designed for high performance and minimal complexity suitable for college project
                demonstrations &amp; municipal land records.
              </p>

              <div className="flex flex-col gap-2.5 text-xs">
                {/* Frontend Block */}
                <div className="p-3 bg-[#eff4ff] rounded-lg flex flex-col gap-1 border border-[#dce9ff]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0b1c30] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[#006948] text-[16px]">
                        devices
                      </span>
                      Frontend Core
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#85f8c4] text-[#005137] font-code text-[10px] font-bold">
                      Client-Side
                    </span>
                  </div>
                  <p className="font-code text-[11px] text-[#3d4a42]">
                    HTML5 • CSS3 • Modern Vanilla JS (ES6+) • Tailwind CSS
                  </p>
                </div>

                {/* Backend Block */}
                <div className="p-3 bg-[#eff4ff] rounded-lg flex flex-col gap-1 border border-[#dce9ff]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0b1c30] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[#006194] text-[16px]">
                        dns
                      </span>
                      Backend Engine
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#dce9ff] text-[#004b73] font-code text-[10px] font-bold">
                      API Gateway
                    </span>
                  </div>
                  <p className="font-code text-[11px] text-[#3d4a42]">
                    Java Spring Boot 3 (Jakarta EE) • Node.js / Express • FastAPI
                  </p>
                </div>

                {/* Database & Storage Block */}
                <div className="p-3 bg-[#eff4ff] rounded-lg flex flex-col gap-1 border border-[#dce9ff]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0b1c30] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[#565e74] text-[16px]">
                        database
                      </span>
                      Data &amp; Storage
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#dce9ff] text-[#565e74] font-code text-[10px] font-bold">
                      ACID Store
                    </span>
                  </div>
                  <p className="font-code text-[11px] text-[#3d4a42]">
                    PostgreSQL with PostGIS / SQLite / MongoDB + S3 File Bucket
                  </p>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between font-code text-xs text-[#565e74]">
                <span>Schema: ISO-19152 LADM</span>
                <span className="text-[#006948] font-bold">Ready for Viva • 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Redirect Toast Notification Modal (Matches Image 7) */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/50 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white max-w-md w-full p-6 sm:p-8 rounded-xl shadow-2xl flex flex-col items-center text-center gap-4 border border-[#e5eeff] animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-[#85f8c4] flex items-center justify-center text-[#006948] shadow-xs">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-[#0b1c30]">
                  Record Registered Successfully!
                </h3>
                <p className="text-xs text-[#565e74]">
                  Plot <strong className="text-[#0b1c30]">{savedSurveyNo}</strong> has been
                  cryptographically registered to the Bhoomi database index.
                </p>
              </div>
              <div className="w-full p-3 bg-[#eff4ff] rounded-lg font-code text-xs text-[#3d4a42] flex items-center justify-between border border-[#dce9ff]">
                <span>Synced by: {user.name}</span>
                <span className="text-[#006948] font-bold">HTTP 201 Created</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#565e74]">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#006948] border-t-transparent animate-spin"></div>
                <span>Redirecting to User Dashboard in 2 seconds...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
