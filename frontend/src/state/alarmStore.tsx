import AsyncStorage from '@react-native-async-storage/async-storage';
import { sortRepeatDays } from '@/src/utils/formatDate';
import type { Alarm, AlarmChallengeType, AlarmSound, WakeMode } from '@/src/types/app';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type AlarmDraft = {
  id?: string;
  hour: number;
  minute: number;
  period: 'AM' | 'PM';
  label: string;
  enabled: boolean;
  repeatDays: string[];
  wakeMode: WakeMode;
  challengeType: AlarmChallengeType;
  sound: AlarmSound;
  vibration: boolean;
  snooze: boolean;
};

type MathQuestion = {
  prompt: string;
  answer: number;
};

type MemeQuestion = {
  prompt: string;
  options: string[];
  answer: string;
};

type TriggeredAlarm = {
  alarm: Alarm;
  mathQuestion: MathQuestion;
  memeQuestion: MemeQuestion;
  triggeredAt: number;
};

type AlarmStore = {
  alarms: Alarm[];
  sortedAlarms: Alarm[];
  nextAlarm?: Alarm;
  triggeredAlarm?: TriggeredAlarm;
  getAlarm: (id: string) => Alarm | undefined;
  saveAlarm: (draft: AlarmDraft) => Alarm;
  toggleAlarm: (id: string, enabled: boolean) => void;
  deleteAlarm: (id: string) => void;
  dismissTriggeredAlarm: () => void;
  snoozeTriggeredAlarm: () => void;
  previewChallenge: (alarm?: Alarm | AlarmDraft) => void;
};

const STORAGE_KEY = 'lune.alarms.v1';

const defaultAlarms: Alarm[] = [
  {
    id: 'morning-reset',
    hour: 7,
    minute: 30,
    period: 'AM',
    label: 'Morning reset',
    enabled: true,
    repeatDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    wakeMode: 'Focus',
    challengeType: 'Math',
    sound: 'Warm chime',
    vibration: true,
    snooze: true,
  },
  {
    id: 'gym-start',
    hour: 6,
    minute: 45,
    period: 'AM',
    label: 'Gym start',
    enabled: true,
    repeatDays: ['Mon', 'Wed', 'Fri'],
    wakeMode: 'Gym',
    challengeType: 'Random',
    sound: 'Soft sunrise',
    vibration: true,
    snooze: false,
  },
];

const AlarmContext = createContext<AlarmStore | undefined>(undefined);

async function readStoredAlarms() {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultAlarms;
  const parsed = JSON.parse(raw) as Alarm[];
  const source = Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultAlarms;
  return source.map((alarm) => ({ ...alarm, repeatDays: sortRepeatDays(alarm.repeatDays ?? []) }));
}

export function to24Hour(hour: number, period: 'AM' | 'PM') {
  if (period === 'AM') return hour === 12 ? 0 : hour;
  return hour === 12 ? 12 : hour + 12;
}

export function getAlarmDate(alarm: Pick<Alarm, 'hour' | 'minute' | 'period'>, from = new Date()) {
  const next = new Date(from);
  next.setSeconds(0, 0);
  next.setHours(to24Hour(alarm.hour, alarm.period), alarm.minute, 0, 0);
  if (next.getTime() <= from.getTime()) next.setDate(next.getDate() + 1);
  return next;
}

export function getMsUntilAlarm(alarm: Pick<Alarm, 'hour' | 'minute' | 'period'>, from = new Date()) {
  return getAlarmDate(alarm, from).getTime() - from.getTime();
}

