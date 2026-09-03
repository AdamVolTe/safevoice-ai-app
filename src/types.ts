export type ScanState = 'idle' | 'scanning' | 'complete';

export interface SpectralMetric {
  label: string;
  value: number; // 0-100, higher = more synthetic
  description: string;
}

export interface ScanResult {
  fileName: string;
  fileSize: string;
  syntheticScore: number; // 0-100
  authenticScore: number; // 0-100
  isAI: boolean;
  confidence: number; // 0-100
  spectralMetrics: SpectralMetric[];
  detectedArtifacts: string[];
  scanDuration: string;
  timestamp: string;
}
