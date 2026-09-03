import { useState, useCallback, useRef } from 'react';
import { Loader2, ScanLine, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AudioScanner from '@/components/AudioScanner';
import AnalysisResults from '@/components/AnalysisResults';
import SafetyTips from '@/components/SafetyTips';
import ReportExport from '@/components/ReportExport';
import Footer from '@/components/Footer';
import { generateScanResult } from '@/utils/scanner';
import type { ScanState, ScanResult } from '@/types';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function App() {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  const scrollToScanner = useCallback(() => {
    scannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleFileSelected = useCallback((file: File) => {
    setFileName(file.name);
    setResult(null);
    setScanState('scanning');
    // Simulate scan processing
    const delay = 2500 + Math.random() * 1500;
    setTimeout(() => {
      const res = generateScanResult(file.name, formatBytes(file.size));
      setResult(res);
      setScanState('complete');
    }, delay);
  }, []);

  const handleCancel = useCallback(() => {
    setScanState('idle');
    setFileName(null);
    setResult(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-400/30">
      <Navbar />
      <main>
        <Hero onAnalyze={scrollToScanner} />

        {/* Scanner Station + Results */}
        <section ref={scannerRef} id="scanner" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 mb-4">
              <ScanLine className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-xs font-medium tracking-wide text-cyan-300 uppercase">
                Audio Scanner Station
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Upload & Analyze Any Voice Recording
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl mx-auto">
              Our AI engine inspects spectral patterns, pitch consistency, and voice artifacts to
              detect synthetic deepfake audio.
            </p>
          </div>

          <AudioScanner
            scanState={scanState}
            fileName={fileName}
            onFileSelected={handleFileSelected}
            onCancel={handleCancel}
          />
        </section>

        {/* Results */}
        <section id="results" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 scroll-mt-20">
          {scanState === 'scanning' && (
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-12 flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-30 animate-pulse" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-slate-900">
                  <Loader2 className="h-7 w-7 text-cyan-400 animate-spin" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-base font-semibold text-white">Deep Neural Analysis Running</p>
                <p className="text-sm text-slate-400 mt-1">
                  Extracting mel-cepstral features and comparing against voice synthesis models…
                </p>
              </div>
              <div className="w-full max-w-sm mt-2">
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 scanning-bar" />
                </div>
              </div>
            </div>
          )}

          {scanState === 'complete' && result && (
            <div className="space-y-6 animate-in">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Scan complete — full analysis below</span>
              </div>
              <AnalysisResults result={result} />
              <ReportExport result={result} />
            </div>
          )}

          {scanState === 'idle' && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-12 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50">
                <ScanLine className="h-6 w-6 text-slate-500" />
              </div>
              <p className="text-sm text-slate-500">
                Upload an audio file above to see the full analysis report.
              </p>
            </div>
          )}
        </section>

        <SafetyTips />
      </main>
      <Footer />
    </div>
  );
}
