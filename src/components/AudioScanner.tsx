import { useCallback, useRef, useState, useEffect } from 'react';
import { UploadCloud, FileAudio, Loader2, X } from 'lucide-react';
import Waveform from './Waveform';
import type { ScanState } from '@/types';

interface AudioScannerProps {
  scanState: ScanState;
  fileName: string | null;
  onFileSelected: (file: File) => void;
  onCancel: () => void;
}

const ACCEPTED = ['.mp3', '.wav', '.m4a'];
const ACCEPTED_MIME = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/mp4', 'audio/x-m4a'];

export default function AudioScanner({ scanState, fileName, onFileSelected, onCancel }: AudioScannerProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const isScanning = scanState === 'scanning';

  const validate = (file: File): boolean => {
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    const validExt = ACCEPTED.includes(ext);
    const validMime = ACCEPTED_MIME.includes(file.type) || file.type === '';
    if (!validExt && !validMime) {
      setError('Unsupported format. Please upload MP3, WAV, or M4A.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      if (scanState !== 'idle') return;
      const file = e.dataTransfer.files?.[0];
      if (file && validate(file)) onFileSelected(file);
    },
    [scanState, onFileSelected],
  );

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validate(file)) onFileSelected(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (scanState === 'idle') setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${
        dragging
          ? 'border-cyan-400 bg-cyan-400/5 scale-[1.01]'
          : scanState !== 'idle'
          ? 'border-cyan-500/30 bg-slate-900/60'
          : 'border-slate-700 bg-slate-900/40 hover:border-slate-600'
      }`}
    >
      {/* Scanner grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(',')}
        onChange={handleSelect}
        className="hidden"
      />

      {scanState === 'idle' ? (
        <button
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-4 px-6 py-16 sm:py-20 text-center"
        >
          <div className="relative">
            <div className={`absolute inset-0 bg-cyan-400 blur-xl transition-opacity ${dragging ? 'opacity-40' : 'opacity-20'}`} />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-400/30">
              <UploadCloud className="h-8 w-8 text-cyan-400" strokeWidth={1.5} />
            </div>
          </div>
          <div className="space-y-1.5">
            <p className="text-lg font-semibold text-white">
              {dragging ? 'Drop audio file to analyze' : 'Drag & drop audio file here'}
            </p>
            <p className="text-sm text-slate-500">
              or <span className="text-cyan-400 underline">browse files</span> — supports MP3, WAV, M4A
            </p>
          </div>
          {error && (
            <p className="mt-2 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2 text-sm text-red-400">
              {error}
            </p>
          )}
        </button>
      ) : (
        <div className="p-6 sm:p-8 space-y-6">
          {/* File info header */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                isScanning
                  ? 'border-cyan-400/30 bg-cyan-400/10 animate-pulse'
                  : 'border-emerald-400/30 bg-emerald-400/10'
              }`}>
                <FileAudio className={`h-5 w-5 ${isScanning ? 'text-cyan-400' : 'text-emerald-400'}`} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{fileName}</p>
                <p className="text-xs text-slate-500">
                  {isScanning ? 'Analyzing audio patterns…' : 'Scan complete'}
                </p>
              </div>
            </div>

            {isScanning ? (
              <div className="flex items-center gap-2 text-xs text-cyan-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline tabular-nums">Processing</span>
              </div>
            ) : (
              <button
                onClick={onCancel}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
            )}
          </div>

          {/* Waveform visualization */}
          <div className="relative h-28 rounded-xl bg-slate-950/60 border border-slate-800 overflow-hidden">
            <Waveform active={isScanning} color={isScanning ? '#06b6d4' : '#22c55e'} bars={56} />
            {isScanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            {/* Scanning line */}
            {isScanning && (
              <div className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent scan-line" />
            )}
          </div>

          {isScanning && (
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Spectral analysis in progress</span>
              <span className="tabular-nums">Extracting voice features…</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
