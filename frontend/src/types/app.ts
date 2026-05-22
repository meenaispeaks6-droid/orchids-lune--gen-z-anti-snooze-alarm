export type WakeMode = 'Calm' | 'Focus' | 'Gym' | 'Study' | 'Recharge';
export type AlarmChallengeType = 'Math' | 'Meme' | 'Random' | 'None';
export type AlarmSound = 'Warm chime' | 'Soft sunrise' | 'Velvet bells' | 'Purple pulse' | 'Peach waves';

export type AlarmMission = {
  type: AlarmChallengeType;
  label: string;
  difficulty: 'soft' | 'medium' | 'strict';
};

export type Alarm = {
  id: string;
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

export type InsightMetric = {
  label: string;
  value: string;
  helper: string;
};

export type ChartPoint = {
  label: string;
  value: number;
};

export type OnboardingSlide = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  accent: 'peach' | 'sage' | 'lavender';
};
