import { PhoneCall, BadgeCheck, MessageSquareWarning, ListChecks } from 'lucide-react';

const TIPS = [
  {
    icon: PhoneCall,
    title: 'Hang Up and Call Back',
    body: 'If you receive a distressed call from a family member asking for money, hang up and call them back on a number you already have saved. Scammers use AI voices to create urgency.',
    accent: 'cyan',
  },
  {
    icon: BadgeCheck,
    title: 'Ask a Personal Question',
    body: 'Verify identity with a question only your real family member would know — a pet\'s name, a shared memory, or an inside joke. AI clones can\'t fake lived experience.',
    accent: 'emerald',
  },
  {
    icon: MessageSquareWarning,
    title: 'Never Rush to Send Money',
    body: 'Scammers create false emergencies that demand immediate action. Take a breath, verify through another channel, and never wire money or buy gift cards under pressure.',
    accent: 'red',
  },
];

const accentMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  cyan: {
    border: 'border-cyan-400/20',
    bg: 'bg-cyan-400/10',
    text: 'text-cyan-400',
    glow: 'group-hover:shadow-cyan-500/20',
  },
  emerald: {
    border: 'border-emerald-400/20',
    bg: 'bg-emerald-400/10',
    text: 'text-emerald-400',
    glow: 'group-hover:shadow-emerald-500/20',
  },
  red: {
    border: 'border-red-400/20',
    bg: 'bg-red-400/10',
    text: 'text-red-400',
    glow: 'group-hover:shadow-red-500/20',
  },
};

export default function SafetyTips() {
  return (
    <section id="safety" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1.5 mb-4">
          <ListChecks className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-xs font-medium tracking-wide text-amber-300 uppercase">
            Family Safety Protocol
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          3 Rules if You Receive a Suspicious Audio Message
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-slate-400">
          AI voice cloning takes just seconds of sample audio. Follow these steps before acting on
          any emergency request for money.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {TIPS.map((tip, i) => {
          const a = accentMap[tip.accent];
          const Icon = tip.icon;
          return (
            <div
              key={i}
              className={`group relative rounded-2xl border ${a.border} bg-slate-900/40 p-7 transition-all duration-300 hover:bg-slate-900/70 hover:-translate-y-1 hover:shadow-xl ${a.glow}`}
            >
              <div className="absolute top-5 right-6 text-6xl font-bold text-slate-800/40 tabular-nums select-none">
                {i + 1}
              </div>
              <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl border ${a.border} ${a.bg} mb-5`}>
                <Icon className={`h-6 w-6 ${a.text}`} strokeWidth={1.5} />
              </div>
              <h3 className="relative text-lg font-semibold text-white mb-2.5">{tip.title}</h3>
              <p className="relative text-sm text-slate-400 leading-relaxed">{tip.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
