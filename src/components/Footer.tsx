import { Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600">
              <Shield className="h-4 w-4 text-slate-950" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold text-white">SafeVoice AI</span>
              <span className="text-[10px] text-slate-500">Deepfake Scam Shield</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 text-center max-w-md">
            This is a demonstration tool with simulated analysis. Always verify suspicious contacts
            through trusted channels and report scams to local authorities.
          </p>

          <p className="text-xs text-slate-600 flex items-center gap-1.5">
            Built with <Heart className="h-3 w-3 text-red-500/60" /> for family safety
          </p>
        </div>
      </div>
    </footer>
  );
}
