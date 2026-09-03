import type { ScanResult, SpectralMetric } from '@/types';

const ARTIFACTS_AI = [
  'Unnatural phase transitions in consonant clusters',
  'Over-smoothed spectral envelope above 4kHz',
  'Mel-cepstral discontinuities at word boundaries',
  'Absent micro-breaths between phrases',
  'Robotic pitch quantization detected',
  'Inconsistent formant spacing across vowels',
];

const ARTIFACTS_REAL = [
  'Natural breath patterns detected',
  'Organic micro-tremor in sustained vowels',
  'Consistent room ambience throughout',
  'Human-like pitch drift and hesitation',
];

function pick<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function generateSpectralMetrics(isAI: boolean): SpectralMetric[] {
  const base = isAI
    ? [
        { label: 'Pitch Consistency', description: 'Variation in fundamental frequency' },
        { label: 'Voice Artifact Density', description: 'Synthetic markers in spectrogram' },
        { label: 'Spectral Envelope', description: 'Harmonic structure smoothness' },
        { label: 'Temporal Coherence', description: 'Frame-to-frame naturalness' },
      ]
    : [
        { label: 'Pitch Consistency', description: 'Variation in fundamental frequency' },
        { label: 'Voice Artifact Density', description: 'Synthetic markers in spectrogram' },
        { label: 'Spectral Envelope', description: 'Harmonic structure smoothness' },
        { label: 'Temporal Coherence', description: 'Frame-to-frame naturalness' },
      ];

  return base.map((m) => {
    const center = isAI ? 72 : 18;
    const value = Math.max(2, Math.min(98, Math.round(center + (Math.random() * 30 - 15))));
    return { ...m, value };
  });
}

export function generateScanResult(fileName: string, fileSize: string): ScanResult {
  // Deterministic-ish split: ~55% AI, ~45% real for demo variety
  const isAI = Math.random() > 0.45;
  const syntheticScore = isAI
    ? Math.floor(Math.random() * 18) + 78 // 78-95
    : Math.floor(Math.random() * 14) + 2;  // 2-15
  const authenticScore = 100 - syntheticScore;

  const duration = (Math.random() * 2.4 + 0.6).toFixed(2);

  return {
    fileName,
    fileSize,
    syntheticScore,
    authenticScore,
    isAI,
    confidence: Math.max(syntheticScore, authenticScore),
    spectralMetrics: generateSpectralMetrics(isAI),
    detectedArtifacts: pick(isAI ? ARTIFACTS_AI : ARTIFACTS_REAL, isAI ? 4 : 4),
    scanDuration: `${duration}s`,
    timestamp: new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  };
}

export function generateReport(result: ScanResult): string {
  const lines: string[] = [];
  lines.push('═══════════════════════════════════════════════');
  lines.push('       SAFEVOICE AI — VERIFICATION REPORT       ');
  lines.push('═══════════════════════════════════════════════');
  lines.push('');
  lines.push(`Report Generated : ${result.timestamp}`);
  lines.push(`File Analyzed    : ${result.fileName}`);
  lines.push(`File Size        : ${result.fileSize}`);
  lines.push(`Scan Duration    : ${result.scanDuration}`);
  lines.push('');
  lines.push('─── AUTHENTICITY ASSESSMENT ───');
  lines.push('');
  lines.push(`  Verdict        : ${result.isAI ? '⚠ AI-GENERATED (HIGH RISK)' : '✓ AUTHENTIC HUMAN VOICE'}`);
  lines.push(`  Confidence     : ${result.confidence}%`);
  lines.push(`  Synthetic      : ${result.syntheticScore}%`);
  lines.push(`  Authentic      : ${result.authenticScore}%`);
  lines.push('');
  lines.push('─── SPECTRAL BREAKDOWN ───');
  lines.push('');
  result.spectralMetrics.forEach((m) => {
    const bar = '█'.repeat(Math.round(m.value / 5)).padEnd(20, '░');
    lines.push(`  ${m.label.padEnd(24)} ${bar} ${m.value}%`);
    lines.push(`  ${' '.repeat(24)} ${m.description}`);
    lines.push('');
  });
  lines.push('─── DETECTED ARTIFACTS ───');
  lines.push('');
  result.detectedArtifacts.forEach((a) => {
    lines.push(`  • ${a}`);
  });
  lines.push('');
  lines.push('─── RECOMMENDATION ───');
  lines.push('');
  if (result.isAI) {
    lines.push('  This audio is very likely AI-generated. Do NOT act on any');
    lines.push('  financial or personal requests in this message. Contact');
    lines.push('  the alleged sender through a known, trusted channel.');
  } else {
    lines.push('  This audio shows natural human voice characteristics.');
    lines.push('  Standard caution still applies for any money request.');
  }
  lines.push('');
  lines.push('═══════════════════════════════════════════════');
  lines.push('  SafeVoice AI — Deepfake Scam Shield            ');
  lines.push('  This report is a simulated analysis for demo    ');
  lines.push('  purposes and should not replace professional   ');
  lines.push('  forensic verification.                          ');
  lines.push('═══════════════════════════════════════════════');
  return lines.join('\n');
}

export function downloadReport(result: ScanResult): void {
  const report = generateReport(result);
  const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SafeVoice_Report_${result.fileName.replace(/\.[^.]+$/, '')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