export function formatCountdown(ms: number) {
  const safeMs = Math.max(0, ms);
  const totalMinutes = Math.ceil(safeMs / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function formatAlarmClock(alarm: Pick<Alarm, 'hour' | 'minute' | 'period'>) {
  return `${String(alarm.hour).padStart(2, '0')}:${String(alarm.minute).padStart(2, '0')} ${alarm.period}`;
}

export function sortByUpcoming(alarms: Alarm[], from = new Date()) {
  return [...alarms].sort((a, b) => getMsUntilAlarm(a, from) - getMsUntilAlarm(b, from));
}

function generateId() {
  return `alarm-${Date.now()}-${Math.round(Math.random() * 9999)}`;
}

export function generateMathQuestion(): MathQuestion {
  const patterns = [
    () => {
      const a = 8 + Math.floor(Math.random() * 34);
      const b = 3 + Math.floor(Math.random() * 19);
      return { prompt: `${a} + ${b}`, answer: a + b };
    },
    () => {
      const b = 4 + Math.floor(Math.random() * 20);
      const answer = 7 + Math.floor(Math.random() * 36);
      return { prompt: `${answer + b} - ${b}`, answer };
    },
    () => {
      const a = 3 + Math.floor(Math.random() * 10);
      const b = 4 + Math.floor(Math.random() * 9);
      return { prompt: `${a} × ${b}`, answer: a * b };
    },
    () => {
      const divisor = 2 + Math.floor(Math.random() * 8);
      const answer = 5 + Math.floor(Math.random() * 16);
      return { prompt: `${divisor * answer} ÷ ${divisor}`, answer };
    },
  ];
  return patterns[Math.floor(Math.random() * patterns.length)]();
}

export function generateMemeQuestion(): MemeQuestion {
  const questions = [
    { prompt: 'Pick the most morning-coded reaction', options: ['main character walk', '404 brain not found', 'NPC loading'], answer: 'main character walk' },
    { prompt: 'Which vibe beats the snooze button?', options: ['doomscroll arc', 'touch grass energy', 'one more minute'], answer: 'touch grass energy' },
    { prompt: 'Select the wake-up W', options: ['bed rotting', 'hydrated legend', 'sleepy villain'], answer: 'hydrated legend' },
  ];
  return questions[Math.floor(Math.random() * questions.length)];
}

function normalizeDraft(draft: AlarmDraft): Alarm {
  return {
    id: draft.id ?? generateId(),
    hour: draft.hour,
    minute: draft.minute,
    period: draft.period,
    label: draft.label.trim() || 'Morning alarm',
    enabled: draft.enabled,
    repeatDays: sortRepeatDays(draft.repeatDays),
    wakeMode: draft.wakeMode,
    challengeType: draft.challengeType,
    sound: draft.sound,
    vibration: draft.vibration,
    snooze: draft.snooze,
  };
}

export function AlarmProvider({ children }: { children: ReactNode }) {
  const [alarms, setAlarms] = useState<Alarm[]>(defaultAlarms);
  const [hasLoadedAlarms, setHasLoadedAlarms] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [triggeredAlarm, setTriggeredAlarm] = useState<TriggeredAlarm | undefined>();
  const [lastTriggerKey, setLastTriggerKey] = useState('');

  useEffect(() => {
    let mounted = true;
    readStoredAlarms()
      .then((storedAlarms) => {
        if (!mounted) return;
        setAlarms(storedAlarms);
      })
      .catch(() => {
        if (!mounted) return;
        setAlarms(defaultAlarms);
      })
      .finally(() => {
        if (mounted) setHasLoadedAlarms(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedAlarms) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(alarms)).catch(() => undefined);
  }, [alarms, hasLoadedAlarms]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (triggeredAlarm) return;
    const current = new Date(now);
    const matched = alarms.find((alarm) => {
      if (!alarm.enabled) return false;
      const key = `${alarm.id}-${current.toDateString()}-${current.getHours()}-${current.getMinutes()}`;
      return key !== lastTriggerKey && to24Hour(alarm.hour, alarm.period) === current.getHours() && alarm.minute === current.getMinutes();
    });
    if (!matched) return;
    setLastTriggerKey(`${matched.id}-${current.toDateString()}-${current.getHours()}-${current.getMinutes()}`);
    setTriggeredAlarm({ alarm: matched, mathQuestion: generateMathQuestion(), memeQuestion: generateMemeQuestion(), triggeredAt: now });
  }, [alarms, lastTriggerKey, now, triggeredAlarm]);

  const sortedAlarms = useMemo(() => sortByUpcoming(alarms, new Date(now)), [alarms, now]);
  const nextAlarm = sortedAlarms.find((alarm) => alarm.enabled);

  const saveAlarm = useCallback((draft: AlarmDraft) => {
    const alarm = normalizeDraft(draft);
    setAlarms((items) => {
      const exists = items.some((item) => item.id === alarm.id);
      return exists ? items.map((item) => (item.id === alarm.id ? alarm : item)) : [...items, alarm];
    });
    return alarm;
  }, []);

  const toggleAlarm = useCallback((id: string, enabled: boolean) => {
    setAlarms((items) => items.map((alarm) => (alarm.id === id ? { ...alarm, enabled } : alarm)));
  }, []);

  const deleteAlarm = useCallback((id: string) => {
    setAlarms((items) => items.filter((alarm) => alarm.id !== id));
  }, []);

  const dismissTriggeredAlarm = useCallback(() => {
    setTriggeredAlarm(undefined);
  }, []);

  const snoozeTriggeredAlarm = useCallback(() => {
    if (!triggeredAlarm) return;
    const date = new Date(Date.now() + 5 * 60000);
    const hour24 = date.getHours();
    saveAlarm({
      id: `${triggeredAlarm.alarm.id}-snooze-${Date.now()}`,
      hour: hour24 % 12 || 12,
      minute: date.getMinutes(),
      period: hour24 >= 12 ? 'PM' : 'AM',
      label: `${triggeredAlarm.alarm.label} snooze`,
      enabled: true,
      repeatDays: [],
      wakeMode: triggeredAlarm.alarm.wakeMode,
      challengeType: triggeredAlarm.alarm.challengeType,
      sound: triggeredAlarm.alarm.sound,
      vibration: triggeredAlarm.alarm.vibration,
      snooze: false,
    });
    setTriggeredAlarm(undefined);
  }, [saveAlarm, triggeredAlarm]);

  const previewChallenge = useCallback((alarm?: Alarm | AlarmDraft) => {
    const source = alarm ?? alarms[0] ?? defaultAlarms[0];
    setTriggeredAlarm({ alarm: normalizeDraft({ ...source, id: source.id }), mathQuestion: generateMathQuestion(), memeQuestion: generateMemeQuestion(), triggeredAt: Date.now() });
  }, [alarms]);

  const getAlarm = useCallback((id: string) => alarms.find((alarm) => alarm.id === id), [alarms]);

  const value = useMemo<AlarmStore>(() => ({
    alarms,
    sortedAlarms,
    nextAlarm,
    triggeredAlarm,
    getAlarm,
    saveAlarm,
    toggleAlarm,
    deleteAlarm,
    dismissTriggeredAlarm,
    snoozeTriggeredAlarm,
    previewChallenge,
  }), [alarms, deleteAlarm, dismissTriggeredAlarm, getAlarm, nextAlarm, previewChallenge, saveAlarm, snoozeTriggeredAlarm, sortedAlarms, toggleAlarm, triggeredAlarm]);

  return <AlarmContext.Provider value={value}>{children}</AlarmContext.Provider>;
}

export function useAlarmStore() {
  const store = useContext(AlarmContext);
  if (!store) throw new Error('useAlarmStore must be used inside AlarmProvider');
  return store;
}
