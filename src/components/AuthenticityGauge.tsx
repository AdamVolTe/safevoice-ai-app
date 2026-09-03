import { useEffect, useState } from 'react';

interface AuthenticityGaugeProps {
  syntheticScore: number; // 0-100
  authenticScore: number;  // 0-100
  isAI: boolean;
}

export default function AuthenticityGauge({ syntheticScore, authenticScore, isAI }: AuthenticityGaugeProps) {
  const [animatedSynthetic, setAnimatedSynthetic] = useState(0);
  const [animatedAuthentic, setAnimatedAuthentic] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    let frame = 0;
    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedSynthetic(syntheticScore * eased);
      setAnimatedAuthentic(authenticScore * eased);
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [syntheticScore, authenticScore]);

  const radius = 72;
  const stroke = 14;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const semi = circumference / 2;
  const syntheticOffset = semi - (animatedSynthetic / 100) * semi;
  const authenticOffset = semi - (animatedAuthentic / 100) * semi;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-52 h-28">
        <svg width="208" height="112" viewBox="0 0 208 112" className="overflow-visible">
          {/* Track */}
          <circle
            cx="104"
            cy="104"
            r={normalizedRadius}
            fill="none"
            stroke="#1e293b"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${semi} ${circumference}`}
            transform="rotate(180 104 104)"
          />
          {/* Authentic arc (green) */}
          <circle
            cx="104"
            cy="104"
            r={normalizedRadius}
            fill="none"
            stroke="#22c55e"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${semi} ${circumference}`}
            strokeDashoffset={authenticOffset}
            transform="rotate(180 104 104)"
            style={{ transition: 'stroke 0.3s', filter: 'drop-shadow(0 0 6px #22c55e66)' }}
          />
          {/* Synthetic arc (red/cyan) */}
          <circle
            cx="104"
            cy="104"
            r={normalizedRadius}
            fill="none"
            stroke={isAI ? '#ef4444' : '#06b6d4'}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${semi} ${circumference}`}
            strokeDashoffset={syntheticOffset}
            transform="rotate(180 104 104)"
            style={{ filter: `drop-shadow(0 0 6px ${isAI ? '#ef444466' : '#06b6d466'})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <span
            className={`text-4xl font-bold tabular-nums tracking-tight ${isAI ? 'text-red-400' : 'text-emerald-400'}`}
          >
            {Math.round(animatedSynthetic)}%
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-0.5">
            Synthetic
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6 w-full justify-center">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Authentic</span>
            <span className="text-sm font-semibold text-emerald-400 tabular-nums">
              {Math.round(animatedAuthentic)}%
            </span>
          </div>
        </div>
        <div className="w-px h-8 bg-slate-700" />
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${isAI ? 'bg-red-500' : 'bg-cyan-400'}`} />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Synthetic AI</span>
            <span className={`text-sm font-semibold tabular-nums ${isAI ? 'text-red-400' : 'text-cyan-400'}`}>
              {Math.round(animatedSynthetic)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
