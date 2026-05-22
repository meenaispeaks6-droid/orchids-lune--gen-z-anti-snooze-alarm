import type { ChartPoint, InsightMetric } from '@/src/types/app';

export const insightMetrics: InsightMetric[] = [
  { label: 'Avg sleep', value: '7h 24m', helper: '+32m vs last week' },
  { label: 'Avg wake', value: '6:42', helper: '12 min earlier' },
  { label: 'Missed alarms', value: '1', helper: 'Best week yet' },
  { label: 'Total streak', value: '12d', helper: 'Keep it soft' },
];

export const consistencyPoints: ChartPoint[] = [
  { label: 'M', value: 74 },
  { label: 'T', value: 86 },
  { label: 'W', value: 68 },
  { label: 'T', value: 92 },
  { label: 'F', value: 80 },
  { label: 'S', value: 58 },
  { label: 'S', value: 70 },
];

export const sleepTrendPoints: ChartPoint[] = [
  { label: '10p', value: 64 },
  { label: '11p', value: 82 },
  { label: '12a', value: 56 },
  { label: '6a', value: 78 },
  { label: '7a', value: 88 },
];
