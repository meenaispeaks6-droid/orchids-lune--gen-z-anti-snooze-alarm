import type { OnboardingSlide } from '@/src/types/app';

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 'snooze',
    eyebrow: '01 / SMART WAKE',
    title: 'Stop snoozing without starting your day stressed.',
    body: 'LUNE uses gentle pressure, smart missions, and calm design to help you actually get up.',
    accent: 'peach',
  },
  {
    id: 'better',
    eyebrow: '02 / MORNING MODES',
    title: 'Wake up for the version of you that planned tomorrow.',
    body: 'Choose Calm, Focus, Gym, Study, or Recharge modes for a morning that fits your life.',
    accent: 'sage',
  },
  {
    id: 'rhythm',
    eyebrow: '03 / SLEEP RHYTHM',
    title: 'Build a softer rhythm, one morning at a time.',
    body: 'Track streaks, bedtime consistency, and small wins without turning sleep into homework.',
    accent: 'lavender',
  },
];
