import { Shield, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 blur-md opacity-40" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600">
                <Shield className="h-5 w-5 text-slate-950" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight text-white">SafeVoice AI</span>
              <span className="text-[10px] text-cyan-400/70 tracking-widest uppercase">Deepfake Shield</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#scanner" className="hover:text-cyan-400 transition-colors">Scanner</a>
            <a href="#results" className="hover:text-cyan-400 transition-colors">Analysis</a>
            <a href="#safety" className="hover:text-cyan-400 transition-colors">Family Safety</a>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-300 hidden sm:inline">System Active</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
