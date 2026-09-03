import { useEffect, useRef } from 'react';

interface WaveformProps {
  active: boolean;
  color?: string;
  bars?: number;
}

export default function Waveform({ active, color = '#06b6d4', bars = 48 }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const phaseRef = useRef(0);
  const heightsRef = useRef<number[]>(new Array(bars).fill(0.1));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      ctx.clearRect(0, 0, w, h);
      phaseRef.current += 0.06;

      const barW = w / bars * 0.6;
      const gap = w / bars * 0.4;
      const mid = h / 2;

      for (let i = 0; i < bars; i++) {
        if (active) {
          const target =
            0.15 +
            0.85 * Math.abs(
              Math.sin(phaseRef.current + i * 0.35) *
              Math.cos(phaseRef.current * 0.7 + i * 0.18)
            );
          heightsRef.current[i] += (target - heightsRef.current[i]) * 0.18;
        } else {
          heightsRef.current[i] += (0.06 - heightsRef.current[i]) * 0.05;
        }

        const barH = heightsRef.current[i] * h * 0.9;
        const x = i * (barW + gap) + gap / 2;
        const y = mid - barH / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + barH);
        grad.addColorStop(0, color);
        grad.addColorStop(0.5, color);
        grad.addColorStop(1, color + '40');
        ctx.fillStyle = grad;

        const r = Math.min(barW / 2, 3);
        roundRect(ctx, x, y, barW, barH, r);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationRef.current);
  }, [active, color, bars]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
