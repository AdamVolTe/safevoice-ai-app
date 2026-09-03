import { Download, Bell, Share2, FileText } from 'lucide-react';
import type { ScanResult } from '@/types';
import { downloadReport } from '@/utils/scanner';

interface ReportExportProps {
  result: ScanResult;
}

export default function ReportExport({ result }: ReportExportProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
            <FileText className="h-6 w-6 text-cyan-400" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Export & Alert Options</h3>
            <p className="text-sm text-slate-400 mt-1">
              Download a detailed verification report or alert your family about this scan.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => downloadReport(result)}
            className="group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            Download Report
          </button>

          <button className="inline-flex items-center gap-2.5 rounded-xl border border-amber-400/20 bg-amber-400/10 px-5 py-3 text-sm font-medium text-amber-300 transition-all hover:bg-amber-400/20">
            <Bell className="h-4 w-4" />
            Alert Family
          </button>

          <button className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-300 transition-all hover:bg-white/10">
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
