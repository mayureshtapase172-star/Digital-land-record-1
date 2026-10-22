import React, { useState } from 'react';
import { JAVA_PROJECT_FILES, JavaFile } from '../data/javaProjectFiles';

export const JavaProjectHub: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<JavaFile>(JAVA_PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);

  // Java Simulator state
  const [testSurveyNo, setTestSurveyNo] = useState('MH-PUN-2025/894B');
  const [testLength, setTestLength] = useState('150');
  const [testWidth, setTestWidth] = useState('145.2');
  const [testValue, setTestValue] = useState('3750000');
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[JVM-INIT] Java Virtual Machine (OpenJDK 64-Bit Server VM 17.0.9+9) ready.',
    '[SPRING] Initialized BhoomiApplication context on port 8080.',
    '[READY] Click "Execute Java JVM Simulation" to run CadastralAreaCalculator and API dispatch.'
  ]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingleFile = (file: JavaFile) => {
    const blob = new Blob([file.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadFullProjectBundle = () => {
    // Generate combined bundle with all Java files and instructions
    let fullBundle = `=========================================================================\n`;
    fullBundle += `BHOOMI DIGITAL LAND REGISTRY & CADASTRAL PORTAL - JAVA BACKEND PACKAGE\n`;
    fullBundle += `Academic Mini-Project Submission | Author: Mayuresh Tapase (Reg No: 172)\n`;
    fullBundle += `=========================================================================\n\n`;

    JAVA_PROJECT_FILES.forEach((f) => {
      fullBundle += `\n/* =========================================================================\n`;
      fullBundle += ` * FILE: ${f.filename} (${f.category})\n`;
      fullBundle += ` * PURPOSE: ${f.description}\n`;
      fullBundle += ` * ========================================================================= */\n\n`;
      fullBundle += f.code + `\n\n`;
    });

    const blob = new Blob([fullBundle], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bhoomi-Java-SpringBoot-Project-MayureshTapase-172.java`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const runSimulation = () => {
    setIsRunningSim(true);
    const len = parseFloat(testLength) || 0;
    const wid = parseFloat(testWidth) || 0;
    const sqFt = len * wid;
    const acres = (sqFt / 43560).toFixed(2);
    const sqM = (sqFt * 0.092903).toFixed(1);
    const randomHash = `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}941a`;

    setConsoleLogs([
      `[JVM-RUN] javac com/bhoomi/cadastre/util/CadastralAreaCalculator.java ... [OK]`,
      `[JVM-RUN] javac com/bhoomi/cadastre/controller/LandRecordController.java ... [OK]`,
      `[SPRING-REST] Incoming POST /api/v1/land/register`,
      `[JAVA-INPUT]  SurveyNo = "${testSurveyNo}", Length = ${len} ft, Width = ${wid} ft`,
      `[CALCULATOR]  computeSquareFeet(${len}, ${wid}) => ${sqFt.toLocaleString()} sq. ft.`,
      `[CALCULATOR]  computeAcres(${sqFt.toLocaleString()}) => ${acres} Acres`,
      `[CALCULATOR]  computeSquareMeters(${sqFt.toLocaleString()}) => ${sqM} sq. meters`,
      `[SECURITY]    MessageDigest.getInstance("SHA-256").digest(...) => ${randomHash}`,
      `[HIBERNATE]   INSERT INTO land_records (id, survey_number, acres, deed_hash) VALUES (...)`,
      `[SPRING-REST] Response: HTTP 201 CREATED { parcelId: "LND-MH-2026-0891", acres: ${acres}, verified: true }`,
      `[SUCCESS]     Java Business Logic and Verification Pipeline executed successfully!`
    ]);

    setTimeout(() => {
      setIsRunningSim(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-10 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dce9ff] text-[#006948] font-code text-xs shadow-xs mb-2">
            <span className="material-symbols-outlined text-[16px]">coffee</span>
            <span className="font-semibold">
              Java Backend &amp; Spring Boot Architecture
            </span>
            <span className="text-[#565e74]">•</span>
            <span>Java 17 / Jakarta EE / PostgreSQL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
            Java Cadastral Digitalization Engine
          </h1>
          <p className="text-sm text-[#565e74] max-w-2xl mt-1">
            Complete enterprise-grade Java project implementation for the Bhoomi Land Registry. Includes REST controllers, JPA entities, mathematical acreage conversion algorithms, and cryptographic SHA-256 deed sealers.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleDownloadFullProjectBundle}
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#006948] hover:bg-[#00855d] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download Full Java Code (.java)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Code Explorer & Live Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: File Explorer & Code Viewer (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#e5eeff] shadow-xs overflow-hidden flex flex-col">
          {/* File Explorer Tab Bar */}
          <div className="bg-[#eff4ff] border-b border-[#dce9ff] p-2 flex items-center gap-1 overflow-x-auto">
            {JAVA_PROJECT_FILES.map((file) => (
              <button
                key={file.id}
                onClick={() => setSelectedFile(file)}
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-code font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  selectedFile.id === file.id
                    ? 'bg-white text-[#006948] shadow-xs border border-[#bccac0]/40'
                    : 'text-[#565e74] hover:text-[#0b1c30] hover:bg-white/60'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-[#006948]">
                  {file.category === 'Build' ? 'build' : file.category === 'Config' ? 'settings' : 'code'}
                </span>
                <span>{file.filename}</span>
              </button>
            ))}
          </div>

          {/* Active File Metadata Header */}
          <div className="px-4 sm:px-5 py-3 bg-[#f8f9ff] border-b border-[#e5eeff] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#85f8c4] text-[#005137] font-code text-[10px] font-bold shrink-0">
                  {selectedFile.category}
                </span>
                <span className="font-code font-bold text-sm text-[#0b1c30]">
                  {selectedFile.filename}
                </span>
              </div>
              <span className="text-[#565e74] text-[11px] leading-snug">
                {selectedFile.description}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                type="button"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-white hover:bg-[#eff4ff] text-[#0b1c30] border border-[#bccac0] text-[11px] font-semibold transition-colors"
                title="Copy Java Source Code"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
              <button
                onClick={() => handleDownloadSingleFile(selectedFile)}
                type="button"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-white hover:bg-[#eff4ff] text-[#006948] border border-[#bccac0] text-[11px] font-semibold transition-colors"
                title="Download this Java file"
              >
                <span className="material-symbols-outlined text-[14px]">file_download</span>
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Syntax Highlighted Code Viewer */}
          <div className="p-4 bg-[#0b1c30] text-[#e5eeff] font-code text-xs overflow-x-auto max-h-[520px]">
            <pre className="leading-relaxed">
              <code>{selectedFile.code}</code>
            </pre>
          </div>
        </div>

        {/* Right Column: In-Browser Java JVM Simulator & Viva Guide (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* JVM Execution Simulator Card */}
          <div className="bg-white p-5 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#eff4ff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006948] text-[20px]">play_circle</span>
                <h3 className="text-sm font-bold text-[#0b1c30]">
                  Java JVM Algorithm Simulator
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#85f8c4] text-[#005137] font-code text-[10px] font-bold">
                Online Runner
              </span>
            </div>

            <p className="text-xs text-[#565e74]">
              Simulate the execution of <code>CadastralAreaCalculator.java</code> and Spring Boot REST API dispatch in real-time:
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-[#0b1c30] mb-1">
                  Survey Plot Number
                </label>
                <input
                  type="text"
                  value={testSurveyNo}
                  onChange={(e) => setTestSurveyNo(e.target.value)}
                  className="w-full bg-[#f8f9ff] px-3 py-2 rounded-lg border border-[#dce9ff] font-code text-xs text-[#0b1c30]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#0b1c30] mb-1">
                    Length (ft)
                  </label>
                  <input
                    type="number"
                    value={testLength}
                    onChange={(e) => setTestLength(e.target.value)}
                    className="w-full bg-[#f8f9ff] px-3 py-2 rounded-lg border border-[#dce9ff] font-code text-xs text-[#0b1c30]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#0b1c30] mb-1">
                    Width (ft)
                  </label>
                  <input
                    type="number"
                    value={testWidth}
                    onChange={(e) => setTestWidth(e.target.value)}
                    className="w-full bg-[#f8f9ff] px-3 py-2 rounded-lg border border-[#dce9ff] font-code text-xs text-[#0b1c30]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#0b1c30] mb-1">
                  Estimated Valuation (INR)
                </label>
                <input
                  type="number"
                  value={testValue}
                  onChange={(e) => setTestValue(e.target.value)}
                  className="w-full bg-[#f8f9ff] px-3 py-2 rounded-lg border border-[#dce9ff] font-code text-xs text-[#0b1c30]"
                />
              </div>

              <button
                onClick={runSimulation}
                disabled={isRunningSim}
                type="button"
                className="w-full py-2.5 px-4 bg-[#006948] hover:bg-[#00855d] text-white text-xs font-bold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-75"
              >
                {isRunningSim ? (
                  <>
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    <span>Executing Java JVM...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">terminal</span>
                    <span>Execute Java JVM Simulation</span>
                  </>
                )}
              </button>
            </div>

            {/* Simulated Terminal Output */}
            <div className="bg-[#0b1c30] p-3 rounded-lg border border-[#213145] font-code text-[11px] text-[#85f8c4] flex flex-col gap-1 max-h-48 overflow-y-auto">
              <div className="text-[#565e74] text-[10px] pb-1 border-b border-[#213145] flex items-center justify-between">
                <span>TERMINAL OUTPUT (STDOUT)</span>
                <span>STATUS: 200 OK</span>
              </div>
              {consoleLogs.map((log, index) => (
                <div key={index} className="leading-tight break-all">
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Academic Viva & Oral Examination Q&A Sheet */}
          <div className="bg-white p-5 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col gap-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#eff4ff]">
              <span className="material-symbols-outlined text-[#006194] text-[20px]">school</span>
              <h3 className="text-sm font-bold text-[#0b1c30]">
                Java Viva Questions &amp; Answers
              </h3>
            </div>

            <div className="space-y-3 text-xs text-[#3d4a42]">
              <div className="p-2.5 bg-[#eff4ff] rounded-lg">
                <p className="font-bold text-[#0b1c30]">
                  Q1: Why use Java Spring Boot for Cadastral Management?
                </p>
                <p className="text-[11px] mt-1 text-[#565e74]">
                  Spring Boot provides robust transaction management (ACID compliance via Spring Data JPA), enterprise security, and microservices readiness mandated by civic governance systems.
                </p>
              </div>

              <div className="p-2.5 bg-[#eff4ff] rounded-lg">
                <p className="font-bold text-[#0b1c30]">
                  Q2: How does the acreage conversion logic work in Java?
                </p>
                <p className="text-[11px] mt-1 text-[#565e74]">
                  <code>CadastralAreaCalculator.java</code> calculates <code>length * width</code> in square feet, divides by <code>43,560.0</code> (statutory sq. ft. per acre), and formats to two decimal places.
                </p>
              </div>

              <div className="p-2.5 bg-[#eff4ff] rounded-lg">
                <p className="font-bold text-[#0b1c30]">
                  Q3: How is deed tamper prevention achieved?
                </p>
                <p className="text-[11px] mt-1 text-[#565e74]">
                  Java&apos;s <code>java.security.MessageDigest</code> creates an irreversible SHA-256 hash using the survey number, owner credentials, and timestamp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
