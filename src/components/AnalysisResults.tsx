import {
  AlertTriangle,
  ShieldCheck,
  FileAudio,
  Clock,
  Gauge,
  Activity,
  ScanLine,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import AuthenticityGauge from './AuthenticityGauge';
import type { ScanResult } from '@/types';

interface AnalysisResultsProps {
  result: ScanResult;
}

export default function AnalysisResults({ result }: AnalysisResultsProps) {
  return (
    <div className="space-y-5">
      {/* Header with verdict badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
            result.isAI
              ? 'border-red-500/30 bg-red-500/10'
              : 'border-emerald-500/30 bg-emerald-500/10'
          }`}>
            {result.isAI ? (
              <AlertTriangle className="h-5 w-5 text-red-400" />
            ) : (
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            )}
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Analysis Verdict</h3>
            <p className="text-xs text-slate-500">{result.timestamp}</p>
          </div>
        </div>

        {/* Risk badge */}
        <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
          result.isAI
            ? 'bg-red-500/15 border border-red-500/30 text-red-300'
            : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
        }`}>
          {result.isAI ? (
            <>
              <AlertTriangle className="h-4 w-4" />
              HIGH RISK — AI Generated
            </>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              SAFE — Authentic Voice
            </>
          )}
        </div>
      </div>

      {/* Gauge + file info */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-6 flex flex-col items-center justify-center">
          <AuthenticityGauge
            syntheticScore={result.syntheticScore}
            authenticScore={result.authenticScore}
            isAI={result.isAI}
          />
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-6 space-y-4">
          <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">File Details</h4>
          <div className="space-y-3">
            <InfoRow icon={<FileAudio className="h-4 w-4 text-cyan-400" />} label="File name" value={result.fileName} />
            <InfoRow icon={<Activity className="h-4 w-4 text-cyan-400" />} label="File size" value={result.fileSize} />
            <InfoRow icon={<Clock className="h-4 w-4 text-cyan-400" />} label="Scan duration" value={result.scanDuration} />
            <InfoRow
              icon={<Gauge className="h-4 w-4 text-cyan-400" />}
              label="Confidence"
              value={`${result.confidence}%`}
            />
          </div>
        </div>
      </div>

      {/* Spectral breakdown */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-6">
        <div className="flex items-center gap-2 mb-5">
          <ScanLine className="h-4 w-4 text-cyan-400" />
          <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Spectral Breakdown</h4>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {result.spectralMetrics.map((m) => (
            <div key={m.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">{m.label}</span>
                <span className={`text-sm font-semibold tabular-nums ${
                  m.value > 50 ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  {m.value}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    m.value > 50
                      ? 'bg-gradient-to-r from-red-500 to-red-400'
                      : 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                  }`}
                  style={{ width: `${m.value}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">{m.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detected artifacts */}
      <div className={`rounded-xl border p-6 ${
        result.isAI
          ? 'border-red-500/20 bg-red-500/5'
          : 'border-emerald-500/20 bg-emerald-500/5'
      }`}>
        <div className="flex items-center gap-2 mb-4">
          {result.isAI ? (
            <XCircle className="h-4 w-4 text-red-400" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          )}
          <h4 className={`text-sm font-semibold uppercase tracking-wider ${
            result.isAI ? 'text-red-300' : 'text-emerald-300'
          }`}>
            {result.isAI ? 'Detected AI Artifacts' : 'Natural Voice Markers'}
          </h4>
        </div>
        <ul className="space-y-2.5">
          {result.detectedArtifacts.map((a, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
              <span className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${
                result.isAI ? 'bg-red-400' : 'bg-emerald-400'
              }`} />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0">
        {icon}
        <span className="text-sm text-slate-400">{label}</span>
      </div>
      <span className="text-sm font-medium text-white truncate text-right">{value}</span>
    </div>
  );
}
