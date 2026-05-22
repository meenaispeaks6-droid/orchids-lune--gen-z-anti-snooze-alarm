import type { Alarm } from '@/src/types/app';

export function formatAlarmTime(alarm: Pick<Alarm, 'hour' | 'minute' | 'period'>) {
  return `${String(alarm.hour).padStart(2, '0')}:${String(alarm.minute).padStart(2, '0')} ${alarm.period}`;
}

export function formatShortTime(hour: number, minute: number) {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}
